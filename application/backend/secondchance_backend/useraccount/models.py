import uuid
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
from django.utils import timezone
from enum import Enum 
# from item.utils.categories import get_user_listed_categories, get_user_rented_categories

# this breaks the code 
# from item.models import Item
# from item.models import Rental

class CustomUserManager(UserManager):
    """
    Custom manager for the User model, providing methods to create standard users and superusers.

    Methods:
        _create_user: Internal method for creating a user with email, name, and password.
        create_user: Public method to create a standard user. Sets is_staff and is_superuser to False.
        create_superuser: Public method to create a superuser. Sets is_staff and is_superuser to True.
    """

    def _create_user(self, name, email, password, **extra_fields):
        """
        Internal helper method to create and save a user with the given name, email, and password.

        :param name: The name of the user.
        :type name: str
        :param email: The user's email (must be provided and valid).
        :type email: str
        :param password: The user's password.
        :type password: str
        :param extra_fields: Additional fields to be set on the user object.
        :type extra_fields: dict
        :raises ValueError: If email is not provided.
        :return: The created user object.
        :rtype: User
        """
        if not email:
            raise ValueError("You have not specified a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        """
        Create and return a standard user.

        :param name: The name of the user.
        :type name: str, optional
        :param email: The user's email.
        :type email: str, optional
        :param password: The user's password.
        :type password: str, optional
        :param extra_fields: Additional fields to be set on the user object.
        :type extra_fields: dict
        :return: The created user object.
        :rtype: User
        """
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(name, email, password, **extra_fields)

    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        """
        Create and return a superuser.

        :param name: The name of the user.
        :type name: str, optional
        :param email: The user's email.
        :type email: str, optional
        :param password: The user's password.
        :type password: str, optional
        :param extra_fields: Additional fields to be set on the user object.
        :type extra_fields: dict
        :return: The created superuser object.
        :rtype: User
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model extending Django's AbstractBaseUser and PermissionsMixin.

    Attributes:
        id (UUIDField): Primary key, auto-generated UUID4 value.
        email (EmailField): Unique email address.
        name (CharField): Name of the user, defaulting to "Anonymous User".
        avatar (ImageField): ImageField for user avatar, stored in "uploads/avatars" (optional).
        phone (CharField): CharField for user phone number (optional).
        birthday (DateField): DateField for user's birthday (optional).
        city (CharField): CharField for user's city (optional).
        state (CharField): CharField for user's state (optional).
        country (CharField): CharField for user's country (optional).
        items_rented_out (IntegerField): IntegerField to track the number of items rented out.
        items_rented (IntegerField): IntegerField to track the number of items rented.
        sustainability_score (FloatField): FloatField to represent user's sustainability score.
        is_active (BooleanField): BooleanField, indicates if the user is active.
        is_superuser (BooleanField): BooleanField, indicates if the user is a superuser.
        is_staff (BooleanField): BooleanField, indicates if the user has staff privileges.
        date_joined (DateTimeField): DateTimeField, automatically set on user creation.
        last_login (DateTimeField): DateTimeField, tracks the last login time.

    Methods:
        avatar_url: Returns the full URL of the user's avatar or an empty string if no avatar exists.
        increment_items_rented_out: Increments items rented out and recalculates sustainability score.
        increment_items_rented: Increments items rented and recalculates sustainability score.
        calculate_sustainability_score: Calculates the user's sustainability score based on activity.
        save: Overrides the default save method to always recalculate the sustainability score.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(
        max_length=255, blank=False, null=False, default="Anonymous User"
    )
    avatar = models.ImageField(upload_to="uploads/avatars", blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    items_rented_out = models.IntegerField(default=0)
    items_rented = models.IntegerField(default=0)
    sustainability_score = models.FloatField(default=0.0)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def avatar_url(self):
        """
        Returns the full URL of the user's avatar.


        :return: Full URL of the avatar if present, or an empty string if no avatar exists.
        :rtype: str
        """
        if self.avatar:
            return f"{settings.WEBSITE_URL}{self.avatar.url}"
        else:
            return ""

    def increment_items_rented_out(self):
        """
        Increment the number of items rented out by the user.
        Recalculates and updates the sustainability score.


        :return: None
        :rtype: None
        """
        self.items_rented_out += 1
        self.calculate_sustainability_score()
        self.save(update_fields=["items_rented_out", "sustainability_score"])

    def increment_items_rented(self):
        """
        Increment the number of items rented by the user.
        Recalculates and updates the sustainability score.


        :return: None
        :rtype: None
        """
        print("==CALLED: increment_items_rented()==")
        # self.refresh_from_db()
        print("--userinfo--")
        print(f"User ID: {self.id}")
        print(f"User Email: {self.email}")
        print(f"User Name: {self.name}")
        
        print(f"Before increment: {self.items_rented}")
        self.items_rented += 1
        print(f"After increment: {self.items_rented}")
        self.calculate_sustainability_score()
        print(f"After score calculation: {self.sustainability_score}")
        self.save(update_fields=["items_rented", "sustainability_score"])
        print(self.items_rented)
        print("Items rented and score saved successfully")
        

    def calculate_sustainability_score(self):
        """
        Calculate and update the user's sustainability score based on platform activity.

        Formula:
        - Weighted sum of items rented out, items rented, and days on the platform.
        - Score is normalized and capped between 1 and 100.


        :return: None
        :rtype: None
        """
        print("==CALLED: calculate_sustainability_score==")
        # Concept for changes to the sustainability score:
        # consider the type of item that is being sold and assign each item type a weight
        # ex. clothing will have a higher weight than electronics because it can be
        # wasteful to have 1 set of clothes for just 1 occassion
        # It should provide a discount
        # It should not be used to deminish anyone's contribution
        #       the way it is displayed already shows is as an overall positive attribute
        # When computing the score we could also consider how many of the items are
        # currently being rented
        #       con: score will constantly fluxuate
        
        
        # 30% of total score = days since join date
        max_normalized_score = 100
        
        if self.date_joined:
            days_on_platform = (timezone.now() - self.date_joined).days
            
            # compute how many days out of 2 years the user has been on the platform
            # then normalize it
            
        else:
            days_on_platform = 0

        max_points_date_joined = 730 # 2 years in days since the user joined the platform
        time_score = min((days_on_platform / max_points_date_joined) * 100, 100)
        print("--sustainability time score-- ", time_score)
        # get the items rented by the user

        if self.items_rented or self.items_rented_out != 0:
            from item.utils.categories import get_user_rented_categories
            
            # listed_items = Item.objects.filter(seller=self.id)
            # print(listed_items)
            # for item in listed_items:
            #     print("item title: %s", item.title)
            
            rented_categories = get_user_rented_categories(self)        
            print(rented_categories)
            
            rented_items_weighted = 0 # temp
            for category in rented_categories:
                print(category)
                print(CATEGORY_WEIGHTS[category.lower()])
                
        else:
            rented_items_weighted = 0
            
        print("--sustainability rented score-- PLACEHOLDER:", 0)
            
        max_rented_score = 30
            
        rented_items_score = 0 # compute here
        
        # print(self.items_rented)
        
        # rented out = listed by user
        if self.items_rented_out:
            from item.utils.categories import get_user_listed_categories
            listed_categories = get_user_listed_categories(self)
            
            # print(listed_categories)
            listed_items_weighted = 0
            for category in listed_categories:
                listed_items_weighted += CATEGORY_WEIGHTS[category.lower()]
            
        else:
            listed_items_weighted = 0
            
        max_listed_score = 50
            
        listed_items_score = min(max((listed_items_weighted / max_listed_score) * 100, 0), max_normalized_score) # compute here
        print("--sustainability listed score-- ", listed_items_score)
        # print("--TEST LISTED ITEM SCORE 100--")
        # print(min(max((60 / max_listed_score) * 100, 0), max_normalized_score))
        # print("--TEST LISTED ITEM SCORE 3--")
        # print(min(max((3 / max_listed_score) * 100, 0), max_normalized_score))
        

        score = (
            (self.items_rented_out * 2.5)
            + (self.items_rented * 1.5)
            + (days_on_platform * 0.1)
        )

        max_score = 100
        normalized_score = min(max(round(score), 0), max_score)
        
        
        
        # update user's score in DB
        self.sustainability_score = normalized_score

    def save(self, *args, **kwargs):
        """
        Override the save method to recalculate the sustainability score before saving.


        :return: None
        :rtype: None
        """
        self.calculate_sustainability_score()
        super().save(*args, **kwargs)


# used to map weights to the different item categories
# class ItemCategory(Enum):
#     ELECTRONICS = "Electronics"
#     FURNITURE = "Furniture"
#     CLOTHING = "Clothing"
#     BOOKS = "Books"
#     APPLIANCES = "Appliances"
#     SPORTS = "Sports"
#     TOYS = "Toys"
#     TOOLS = "Tools"
#     VEHICLES = "Vehicles"
#     PARTY = "Party"
#     MUSIC = "Music"
#     PHOTOGRAPHY = "Photography"
#     GARDENING = "Gardening"
#     OFFICE = "Office"
#     OTHER = "Other"
    
# Dictionary containing weights corresponding to each category
# CATEGORY_WEIGHTS = {
#     "Electronics" = 2,
#     "Furniture" = 1.5,
#     "Clothing" = 3,
#     "Books" = 3,
#     "Appliances" = 2,
#     "Sports" = 2.5,
#     "Toys" = 2.5,
#     "Tools" = 2,
#     "Vehicles" = 2,
#     "Party" = 2,
#     "Music" = 1,
#     "Photography" = 1,
#     "Gardening" = 1.5,
#     "Office" = 1,
#     "Other" = 1,
# }
CATEGORY_WEIGHTS = {
    "electronics": 2,
    "furniture": 1.5,
    "clothing": 3,
    "books": 3,
    "appliances": 2,
    "sports": 2.5,
    "toys": 2.5,
    "tools": 2,
    "vehicles": 2,
    "party": 2,
    "music": 1,
    "photography": 1,
    "gardening": 1.5,
    "office": 1,
    "other": 1,
}