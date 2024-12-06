import pytest
from django.urls import reverse
import os
from item.models import Rental


@pytest.mark.django_db
def test_item_rentals(client, test_user, test_item):
    """
    Test fetching rentals for an item using JWT authentication.
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
        test_item.save()

    Rental.objects.create(
        item=test_item,
        start_date="2024-12-01",
        end_date="2024-12-05",
        number_of_days=4,
        total_price=60,
        created_by=test_user,
    )

    url = reverse("api_item_rentals", args=[test_item.id])
    response = client.get(
        url,
        HTTP_AUTHORIZATION=f"Bearer {access_token}",
    )

    assert response.status_code == 200
    rentals = response.json()
    assert len(rentals) == 1
    rental = rentals[0]
    assert rental["item"]["id"] == str(test_item.id)
    assert rental["start_date"] == "2024-12-01"
    assert rental["end_date"] == "2024-12-05"
    assert rental["number_of_days"] == 4
    assert rental["total_price"] == 60
