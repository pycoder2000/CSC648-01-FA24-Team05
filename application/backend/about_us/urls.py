# about_us/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("", views.about_us, name="about_us"),
    path("member/<str:name>/", views.member_detail, name="member_detail"),
]
