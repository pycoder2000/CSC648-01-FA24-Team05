from rest_framework import serializers
from .models import Item, Rental
from useraccount.serializers import UserDetailSerializer


class ItemListSerializer(serializers.ModelSerializer):
    """
    Serializer for the Item model that specifies the fields to include in the serialization.

    Attributes:
        model (Model): The model to serialize (Item).
        fields (tuple): The fields to include in the serialization (id, title, price_per_day, image_url).
    """

    class Meta:
        model = Item
        fields = (
            "id",
            "title",
            "price_per_day",
            "image_url",
        )


class ItemDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for the ItemDetail model that includes detailed information about the item and the seller.

    Attributes:
        seller (UserDetailSerializer): Serializer for the seller information (read-only).
        fields (tuple): The fields to include in the serialization (id, title, description, price_per_day, image_url, condition, seller, category, country).
    """

    seller = UserDetailSerializer(read_only=True, many=False)

    class Meta:
        model = Item
        fields = (
            "id",
            "title",
            "description",
            "price_per_day",
            "image_url",
            "condition",
            "seller",
            "category",
            "country",
        )


class RentalListSerializer(serializers.ModelSerializer):
    """
    Serializer for RentalList with nested ItemListSerializer.

    Attributes:
        item (ItemListSerializer): Serializer for the item information (read-only).
        fields (tuple): The fields to include in the serialization (id, start_date, end_date, number_of_days, total_price, item).
    """

    item = ItemListSerializer(read_only=True, many=False)

    class Meta:
        model = Rental
        fields = (
            "id",
            "start_date",
            "end_date",
            "number_of_days",
            "total_price",
            "item",
        )
