from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "avatar",
            "phone",
            "birthday",
            "city",
            "state",
            "country",
            "date_joined",
            "last_login",
            "items_rented_out",
            "items_rented",
            "sustainability_score",
        ]


class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    birthday = serializers.DateField(required=False, allow_null=True)
    country = serializers.CharField(max_length=100, required=False, allow_blank=True)
    state = serializers.CharField(max_length=100, required=False, allow_blank=True)
    city = serializers.CharField(max_length=100, required=False, allow_blank=True)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = (
            "email",
            "password1",
            "password2",
            "name",
            "phone",
            "birthday",
            "country",
            "state",
            "city",
            "profile_picture",
        )

    def save(self, request):
        user = super().save(request)
        user.name = self.validated_data.get("name", "")
        user.phone = self.validated_data.get("phone", "")
        user.birthday = self.validated_data.get("birthday", None)
        user.country = self.validated_data.get("country", "")
        user.state = self.validated_data.get("state", "")
        user.city = self.validated_data.get("city", "")

        if "profile_picture" in self.validated_data:
            user.avatar = self.validated_data.get("profile_picture")

        user.save()
        return user
