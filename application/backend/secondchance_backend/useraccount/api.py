from django.http import JsonResponse

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from .models import User
from .serializers import UserDetailSerializer

from item.serializers import RentalsListSerializer


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

    print("user", request.user)
    print(rentals)

    serializer = RentalsListSerializer(rentals, many=True)
    return JsonResponse(serializer.data, safe=False)
