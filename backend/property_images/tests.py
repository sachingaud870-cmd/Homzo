from io import BytesIO

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from PIL import Image
from rest_framework.test import APIClient

from properties.models import Property
from .models import PropertyImage


class PropertyImageUploadTests(TestCase):
    def setUp(self):
        self.property = Property.objects.create(
            project_name="Skyline Residences",
            builder_name="Green Build",
            location="Andheri",
            carpet_area=1200,
            price=75000000,
            description="A modern property",
        )
        self.client = APIClient()

    def _create_uploaded_image(self, name: str) -> SimpleUploadedFile:
        image = Image.new("RGB", (100, 100), color="white")
        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        return SimpleUploadedFile(
            name,
            buffer.getvalue(),
            content_type="image/jpeg",
        )

    def test_multiple_images_can_be_uploaded_for_property(self):
        response = self.client.post(
            f"/api/properties/{self.property.pk}/images/",
            {
                "images": [
                    self._create_uploaded_image("image-1.jpg"),
                    self._create_uploaded_image("image-2.jpg"),
                ]
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(PropertyImage.objects.filter(property=self.property).count(), 2)

    def test_image_can_be_set_as_primary(self):
        first_image = PropertyImage.objects.create(
            property=self.property,
            image=self._create_uploaded_image("primary.jpg"),
            is_main=True,
        )
        second_image = PropertyImage.objects.create(
            property=self.property,
            image=self._create_uploaded_image("secondary.jpg"),
            is_main=False,
        )

        response = self.client.post(f"/api/properties/images/{second_image.pk}/set-main/")

        self.assertEqual(response.status_code, 200)
        first_image.refresh_from_db()
        second_image.refresh_from_db()
        self.assertFalse(first_image.is_main)
        self.assertTrue(second_image.is_main)
