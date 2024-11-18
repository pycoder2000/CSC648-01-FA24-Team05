"""
Chat Models
===========

This module contains the models for the chat application.
"""

import uuid
from django.db import models
from django.utils import timezone
from useraccount.models import User


class Conversation(models.Model):
    """
    Represents a conversation between users.

    Attributes:
        id (UUIDField): Primary key, auto-generated UUID4 value.
        users (ManyToManyField): Many-to-Many relationship with the User model, related name "conversations".
        created_at (DateTimeField): Automatically set to the current date and time when the object is created.
        modified_at (DateTimeField): Automatically updated to the current date and time whenever the object is modified.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    users = models.ManyToManyField(User, related_name="conversations")
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the conversation.

        :return: String representation of the conversation
        :rtype: str
        """
        return f"Conversation {self.id} between {', '.join(user.name for user in self.users.all())}"


class ConversationMessage(models.Model):
    """
    Represents a message in a conversation.

    Attributes:
        id (UUIDField): Primary key, auto-generated UUID4 value.
        conversation (ForeignKey): ForeignKey to Conversation model, related name "messages", on_delete CASCADE.
        body (TextField): TextField containing the message content.
        sent_to (ForeignKey): ForeignKey to User model, recipient of the message, on_delete CASCADE.
        created_by (ForeignKey): ForeignKey to User model, sender of the message, on_delete CASCADE.
        created_at (DateTimeField): Automatically set to the current date and time when the object is created.
        read (BooleanField): Indicates if the message has been read, defaults to False.
        read_at (DateTimeField): Timestamp when the message was read, can be null and blank.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation, related_name="messages", on_delete=models.CASCADE
    )
    body = models.TextField()
    sent_to = models.ForeignKey(
        User, related_name="received_messages", on_delete=models.CASCADE
    )
    created_by = models.ForeignKey(
        User, related_name="sent_messages", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)

    def mark_as_read(self):
        """
        Marks the message as read and sets the read_at timestamp.

        :return: None
        :rtype: None
        """
        self.read = True
        self.read_at = timezone.now()
        self.save(update_fields=["read", "read_at"])

    def __str__(self):
        """
        Returns a string representation of the message.

        :return: String representation of the message
        :rtype: str
        """
        return f"Message {self.id} in Conversation {self.conversation.id}"
