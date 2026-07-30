from django.contrib import admin
from .models import Property
from property_images.models import PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):

    list_display = (
        "project_name",
        "builder_name",
        "location",
        "bhk",
        "price",
        "status",
        "featured",
    )

    list_filter = (
        "location",
        "bhk",
        "status",
        "featured",
    )

    search_fields = (
        "project_name",
        "builder_name",
        "location",
    )

    inlines = [
        PropertyImageInline,
    ]