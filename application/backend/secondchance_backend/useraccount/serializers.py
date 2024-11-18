from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User


class UserDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving detailed user information.

    Fields:
        id (UUIDField): Unique identifier.
        email (EmailField): User's email address.
        name (CharField): User's name.
        avatar_url (URLField): URL of the user's avatar.
        phone (CharField): User's phone number.
        birthday (DateField): User's date of birth.
        city (CharField): User's city of residence.
        state (CharField): User's state of residence.
        country (CharField): User's country of residence.
        date_joined (DateTimeField): Timestamp when the user joined.
        last_login (DateTimeField): Timestamp of the user's last login.
        items_rented_out (IntegerField): Number of items the user has rented out.
        items_rented (IntegerField): Number of items the user has rented.
        sustainability_score (FloatField): User's calculated sustainability score.
    """

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "avatar_url",
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
    """
    Custom serializer for user registration, extending dj_rest_auth's RegisterSerializer.

    Additional Fields:
        name (CharField): User's name (required).
        phone (CharField): User's phone number (optional).
        birthday (DateField): User's date of birth (optional).
        country (CharField): User's country of residence (optional).
        state (CharField): User's state of residence (optional).
        city (CharField): User's city of residence (optional).
        profile_picture (ImageField): User's profile picture (optional).
    """

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
        """
        Override the save method to handle additional user fields.

        Steps:
            - Save the user object using the parent serializer.
            - Set additional fields (name, phone, birthday, country, state, city).
            - Set the avatar field if a profile picture is provided.
            - Save the updated user object.

        :param request: The current HTTP request.
        :type request: HttpRequest
        :return: The newly created user object.
        :rtype: User
        """
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
