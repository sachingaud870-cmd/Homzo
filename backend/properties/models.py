from django.db import models


class Property(models.Model):

    STATUS_CHOICES = [
        ("UNDER_CONSTRUCTION", "Under Construction"),
        ("READY_TO_MOVE", "Ready To Move"),
    ]

    BHK_CHOICES = [
        ("1BHK", "1 BHK"),
        ("2BHK", "2 BHK"),
        ("3BHK", "3 BHK"),
        ("4BHK", "4 BHK"),
    ]

    project_name = models.CharField(
        max_length=200,
        default="Unknown Project"
    )

    builder_name = models.CharField(
        max_length=200,
        default="Unknown Builder"
    )

    location = models.CharField(
        max_length=100
    )

    bhk = models.CharField(
        max_length=20,
        choices=BHK_CHOICES,
        default="2BHK"
    )

    carpet_area = models.IntegerField(
        default=0
    )

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    rera_number = models.CharField(
        max_length=100,
        blank=True
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default="READY_TO_MOVE"
    )

    possession_date = models.DateField(
        null=True,
        blank=True
    )

    featured = models.BooleanField(
        default=False
    )

    description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.project_name