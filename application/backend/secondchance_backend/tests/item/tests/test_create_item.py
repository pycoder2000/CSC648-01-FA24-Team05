import pytest
from django.urls import reverse
import os


@pytest.mark.django_db
def test_create_item(client, test_user):
    """
    Test creating an item with valid and invalid data using a test image.
    """

    login_url = reverse("rest_login")
    login_data = {
        "email": test_user.email,
        "password": "password123",
    }
    login_response = client.post(login_url, login_data)
    assert login_response.status_code == 200
    access_token = login_response.json()["access"]

    test_image_path = os.path.join("tests", "assets", "test_image.jpg")

    with open(test_image_path, "rb") as image_file:
        valid_item_data = {
            "title": "New Item",
            "description": "A test item description.",
            "price_per_day": 10,
            "condition": "New",
            "country": "USA",
            "category": "Electronics",
            "image": image_file,
        }

        url = reverse("api_create_item")
        response = client.post(
            url,
            valid_item_data,
            HTTP_AUTHORIZATION=f"Bearer {access_token}",
            format="multipart",
        )

        assert response.status_code == 200
        assert response.json()["success"] is True

    invalid_item_data = {
        "description": "A test item description.",
        "price_per_day": 10,
    }
    response = client.post(
        url,
        invalid_item_data,
        HTTP_AUTHORIZATION=f"Bearer {access_token}",
    )
    assert response.status_code == 400
