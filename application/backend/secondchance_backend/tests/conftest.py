import os
import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from useraccount.models import User
from item.models import Item


@pytest.fixture
def test_user(db):
    """Create a reusable test user."""
    return User.objects.create_user(
        email="testuser@example.com", password="password123", name="Test User"
    )


@pytest.fixture
def test_item(db, test_user):
    """
    Create a reusable test item with an associated image.
    """
    test_image_path = os.path.join("tests", "assets", "test_image.jpg")
    with open(test_image_path, "rb") as image_file:
        test_image = SimpleUploadedFile(
            name="test_image.jpg", content=image_file.read(), content_type="image/jpeg"
        )
        return Item.objects.create(
            title="Test Item",
            description="A test item for filters.",
            price_per_day=20,
            condition="New",
            country="USA",
            category="Electronics",
            seller=test_user,
            image=test_image,
        )
