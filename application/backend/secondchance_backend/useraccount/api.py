from django.http import JsonResponse

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from useraccount.models import User
from item.models import Item, Rental
from useraccount.serializers import UserDetailSerializer
from item.serializers import RentalListSerializer
from item.forms import ItemForm


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def seller_detail(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many=False)
    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
def rentals_list(request):
    rentals = request.user.rentals.all()
    serializer = RentalListSerializer(rentals, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def get_user_detail(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many=False)
    return JsonResponse(serializer.data, safe=False)


@api_view(["POST"])
@permission_classes([])
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

        request.user.increment_items_rented()

        return JsonResponse({"success": True})
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)}, status=400)


@api_view(["POST", "FILES"])
@permission_classes([])
def create_item(request):
    form = ItemForm(request.POST, request.FILES)
    if form.is_valid():
        item = form.save(commit=False)
        item.seller = request.user
        item.save()

        request.user.increment_items_rented_out()

        return JsonResponse({"success": True})
    else:
        return JsonResponse({"errors": form.errors.as_json()}, status=400)
