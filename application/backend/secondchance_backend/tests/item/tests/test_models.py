import pytest
from item.models import Item
from django.urls import reverse
from item.models import Rental


@pytest.mark.django_db
def test_item_image_url_without_image(test_user):
    """
    Test the image_url method when the item has no associated image.
    """

    item = Item.objects.create(
        title="Test Item Without Image",
        description="An item without an image.",
        price_per_day=10,
        condition="New",
        country="USA",
        category="Electronics",
        seller=test_user,
    )

    assert item.image_url() is None


@pytest.mark.django_db
def test_items_list_no_token(client):
    """
    Test items_list when no token is provided.
    """
    response = client.get(reverse("api_items_list"))
    assert response.status_code == 200
    assert response.json()["data"] == []


@pytest.mark.django_db
def test_items_list_date_filter(client, test_user, test_item):
    """
    Test items_list with date-based filtering.
    """

    Rental.objects.create(
        item=test_item,
        start_date="2024-12-01",
        end_date="2024-12-10",
        number_of_days=10,
        total_price=100,
        created_by=test_user,
    )

    url = reverse("api_items_list") + "?checkIn=2024-12-05&checkOut=2024-12-07"
    response = client.get(url)
    assert response.status_code == 200
    assert len(response.json()["data"]) == 0


@pytest.mark.django_db
def test_items_list_filter_by_seller(client, test_user, test_item):
    """
    Test items_list with seller ID filtering.
    """
    url = reverse("api_items_list") + f"?seller_id={test_user.id}"
    response = client.get(url)
    assert response.status_code == 200
    assert len(response.json()["data"]) == 1


@pytest.mark.django_db
def test_items_list_filter_by_condition(client, test_user, test_item):
    """
    Test items_list with condition filtering.
    """
    url = reverse("api_items_list") + f"?condition={test_item.condition}"
    response = client.get(url)
    assert response.status_code == 200
    assert len(response.json()["data"]) == 1
