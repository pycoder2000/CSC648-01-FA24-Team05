from django.http import JsonResponse
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework_simplejwt.tokens import AccessToken
from .forms import ItemForm
from .models import Item, Rental
from .serializers import ItemListSerializer, ItemDetailSerializer, RentalListSerializer
from django.shortcuts import get_object_or_404
from useraccount.models import User
from datetime import date, datetime

@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def items_list(request):
    """
    Retrieve a list of items.

    This function does not require authentication or permission.
    It retrieves the user ID from the request token and fetches the corresponding user object.
    If a condition is provided and not "undefined", it filters the items based on that condition.
    It then checks if the user has favorited any items and adds those item IDs to a list of favorites.
    Finally, it serializes the list of items using the ItemListSerializer.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :return: JSON response containing the serialized list of items and favorites.
    :rtype: JsonResponse
    """
    try:
        token = request.META["HTTP_AUTHORIZATION"].split("Bearer ")[1]
        token = AccessToken(token)
        user_id = token.payload["user_id"]
        user = User.objects.get(pk=user_id)
    except Exception as e:
        user = None

    favorites = []
    items = Item.objects.all()

    is_favorites = request.GET.get("is_favorites", "")
    seller_id = request.GET.get("seller_id", "")
    country = request.GET.get("country", "")
    category = request.GET.get("category", "")
    condition = request.GET.get("condition", "")
    pick_up_date = request.GET.get("checkIn", "")
    return_date = request.GET.get("checkOut", "")

    if pick_up_date and return_date:
        rented_items = Rental.objects.filter(
            start_date__lte=return_date,
            end_date__gte=pick_up_date,
        ).values_list("item_id", flat=True)
        items = items.exclude(id__in=rented_items)

    if seller_id:
        items = items.filter(seller_id=seller_id)

    if is_favorites:
        items = items.filter(favorited__in=[user])

    if country:
        items = items.filter(country=country)

    if category:
        items = items.filter(category=category)

    if condition and condition != "undefined":
        items = items.filter(condition=condition)

    if user:
        for item in items:
            if user in item.favorited.all():
                favorites.append(item.id)

    serializer = ItemListSerializer(items, many=True)
    return JsonResponse({"data": serializer.data, "favorites": favorites})


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def items_detail(request, pk):
    """
    Retrieve details of a specific item using its primary key.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param pk: The primary key of the item to retrieve.
    :type pk: int
    :return: JSON response containing the serialized data of the item.
    :rtype: JsonResponse
    """
    try:
        item = Item.objects.get(pk=pk)
        serializer = ItemDetailSerializer(item, many=False)
        return JsonResponse(serializer.data)
    except Item.DoesNotExist:
        return JsonResponse({"error": "Item not found"}, status=404)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def item_rentals(request, pk):
    """
    Retrieve the rentals associated with a specific item.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param pk: The primary key of the item.
    :type pk: int
    :return: JSON response containing the serialized rental data for the item.
    :rtype: JsonResponse
    """
    item = Item.objects.get(pk=pk)
    rentals = item.rentals.all()
    serializer = RentalListSerializer(rentals, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(["POST", "FILES"])
def create_item(request):
    """
    Create an item using the form data and files provided.

    If the form is valid, it saves the item with the current user as the seller and increments the number of items rented out by the user.
    Returns a JSON response indicating success or errors.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :return: JSON response indicating success or errors.
    :rtype: JsonResponse
    """
    form = ItemForm(request.POST, request.FILES)
    if form.is_valid():
        item = form.save(commit=False)
        item.seller = request.user
        item.save()
        request.user.increment_items_rented_out()
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"errors": form.errors.as_json()}, status=400)


@api_view(["POST"])
def rent_item(request, pk):
    """
    Handle renting an item.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param pk: The primary key of the item to be rented.
    :type pk: int
    :return: JSON response indicating success or failure.
    :rtype: JsonResponse
    """
    print("==CALLED: rent_item()==")
    print("Incoming POST data:", request.data)
    try:
        start_date = request.POST.get("start_date", "")
        end_date = request.POST.get("end_date", "")
        number_of_days = int(request.POST.get("number_of_days", 0))
        total_price = int(request.POST.get("total_price", 0))
        
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        except ValueError as err:
            print("Date parsing error:", err)
            return JsonResponse({"success": False, "error": "Error parsing dates."}, status=404)
        
        
        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return JsonResponse({"success": False, "error": "Item not found."}, status=404)
        
        Rental.objects.create(
            item=item,
            start_date=start_date,
            end_date=end_date,
            number_of_days=number_of_days,
            total_price=total_price,
            created_by=request.user,
        )
        print("rental object created")
        
        
        request.user.increment_items_rented()
        print(request.user.items_rented)
        print("request.user.items_rented before calling refresh_from_db()")
        request.user.refresh_from_db()
        print("request.user.items_rented AFTER calling refresh_from_db()")
        print(request.user.items_rented)
        

        return JsonResponse({"success": True})
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=400)


@api_view(["POST"])
def toggle_favorite(request, pk):
    """
    Toggle the favorite status of an item for the current user.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param pk: The primary key of the item.
    :type pk: int
    :return: JSON response indicating whether the item is now a favorite or not.
    :rtype: JsonResponse
    """
    item = Item.objects.get(pk=pk)

    if request.user in item.favorited.all():
        item.favorited.remove(request.user)
        return JsonResponse({"is_favorite": False})
    else:
        item.favorited.add(request.user)
        return JsonResponse({"is_favorite": True})
