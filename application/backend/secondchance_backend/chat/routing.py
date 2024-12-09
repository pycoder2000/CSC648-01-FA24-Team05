"""
WebSocket Routing
=================

This module contains the routing configuration for WebSocket connections in the chat application.
"""

from django.urls import re_path
from .consumers import ChatConsumer, ChatbotConsumer

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<room_name>\w+)/$", ChatConsumer.as_asgi()),
    re_path(r"ws/chatbot/$", ChatbotConsumer.as_asgi()),
]
