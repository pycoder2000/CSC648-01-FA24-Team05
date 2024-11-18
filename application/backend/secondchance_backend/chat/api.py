from django.http import JsonResponse
from django.utils import timezone
from rest_framework.decorators import api_view

from .models import Conversation, ConversationMessage
from .serializers import (
    ConversationListSerializer,
    ConversationDetailSerializer,
    ConversationMessageSerializer,
)

from useraccount.models import User


@api_view(["GET"])
def conversations_list(request):
    """
    Retrieve a list of conversations for the current user.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :return: JSON response containing the serialized data of the conversations list.
    :rtype: JsonResponse
    """
    serializer = ConversationListSerializer(
        request.user.conversations.all(), many=True, context={"request": request}
    )
    return JsonResponse(serializer.data, safe=False)


@api_view(["GET"])
def conversations_detail(request, pk):
    """
    Retrieve details of a specific conversation including its messages.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param pk: The primary key of the conversation.
    :type pk: int
    :return: JSON response containing serialized data of the conversation and its messages.
    :rtype: JsonResponse
    """
    conversation = request.user.conversations.get(pk=pk)

    conversation_serializer = ConversationDetailSerializer(
        conversation, many=False, context={"request": request}
    )
    messages_serializer = ConversationMessageSerializer(
        conversation.messages.all(), many=True
    )

    return JsonResponse(
        {
            "conversation": conversation_serializer.data,
            "messages": messages_serializer.data,
        },
        safe=False,
    )


@api_view(["GET"])
def conversations_start(request, user_id):
    """
    Start a conversation between two users.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param user_id: The ID of the user to start a conversation with.
    :type user_id: int
    :return: JSON response indicating the success status and the ID of the conversation started.
    :rtype: JsonResponse
    """
    conversations = Conversation.objects.filter(users__in=[user_id]).filter(
        users__in=[request.user.id]
    )

    if conversations.count() > 0:
        conversation = conversations.first()
        return JsonResponse({"success": True, "conversation_id": conversation.id})
    else:
        user = User.objects.get(pk=user_id)
        conversation = Conversation.objects.create()
        conversation.users.add(request.user)
        conversation.users.add(user)
        return JsonResponse({"success": True, "conversation_id": conversation.id})


@api_view(["POST"])
def mark_messages_read(request, conversation_id):
    """
    Mark messages in a conversation as read.

    :param request: The HTTP request object.
    :type request: HttpRequest
    :param conversation_id: The ID of the conversation to mark messages as read.
    :type conversation_id: int
    :return: JSON response indicating success or error.
    :rtype: JsonResponse
    :raises Conversation.DoesNotExist: If the conversation does not exist.
    """
    try:
        conversation = request.user.conversations.get(pk=conversation_id)
        conversation.messages.filter(sent_to=request.user, read=False).update(
            read=True, read_at=timezone.now()
        )
        return JsonResponse({"success": True})
    except Conversation.DoesNotExist:
        return JsonResponse({"error": "Conversation not found"}, status=404)
