"""
URL Configuration
=================

This module contains the URL routing configuration for the Django project.

It includes routes for the admin interface, item API, user authentication API, chat API, and documentation.
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/items/", include("item.urls")),
    path("api/auth/", include("useraccount.urls")),
    path("api/chat/", include("chat.urls")),
    path("docs/", include("docs.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
