from django.apps import AppConfig


class UseraccountConfig(AppConfig):
    """
    Configure the useraccount app with the following settings:

    Attributes:
        default_auto_field (str): The default primary key field type for models in the app is set to "django.db.models.BigAutoField".
        name (str): The name of the app is set to "useraccount".
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "useraccount"
