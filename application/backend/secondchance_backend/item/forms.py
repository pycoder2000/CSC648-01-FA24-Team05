from django.forms import ModelForm
from item.models import Item


class ItemForm(ModelForm):
    """
    A form for creating or updating an Item model.

    Attributes:
        model (Model): The model associated with the form.
        fields (tuple): The fields to include in the form: title, description, price_per_day, condition, country, category, image.
    """

    class Meta:
        model = Item
        fields = (
            "title",
            "description",
            "price_per_day",
            "condition",
            "country",
            "category",
            "image",
        )
