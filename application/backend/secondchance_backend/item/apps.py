from django.apps import AppConfig


class ItemConfig(AppConfig):
    """
    Configure the settings for the "item" app in a Django project.

    Attributes:
        default_auto_field (str): The default primary key field type for models in the "item" app.
        name (str): The name of the app.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "item"
