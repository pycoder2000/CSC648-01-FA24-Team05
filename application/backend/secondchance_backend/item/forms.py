from django.forms import ModelForm
from item.models import Item


class ItemForm(ModelForm):
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
