"""
User Account API URLs
=====================

This module contains the URL routing configuration for the user account API, including registration, login, logout, token refresh, and user details.
"""

from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import LoginView, LogoutView
from .views import CustomRegisterView
from . import api

urlpatterns = [
    path("register/", CustomRegisterView.as_view(), name="rest_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    path("myrentals/", api.rentals_list, name="api_rentals_list"),
    path("<uuid:pk>/", api.seller_detail, name="api_seller_detail"),
    path("users/<uuid:pk>/", api.get_user_detail, name="api_user_detail"),
]
