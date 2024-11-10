import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
from django.utils import timezone


class CustomUserManager(UserManager):
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not specified a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(name, email, password, **extra_fields)

    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
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
    REQUIRED_FIELDS = [
        "name",
    ]

    def avatar_url(self):
        if self.avatar:
            return f"{settings.WEBSITE_URL}{self.avatar.url}"
        else:
            return ""

    def increment_items_rented_out(self):
        self.items_rented_out += 1
        self.save(update_fields=["items_rented_out"])

    def increment_items_rented(self):
        self.items_rented += 1
        self.save(update_fields=["items_rented"])

    def calculate_sustainability_score(self):
        if self.date_joined:
            days_on_platform = (timezone.now() - self.date_joined).days
        else:
            days_on_platform = 0

        score = (
            (self.items_rented_out * 0.4)
            + (self.items_rented * 0.4)
            + (days_on_platform * 0.2)
        )

        max_score = 100
        normalized_score = min(max(score, 1), max_score)
        self.sustainability_score = normalized_score

    def save(self, *args, **kwargs):
        self.calculate_sustainability_score()
        super().save(*args, **kwargs)
