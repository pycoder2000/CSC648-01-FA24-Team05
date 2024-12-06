import pytest
from django.urls import reverse
import uuid


@pytest.mark.django_db
def test_items_detail(client, test_user, test_item):
    """
    Test retrieving item details.
    """

    test_image_path = "tests/assets/test_image.jpg"
    with open(test_image_path, "rb") as image_file:
        test_item.image.save("test_image.jpg", image_file)
        test_item.save()

    url = reverse("api_items_detail", args=[test_item.id])
    response = client.get(url)
    assert response.status_code == 200
    response_data = response.json()
    assert response_data["id"] == str(test_item.id)
    assert response_data["title"] == test_item.title
    assert response_data["description"] == test_item.description

    nonexistent_uuid = uuid.uuid4()
    invalid_url = reverse("api_items_detail", args=[nonexistent_uuid])
    response = client.get(invalid_url)
    assert response.status_code == 404
