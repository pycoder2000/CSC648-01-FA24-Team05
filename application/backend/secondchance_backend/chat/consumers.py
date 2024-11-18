import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ConversationMessage


class ChatConsumer(AsyncWebsocketConsumer):
    """
    WebSocket consumer for handling chat messages and notifications.

    Methods:
        connect(): Establishes a WebSocket connection and adds the client to a chat room group.
        disconnect(close_code): Disconnects the WebSocket connection from the chat room group.
        receive(text_data): Receives and processes messages from the WebSocket.
        chat_message(event): Sends a chat message to the WebSocket.
        read_notification(event): Sends a read notification to the WebSocket.
        typing_notification(event): Sends a typing notification to the WebSocket.
        save_message(conversation_id, body, sent_to_id): Saves a message to the database.
        mark_as_read(conversation_id): Marks messages in a conversation as read.
    """

    async def connect(self):
        """
        Establish a WebSocket connection and add the client to a specific chat room group.

        :return: None
        :rtype: None
        """
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        """
        Disconnect the WebSocket connection from the chat room group.

        :param close_code: The code to close the connection.
        :type close_code: int
        :return: None
        :rtype: None
        """
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        """
        Receive and process messages from the WebSocket.

        :param text_data: The text data received from the WebSocket.
        :type text_data: str
        :return: None
        :rtype: None
        """
        data = json.loads(text_data)
        event_type = data.get("type", "message")

        if event_type == "read":
            conversation_id = data["data"]["conversation_id"]
            await self.mark_as_read(conversation_id)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "read_notification",
                    "conversation_id": conversation_id,
                    "user_id": self.scope["user"].id,
                },
            )
        elif event_type == "typing":
            name = data["data"]["name"]
            typing = data["data"]["typing"]
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "typing_notification",
                    "name": name,
                    "typing": typing,
                },
            )
        else:
            conversation_id = data["data"]["conversation_id"]
            sent_to_id = data["data"]["sent_to_id"]
            name = data["data"]["name"]
            body = data["data"]["body"]

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "body": body,
                    "name": name,
                },
            )

            await self.save_message(conversation_id, body, sent_to_id)

    async def chat_message(self, event):
        """
        Handle chat messages and send them to the WebSocket.


        :param event: The event containing the message body and name.
        :type event: dict
        :return: None
        :rtype: None
        """
        body = event["body"]
        name = event["name"]

        await self.send(
            text_data=json.dumps({"type": "message", "body": body, "name": name})
        )

    async def read_notification(self, event):
        """
        Handle read notifications and send them to the WebSocket.


        :param event: The notification event containing conversation_id and user_id.
        :type event: dict
        :return: None
        :rtype: None
        """
        conversation_id = event["conversation_id"]
        user_id = event["user_id"]

        await self.send(
            text_data=json.dumps(
                {"type": "read", "conversation_id": conversation_id, "user_id": user_id}
            )
        )

    async def typing_notification(self, event):
        """
        Handle typing notifications and send them to the WebSocket.

        :param event: The event containing name and typing status.
        :type event: dict
        :return: None
        :rtype: None
        """
        name = event["name"]
        typing = event["typing"]

        await self.send(
            text_data=json.dumps({"type": "typing", "name": name, "typing": typing})
        )

    @sync_to_async
    def save_message(self, conversation_id, body, sent_to_id):
        """
        Save a message in a conversation.


        :param conversation_id: The ID of the conversation where the message belongs.
        :type conversation_id: int
        :param body: The content of the message.
        :type body: str
        :param sent_to_id: The ID of the recipient of the message.
        :type sent_to_id: int
        :return: None
        :rtype: None
        """
        user = self.scope["user"]

        ConversationMessage.objects.create(
            conversation_id=conversation_id,
            body=body,
            sent_to_id=sent_to_id,
            created_by=user,
        )

    @sync_to_async
    def mark_as_read(self, conversation_id):
        """
        Mark all unread messages in a conversation as read for the current user.


        :param conversation_id: The ID of the conversation to mark messages as read.
        :type conversation_id: int
        :return: None
        :rtype: None
        """
        user = self.scope["user"]
        messages = ConversationMessage.objects.filter(
            conversation_id=conversation_id, sent_to_id=user.id, read=False
        )
        for message in messages:
            message.mark_as_read()
