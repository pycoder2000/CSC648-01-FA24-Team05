import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_items_list_filters(client, test_user, test_item):
    """
    Test items list API with filters.
    """

    login_url = reverse("rest_login")
    login_data = {
        "email": test_user.email,
        "password": "password123",
    }
    login_response = client.post(login_url, login_data)
    assert login_response.status_code == 200
    access_token = login_response.json()["access"]

    base_url = reverse("api_items_list")

    test_item.favorited.add(test_user)
    url = f"{base_url}?is_favorites=true"
    response = client.get(url, HTTP_AUTHORIZATION=f"Bearer {access_token}")
    assert response.status_code == 200
    assert len(response.json()["data"]) == 1

    url = f"{base_url}?country={test_item.country}"
    response = client.get(url, HTTP_AUTHORIZATION=f"Bearer {access_token}")
    assert response.status_code == 200
    assert len(response.json()["data"]) == 1

    url = f"{base_url}?category={test_item.category}"
    response = client.get(url, HTTP_AUTHORIZATION=f"Bearer {access_token}")
    assert response.status_code == 200
    assert len(response.json()["data"]) == 1
