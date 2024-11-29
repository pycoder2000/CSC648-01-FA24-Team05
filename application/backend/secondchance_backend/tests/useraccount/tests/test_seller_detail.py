import pytest
from django.urls import reverse
from uuid import uuid4


@pytest.mark.django_db
def test_seller_detail(client, test_user):
    """
    Test retrieving seller details with a valid primary key.
    """
    url = reverse("api_seller_detail", args=[test_user.pk])
    response = client.get(url)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == str(test_user.id)
    assert data["email"] == test_user.email


@pytest.mark.django_db
def test_seller_detail_invalid_pk(client):
    """
    Test retrieving seller details with an invalid primary key.
    """
    invalid_pk = uuid4()
    url = reverse("api_seller_detail", args=[invalid_pk])
    response = client.get(url)
    assert response.status_code == 404
    assert response.json() == {"error": "Seller not found."}
