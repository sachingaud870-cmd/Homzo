import django_filters
from .models import Property


class PropertyFilter(django_filters.FilterSet):

    min_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="gte"
    )

    max_price = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="lte"
    )

    class Meta:
        model = Property
        fields = [
            "location",
            "bhk",
            "status",
            "featured",
        ]