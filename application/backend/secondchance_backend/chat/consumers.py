import openai
import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import ConversationMessage
from item.models import Item, Rental
from datetime import datetime, timedelta


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


class ChatbotConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
        Establish WebSocket connection for the chatbot.
        """
        await self.accept()

    async def disconnect(self, close_code):
        """
        Disconnect WebSocket connection.
        """
        pass

    async def receive(self, text_data):
        """
        Handle incoming WebSocket messages and respond using OpenAI API.
        """
        data = json.loads(text_data)
        user_message = data.get("message", "").strip()

        if user_message:
            bot_response = await self.process_user_message(user_message)
            await self.send(
                text_data=json.dumps({"type": "message", "body": bot_response})
            )

    async def process_user_message(self, user_message):
        """
        Process the user's message and generate appropriate responses.
        """
        items = await sync_to_async(list)(Item.objects.all())
        items_details = "\n".join(
            [
                f"ID: {item.id}\n"
                f"Title: {item.title}\n"
                f"Category: {item.category}\n"
                f"Country: {item.country}\n"
                f"Condition: {item.condition}\n"
                f"Price per Day: ${item.price_per_day}\n"
                f"Description: {item.description}\n"
                for item in items
            ]
        )

        context_message = f"""
        You are a helpful assistant for the SecondChance EcoRental platform, where people can rent items sustainably.

        Users may want to browse, filter, or book items. Please assist them by providing relevant options based on their requests.

        Here are some things you can do:
        - Provide available items based on filters such as category, country, and condition.
        - If a user asks about an item, provide the relevant details like price, description, and availability.
        - If a user wants to rent an item, confirm the details such as number of days and location, calculate the full price before tax, and ask them to confirm by typing "Rent Item".
        Here are the available items:
        {items_details}
        """

        try:
            client = openai.OpenAI()
            response = await sync_to_async(client.chat.completions.create)(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": context_message},
                    {"role": "user", "content": user_message},
                ],
                temperature=0.7,
            )
            bot_reply = response.choices[0].message.content.strip()

            if "rent this item" in user_message.lower():

                item_id = self.extract_item_id(user_message)
                if item_id:
                    item = await sync_to_async(Item.objects.get)(id=item_id)
                    return (
                        f"You selected to rent:\n"
                        f"Title: {item.title}\n"
                        f"Price per Day: ${item.price_per_day}\n"
                        f"Please provide the following details:\n"
                        f"- Number of days you want to rent the item\n"
                        f"- Location for delivery\n"
                    )

            if (
                "number of days" in user_message.lower()
                and "location" in user_message.lower()
            ):

                number_of_days, location = self.extract_rental_details(user_message)
                item_id = self.current_item_id
                item = await sync_to_async(Item.objects.get)(id=item_id)
                total_price = item.price_per_day * number_of_days

                return (
                    f"Here are the details for your rental:\n"
                    f"- Item: {item.title}\n"
                    f"- Number of Days: {number_of_days}\n"
                    f"- Location: {location}\n"
                    f"- Total Price (before tax): ${total_price}\n"
                    f"Type 'Rent Item' to confirm and proceed."
                )

            if "rent item" in user_message.lower():

                item_id = self.current_item_id
                user = self.scope["user"]
                number_of_days = self.current_rental_days
                total_price = self.current_total_price

                rental_data = {
                    "start_date": str(datetime.now().date()),
                    "end_date": str(
                        datetime.now().date() + timedelta(days=number_of_days)
                    ),
                    "number_of_days": number_of_days,
                    "total_price": total_price,
                }

                await self.rent_item(item_id, rental_data, user)

                return "Booking confirmed! Thank you for using SecondChance."

            return bot_reply
        except Exception as e:
            return f"An error occurred: {str(e)}"

    async def rent_item(self, item_id, rental_data, user):
        """
        Calls the rent_item function from the Item subapp to create a rental.
        """
        try:
            from item.api import rent_item

            request_data = {
                "POST": rental_data,
                "user": user,
            }
            await sync_to_async(rent_item)(request_data, item_id)
        except Exception as e:
            raise e

    def extract_item_id(self, user_message):
        """
        Extract the item ID from the user's message.
        """

        pass

    def extract_rental_details(self, user_message):
        """
        Extract rental details such as number of days and location from the user's message.
        """

        pass
