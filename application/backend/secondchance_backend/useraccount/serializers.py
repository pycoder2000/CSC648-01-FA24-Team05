from rest_framework import serializers

from .models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "avatar_url",
            "email",
            "date_joined",
            "phone",
            "birthday",
            "city",
            "state",
            "country",
        )
