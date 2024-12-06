import pytest
from django.urls import reverse
from useraccount.models import User


@pytest.mark.django_db
def test_user_registration(client, db):
    """
    Test user registration using the registration endpoint.
    """
    user_data = {
        "email": "newuser@example.com",
        "password1": "securepassword123",
        "password2": "securepassword123",
        "name": "New User",
    }

    url = reverse("rest_register")
    response = client.post(url, user_data)

    assert response.status_code == 201
    assert "access" in response.json()
    assert "refresh" in response.json()

    assert User.objects.filter(email="newuser@example.com").exists()

    user = User.objects.get(email="newuser@example.com")
    assert user.name == "New User"
