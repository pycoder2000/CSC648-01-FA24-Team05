"""
WebSocket Routing
=================

This module contains the routing configuration for WebSocket connections in the chat application.
"""

from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/<str:room_name>/", consumers.ChatConsumer.as_asgi()),
]
