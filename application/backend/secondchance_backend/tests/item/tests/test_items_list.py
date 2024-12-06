import pytest
from django.urls import reverse
import os


@pytest.mark.django_db
def test_items_list(client, test_user, test_item):
    """
    Test the items list API with filtering and user-specific behavior.
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
        test_item.image.save("test_image.jpg", image_file)

    url = reverse("api_items_list")
    response = client.get(url, HTTP_AUTHORIZATION=f"Bearer {access_token}")
    assert response.status_code == 200
    assert len(response.json()["data"]) > 0

    url = f"{url}?category={test_item.category}"
    response = client.get(url, HTTP_AUTHORIZATION=f"Bearer {access_token}")
    assert response.status_code == 200
    assert len(response.json()["data"]) == 1
