from rest_framework import serializers

from .models import Conversation, ConversationMessage

from useraccount.serializers import UserDetailSerializer


class ConversationListSerializer(serializers.ModelSerializer):
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
        last_message = obj.messages.order_by("-created_at").first()
        return last_message.body if last_message else None

    def get_lastMessageTimestamp(self, obj):
        last_message = obj.messages.order_by("-created_at").first()
        return last_message.created_at if last_message else None

    def get_unreadCount(self, obj):
        user = self.context["request"].user
        return obj.messages.filter(sent_to=user, read=False).count()

class ConversationDetailSerializer(serializers.ModelSerializer):
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
        last_message = obj.messages.order_by("-created_at").first()
        return last_message.created_at if last_message else None

    def get_unreadCount(self, obj):
        user = self.context["request"].user
        return obj.messages.filter(sent_to=user, read=False).count()


class ConversationMessageSerializer(serializers.ModelSerializer):
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
