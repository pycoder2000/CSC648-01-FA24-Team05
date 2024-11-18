from django.apps import AppConfig


class ChatConfig(AppConfig):
    """
    Configuration class for the 'chat' app in Django.

    Attributes:
        default_auto_field (str): The default primary key type for models in the app.
        name (str): The name of the app.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "chat"
