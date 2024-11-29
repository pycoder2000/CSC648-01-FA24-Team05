import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_favorite_item_toggle(client, test_user, test_item):
    """
    Test the favorite item toggle functionality using JWT authentication.
    """

    login_url = reverse("rest_login")
    login_data = {
        "email": test_user.email,
        "password": "password123",
    }
    login_response = client.post(login_url, login_data)
    assert login_response.status_code == 200
    access_token = login_response.json()["access"]

    url = reverse("api_toggle_favorite", args=[test_item.id])

    response = client.post(
        url,
        HTTP_AUTHORIZATION=f"Bearer {access_token}",
    )
    assert response.status_code == 200
    assert response.json()["is_favorite"] is True
    assert test_user in test_item.favorited.all()

    response = client.post(
        url,
        HTTP_AUTHORIZATION=f"Bearer {access_token}",
    )
    assert response.status_code == 200
    assert response.json()["is_favorite"] is False
    assert test_user not in test_item.favorited.all()
