import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ConversationMessage


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
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
        body = event["body"]
        name = event["name"]

        await self.send(
            text_data=json.dumps({"type": "message", "body": body, "name": name})
        )

    async def read_notification(self, event):
        conversation_id = event["conversation_id"]
        user_id = event["user_id"]

        await self.send(
            text_data=json.dumps({
                "type": "read",
                "conversation_id": conversation_id,
                "user_id": user_id
            })
        )

    async def typing_notification(self, event):
        """Send typing status to the WebSocket."""
        name = event["name"]
        typing = event["typing"]

        await self.send(
            text_data=json.dumps({"type": "typing", "name": name, "typing": typing})
        )

    @sync_to_async
    def save_message(self, conversation_id, body, sent_to_id):
        user = self.scope["user"]

        ConversationMessage.objects.create(
            conversation_id=conversation_id,
            body=body,
            sent_to_id=sent_to_id,
            created_by=user,
        )

    @sync_to_async
    def mark_as_read(self, conversation_id):
        """Mark all messages in the conversation as read for the current user."""
        user = self.scope["user"]
        messages = ConversationMessage.objects.filter(
            conversation_id=conversation_id, sent_to_id=user.id, read=False
        )
        for message in messages:
            message.mark_as_read()
