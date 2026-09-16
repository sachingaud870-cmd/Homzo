from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from properties.models import Property
from .models import PropertyImage
from .serializers import PropertyImageUploadSerializer


class PropertyImageUploadAPIView(APIView):

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):

        property_record = Property.objects.filter(pk=pk).first()

        if property_record is None:
            return Response(
                {"detail": "Property not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        images = request.FILES.getlist("images")

        if not images:
            return Response(
                {"images": ["At least one image is required."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        created_images = [
            PropertyImage.objects.create(
                property=property_record,
                image=image,
                is_main=not property_record.images.exists() and index == 0,
            )
            for index, image in enumerate(images)
        ]

        return Response(
            PropertyImageUploadSerializer(
                created_images,
                many=True,
                context={"request": request}
            ).data,
            status=status.HTTP_201_CREATED
        )


class PropertyImageDeleteAPIView(APIView):

    def delete(self, request, pk):

        image = PropertyImage.objects.filter(pk=pk).first()

        if image is None:
            return Response(
                {"detail": "Image not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        image.delete()

        return Response(
            {"detail": "Image deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )


class PropertyImageSetMainAPIView(APIView):

    def post(self, request, pk):
        image = PropertyImage.objects.filter(pk=pk).first()

        if image is None:
            return Response(
                {"detail": "Image not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        PropertyImage.objects.filter(property=image.property).update(is_main=False)
        image.is_main = True
        image.save(update_fields=["is_main"])

        return Response(
            PropertyImageUploadSerializer(
                image,
                context={"request": request}
            ).data,
            status=status.HTTP_200_OK
        )