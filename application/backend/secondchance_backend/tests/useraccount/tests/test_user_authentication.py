import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_user_authentication(client, test_user):
    """
    Test user authentication using the test_user fixture.
    """
    login_data = {
        "email": test_user.email,
        "password": "password123",
    }

    url = reverse("rest_login")
    response = client.post(url, login_data)

    assert response.status_code == 200
    assert "access" in response.json()
    assert "refresh" in response.json()
