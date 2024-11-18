from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    Register the User model with the UserAdmin class to customize its display in the admin panel.

    Attributes:
        list_display (tuple): Specifies the fields to display in the admin panel for each User instance.
        search_fields (tuple): Specifies the fields that can be searched in the admin panel.
    """

    list_display = ("email", "name", "phone", "city", "state", "country")
    search_fields = ("email", "name", "phone")
