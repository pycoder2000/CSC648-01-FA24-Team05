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
