"""
Admin Configuration
===================

This module contains the admin configuration for the chat application.
"""

from django.contrib import admin
from .models import Conversation, ConversationMessage

admin.site.register(Conversation)
admin.site.register(ConversationMessage)
