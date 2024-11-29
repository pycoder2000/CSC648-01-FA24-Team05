import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_rent_item(client, test_user, test_item):
    """
    Test renting an item with valid and invalid data.
    """
    login_url = reverse("rest_login")
    login_data = {
        "email": test_user.email,
        "password": "password123",
    }
    login_response = client.post(login_url, login_data)
    assert login_response.status_code == 200
    access_token = login_response.json()["access"]

    rental_data = {
        "start_date": "2024-12-01",
        "end_date": "2024-12-05",
        "number_of_days": 4,
        "total_price": 60,
    }

    url = reverse("api_rent_item", args=[test_item.id])
    response = client.post(
        url,
        rental_data,
        HTTP_AUTHORIZATION=f"Bearer {access_token}",
    )
    assert response.status_code == 200

    invalid_rental_data = {
        "end_date": "2024-12-05",
    }
    response = client.post(
        url,
        invalid_rental_data,
        HTTP_AUTHORIZATION=f"Bearer {access_token}",
    )
    assert response.status_code == 400
