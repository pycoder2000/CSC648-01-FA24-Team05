"""
Chat API URLs
=============

This module contains the URL routing configuration for the chat API.
"""

from django.urls import path
from . import api
from django.urls import re_path
from .consumers import ChatbotConsumer

urlpatterns = [
    path("", api.conversations_list, name="api_conversations_list"),
    path(
        "start/<uuid:user_id>/", api.conversations_start, name="api_conversations_start"
    ),
    path("<uuid:pk>/", api.conversations_detail, name="api_conversations_detail"),
    path(
        "<uuid:conversation_id>/mark_read/",
        api.mark_messages_read,
        name="api_mark_messages_read",
    ),
]

websocket_urlpatterns = [
    re_path(r"ws/chatbot/$", ChatbotConsumer.as_asgi(), name="chatbot_ws"),
]
