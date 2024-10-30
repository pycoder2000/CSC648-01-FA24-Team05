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


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def items_list(request):
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

    # Date-based filtering
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
    item = Item.objects.get(pk=pk)

    serializer = ItemDetailSerializer(item, many=False)

    return JsonResponse(serializer.data)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def item_rentals(request, pk):
    item = Item.objects.get(pk=pk)
    rentals = item.rentals.all()

    serializer = RentalListSerializer(rentals, many=True)

    return JsonResponse(serializer.data, safe=False)


@api_view(["POST", "FILES"])
def create_item(request):
    form = ItemForm(request.POST, request.FILES)
    if form.is_valid():
        item = form.save(commit=False)
        item.seller = request.user
        item.save()
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"errors": form.errors.as_json()}, status=400)

@api_view(["POST"])
def rent_item(request, pk):
    try:
        start_date = request.POST.get("start_date", "")
        end_date = request.POST.get("end_date", "")
        number_of_days = request.POST.get("number_of_days", "")
        total_price = request.POST.get("total_price", "")

        item = Item.objects.get(pk=pk)

        Rental.objects.create(
            item=item,
            start_date=start_date,
            end_date=end_date,
            number_of_days=number_of_days,
            total_price=total_price,
            created_by=request.user,
        )

        return JsonResponse({"success": True})
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=400)

@api_view(["POST"])
def toggle_favorite(request, pk):
    item = Item.objects.get(pk=pk)

    if request.user in item.favorited.all():
        item.favorited.remove(request.user)

        return JsonResponse({"is_favorite": False})
    else:
        item.favorited.add(request.user)

        return JsonResponse({"is_favorite": True})
