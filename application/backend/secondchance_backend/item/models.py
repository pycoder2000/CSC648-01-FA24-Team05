import uuid
from django.conf import settings
from django.db import models
from useraccount.models import User


class Item(models.Model):
    """
    Represents an item in a marketplace application.

    Attributes:
        id (UUIDField): Primary key, auto-generated UUID4 value.
        title (CharField): Title of the item, max length 255.
        description (TextField): Description of the item.
        price_per_day (IntegerField): Price per day for renting the item.
        condition (CharField): Condition of the item, max length 50.
        country (CharField): Country where the item is located, max length 255.
        category (CharField): Category of the item, max length 255.
        favorited (ManyToManyField): Many-to-Many relationship with User model.
        image (ImageField): Image of the item, uploaded to "uploads/items" directory.
        seller (ForeignKey): ForeignKey to User model, related name "items", on delete CASCADE.
        created_at (DateTimeField): Automatically set to the current date and time when the object is created.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price_per_day = models.IntegerField()
    condition = models.CharField(max_length=50)
    country = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    favorited = models.ManyToManyField(User, related_name="favorites", blank=True)
    image = models.ImageField(upload_to="uploads/items")
    seller = models.ForeignKey(User, related_name="items", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def image_url(self):
        """
        Return the full URL of the image by combining the base website URL with the image URL.

        :return: The full image URL.
        :rtype: str
        """
        if self.image:
            return f"{settings.WEBSITE_URL}{self.image.url}"
        return None


class Rental(models.Model):
    """
    Represents a rental of an item.

    Attributes:
        id (UUIDField): Primary key, auto-generated UUID4 value.
        item (ForeignKey): ForeignKey to Item model, related name "rentals", on delete CASCADE.
        start_date (DateField): Start date of the rental.
        end_date (DateField): End date of the rental.
        number_of_days (IntegerField): Number of days for the rental.
        total_price (FloatField): Total price for the rental.
        created_by (ForeignKey): ForeignKey to User model, related name "rentals", on delete CASCADE.
        created_at (DateTimeField): Automatically set to the current date and time when the object is created.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item = models.ForeignKey(Item, related_name="rentals", on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_days = models.IntegerField()
    total_price = models.FloatField()
    created_by = models.ForeignKey(
        User, related_name="rentals", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
