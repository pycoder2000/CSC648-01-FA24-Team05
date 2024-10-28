from rest_framework import serializers
from .models import Item, Rental
from useraccount.serializers import UserDetailSerializer


class ItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = (
            "id",
            "title",
            "price_per_day",
            "image_url",
        )


class ItemDetailSerializer(serializers.ModelSerializer):
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
        )


class RentalListSerializer(serializers.ModelSerializer):
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
