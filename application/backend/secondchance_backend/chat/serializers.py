from rest_framework import serializers
from .models import Conversation, ConversationMessage
from useraccount.serializers import UserDetailSerializer


class ConversationListSerializer(serializers.ModelSerializer):
    """
    Serializer for a list of conversations.

    Attributes:
        users (UserDetailSerializer): Serializer for user details.
        lastMessage (SerializerMethodField): Method to get the last message.
        lastMessageTimestamp (SerializerMethodField): Method to get the timestamp of the last message.
        unreadCount (SerializerMethodField): Method to get the count of unread messages.
    """

    users = UserDetailSerializer(many=True, read_only=True)
    lastMessage = serializers.SerializerMethodField()
    lastMessageTimestamp = serializers.SerializerMethodField()
    unreadCount = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = (
            "id",
            "users",
            "lastMessage",
            "lastMessageTimestamp",
            "unreadCount",
        )

    def get_lastMessage(self, obj):
        """
        Retrieve the last message from a given object.

        :param obj: The object to retrieve the last message from.
        :type obj: Conversation
        :return: The body of the last message, or None if there are no messages.
        :rtype: str or None
        """
        last_message = obj.messages.order_by("-created_at").first()
        return last_message.body if last_message else None

    def get_lastMessageTimestamp(self, obj):
        """
        Retrieve the timestamp of the last message associated with a given object.

        :param obj: The object for which to retrieve the last message timestamp.
        :type obj: Conversation
        :return: The timestamp of the last message, or None if no messages exist.
        :rtype: datetime or None
        """
        last_message = obj.messages.order_by("-created_at").first()
        return last_message.created_at if last_message else None

    def get_unreadCount(self, obj):
        """
        Get the count of unread messages for a specific user.

        :param obj: The object for which to get the unread message count.
        :type obj: Conversation
        :return: The count of unread messages.
        :rtype: int
        """
        user = self.context["request"].user
        return obj.messages.filter(sent_to=user, read=False).count()


class ConversationDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for conversation details.

    Attributes:
        users (UserDetailSerializer): Serializer for user details.
        lastMessageTimestamp (SerializerMethodField): Method to get the timestamp of the last message.
        unreadCount (SerializerMethodField): Method to get the count of unread messages.
    """

    users = UserDetailSerializer(many=True, read_only=True)
    lastMessageTimestamp = serializers.SerializerMethodField()
    unreadCount = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = (
            "id",
            "users",
            "modified_at",
            "lastMessageTimestamp",
            "unreadCount",
        )

    def get_lastMessageTimestamp(self, obj):
        """
        Retrieve the timestamp of the last message associated with a given object.

        :param obj: The object for which to retrieve the last message timestamp.
        :type obj: Conversation
        :return: The timestamp of the last message, or None if no messages exist.
        :rtype: datetime or None
        """
        last_message = obj.messages.order_by("-created_at").first()
        return last_message.created_at if last_message else None

    def get_unreadCount(self, obj):
        """
        Get the count of unread messages for a specific user.

        :param obj: The object for which to get the unread message count.
        :type obj: Conversation
        :return: The count of unread messages.
        :rtype: int
        """
        user = self.context["request"].user
        return obj.messages.filter(sent_to=user, read=False).count()


class ConversationMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for conversation messages.

    Attributes:
        sent_to (UserDetailSerializer): Serializer for the user the message is sent to.
        created_by (UserDetailSerializer): Serializer for the user who created the message.
    """

    sent_to = UserDetailSerializer(many=False, read_only=True)
    created_by = UserDetailSerializer(many=False, read_only=True)

    class Meta:
        model = ConversationMessage
        fields = (
            "id",
            "body",
            "sent_to",
            "created_by",
            "read",
            "read_at",
        )
