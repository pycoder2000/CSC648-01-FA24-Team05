"""
Admin Configuration
===================

This module contains the admin configuration for the item and rental models.
"""

from django.contrib import admin
from .models import Item, Rental

admin.site.register(Item)
admin.site.register(Rental)
