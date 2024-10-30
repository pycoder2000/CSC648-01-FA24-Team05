from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "phone", "city", "state")
    search_fields = ("email", "name", "phone")
