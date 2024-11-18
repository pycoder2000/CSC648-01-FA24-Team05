import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
from django.utils import timezone


class CustomUserManager(UserManager):
    """
    Custom manager for the User model, providing methods to create standard users and superusers.

    Methods:
        _create_user: Internal method for creating a user with email, name, and password.
        create_user: Public method to create a standard user. Sets is_staff and is_superuser to False.
        create_superuser: Public method to create a superuser. Sets is_staff and is_superuser to True.
    """

    def _create_user(self, name, email, password, **extra_fields):
        """
        Internal helper method to create and save a user with the given name, email, and password.

        :param name: The name of the user.
        :type name: str
        :param email: The user's email (must be provided and valid).
        :type email: str
        :param password: The user's password.
        :type password: str
        :param extra_fields: Additional fields to be set on the user object.
        :type extra_fields: dict
        :raises ValueError: If email is not provided.
        :return: The created user object.
        :rtype: User
        """
        if not email:
            raise ValueError("You have not specified a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        """
        Create and return a standard user.

        :param name: The name of the user.
        :type name: str, optional
        :param email: The user's email.
        :type email: str, optional
        :param password: The user's password.
        :type password: str, optional
        :param extra_fields: Additional fields to be set on the user object.
        :type extra_fields: dict
        :return: The created user object.
        :rtype: User
        """
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(name, email, password, **extra_fields)

    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        """
        Create and return a superuser.

        :param name: The name of the user.
        :type name: str, optional
        :param email: The user's email.
        :type email: str, optional
        :param password: The user's password.
        :type password: str, optional
        :param extra_fields: Additional fields to be set on the user object.
        :type extra_fields: dict
        :return: The created superuser object.
        :rtype: User
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model extending Django's AbstractBaseUser and PermissionsMixin.

    Attributes:
        id (UUIDField): Primary key, auto-generated UUID4 value.
        email (EmailField): Unique email address.
        name (CharField): Name of the user, defaulting to "Anonymous User".
        avatar (ImageField): ImageField for user avatar, stored in "uploads/avatars" (optional).
        phone (CharField): CharField for user phone number (optional).
        birthday (DateField): DateField for user's birthday (optional).
        city (CharField): CharField for user's city (optional).
        state (CharField): CharField for user's state (optional).
        country (CharField): CharField for user's country (optional).
        items_rented_out (IntegerField): IntegerField to track the number of items rented out.
        items_rented (IntegerField): IntegerField to track the number of items rented.
        sustainability_score (FloatField): FloatField to represent user's sustainability score.
        is_active (BooleanField): BooleanField, indicates if the user is active.
        is_superuser (BooleanField): BooleanField, indicates if the user is a superuser.
        is_staff (BooleanField): BooleanField, indicates if the user has staff privileges.
        date_joined (DateTimeField): DateTimeField, automatically set on user creation.
        last_login (DateTimeField): DateTimeField, tracks the last login time.

    Methods:
        avatar_url: Returns the full URL of the user's avatar or an empty string if no avatar exists.
        increment_items_rented_out: Increments items rented out and recalculates sustainability score.
        increment_items_rented: Increments items rented and recalculates sustainability score.
        calculate_sustainability_score: Calculates the user's sustainability score based on activity.
        save: Overrides the default save method to always recalculate the sustainability score.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(
        max_length=255, blank=False, null=False, default="Anonymous User"
    )
    avatar = models.ImageField(upload_to="uploads/avatars", blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    items_rented_out = models.IntegerField(default=0)
    items_rented = models.IntegerField(default=0)
    sustainability_score = models.FloatField(default=0.0)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def avatar_url(self):
        """
        Returns the full URL of the user's avatar.


        :return: Full URL of the avatar if present, or an empty string if no avatar exists.
        :rtype: str
        """
        if self.avatar:
            return f"{settings.WEBSITE_URL}{self.avatar.url}"
        else:
            return ""

    def increment_items_rented_out(self):
        """
        Increment the number of items rented out by the user.
        Recalculates and updates the sustainability score.


        :return: None
        :rtype: None
        """
        self.items_rented_out += 1
        self.calculate_sustainability_score()
        self.save(update_fields=["items_rented_out", "sustainability_score"])

    def increment_items_rented(self):
        """
        Increment the number of items rented by the user.
        Recalculates and updates the sustainability score.


        :return: None
        :rtype: None
        """
        self.items_rented += 1
        self.calculate_sustainability_score()
        self.save(update_fields=["items_rented", "sustainability_score"])

    def calculate_sustainability_score(self):
        """
        Calculate and update the user's sustainability score based on platform activity.

        Formula:
        - Weighted sum of items rented out, items rented, and days on the platform.
        - Score is normalized and capped between 1 and 100.


        :return: None
        :rtype: None
        """
        if self.date_joined:
            days_on_platform = (timezone.now() - self.date_joined).days
        else:
            days_on_platform = 0

        score = (
            (self.items_rented_out * 2.5)
            + (self.items_rented * 1.5)
            + (days_on_platform * 0.1)
        )

        max_score = 100
        normalized_score = min(max(round(score), 1), max_score)
        self.sustainability_score = normalized_score

    def save(self, *args, **kwargs):
        """
        Override the save method to recalculate the sustainability score before saving.


        :return: None
        :rtype: None
        """
        self.calculate_sustainability_score()
        super().save(*args, **kwargs)
