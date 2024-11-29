import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_rentals_list(client, test_user, test_item):
    """
    Test retrieving rentals for the current user.
    """

    login_url = reverse("rest_login")
    login_data = {"email": test_user.email, "password": "password123"}
    login_response = client.post(login_url, login_data)
    assert login_response.status_code == 200
    access_token = login_response.json()["access"]

    from item.models import Rental

    Rental.objects.create(
        item=test_item,
        start_date="2024-12-01",
        end_date="2024-12-05",
        number_of_days=4,
        total_price=60,
        created_by=test_user,
    )

    url = reverse("api_rentals_list")
    response = client.get(url, HTTP_AUTHORIZATION=f"Bearer {access_token}")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["item"]["id"] == str(test_item.id)
