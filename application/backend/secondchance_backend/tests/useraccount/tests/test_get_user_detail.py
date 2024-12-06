import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_get_user_detail(client, test_user):
    """
    Test retrieving user details by primary key.
    """
    url = reverse("api_user_detail", args=[test_user.pk])
    response = client.get(url)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == str(test_user.id)
    assert data["email"] == test_user.email


@pytest.mark.django_db
def test_get_user_detail_invalid_pk(client):
    """
    Test retrieving user details with an invalid primary key.
    """
    invalid_pk = "00000000-0000-0000-0000-000000000000"
    url = reverse("api_user_detail", args=[invalid_pk])
    response = client.get(url)
    assert response.status_code == 404
