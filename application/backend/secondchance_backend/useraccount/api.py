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
    """
    Retrieve details of a seller with a specific primary key.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param pk: The primary key of the seller.
    :type pk: int
    :return: JSON response containing the serialized data of the seller.
    :rtype: JsonResponse
    """
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many=False)
    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
def rentals_list(request):
    """
    Retrieve a list of rentals associated with the current user.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :return: JSON response containing a list of rental data.
    :rtype: JsonResponse
    """
    rentals = request.user.rentals.all()
    serializer = RentalListSerializer(rentals, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def get_user_detail(request, pk):
    """
    Retrieve details of a specific user identified by their primary key.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param pk: The primary key of the user.
    :type pk: int
    :return: JSON response containing the serialized data of the user.
    :rtype: JsonResponse
    """
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many=False)
    return JsonResponse(serializer.data, safe=False)
