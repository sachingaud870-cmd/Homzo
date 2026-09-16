from rest_framework import generics

from django_filters.rest_framework import DjangoFilterBackend

from .models import Property
from .serializers import PropertySerializer
from .filters import PropertyFilter


# =========================================================
# GET ALL PROPERTIES + CREATE PROPERTY
# =========================================================

class PropertyListCreateAPIView(generics.ListCreateAPIView):

    queryset = Property.objects.all()

    serializer_class = PropertySerializer

    filter_backends = [
        DjangoFilterBackend
    ]

    filterset_class = PropertyFilter


# =========================================================
# GET ONE PROPERTY + UPDATE + DELETE
# =========================================================

class PropertyRetrieveUpdateDestroyAPIView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Property.objects.all()

    serializer_class = PropertySerializer


# =========================================================
# AI / SMART PROPERTY RECOMMENDATIONS
# =========================================================

class PropertyRecommendationAPIView(generics.ListAPIView):

    serializer_class = PropertySerializer

    def get_queryset(self):

        # -------------------------------------------------
        # Get search parameters
        # -------------------------------------------------

        location = self.request.GET.get(
            "location",
            ""
        ).strip()

        bhk = self.request.GET.get(
            "bhk",
            ""
        ).strip()

        budget = self.request.GET.get(
            "budget",
            ""
        ).strip()


        # -------------------------------------------------
        # Get all properties
        # -------------------------------------------------

        properties = Property.objects.all()


        # -------------------------------------------------
        # Convert budget into number
        # -------------------------------------------------

        try:

            budget = float(budget) if budget else None

        except (ValueError, TypeError):

            budget = None


        # -------------------------------------------------
        # Calculate recommendation score
        # -------------------------------------------------

        scored_properties = []


        for property in properties:

            score = 0


            # =============================================
            # LOCATION MATCH
            # =============================================

            if location:

                property_location = (
                    property.location or ""
                ).lower()

                if location.lower() in property_location:

                    score += 40


            # =============================================
            # BHK MATCH
            # =============================================

            if bhk:

                if property.bhk == bhk:

                    score += 25


            # =============================================
            # BUDGET MATCH
            # =============================================

            if budget:

                try:

                    price = float(property.price)

                except (ValueError, TypeError):

                    price = None


                if price is not None:

                    # Within budget
                    if price <= budget:

                        score += 25


                    # Up to 10% above budget
                    elif price <= budget * 1.10:

                        score += 15


                    # Up to 20% above budget
                    elif price <= budget * 1.20:

                        score += 8


            # =============================================
            # SAVE PROPERTY + SCORE
            # =============================================

            scored_properties.append(
                (
                    property,
                    score
                )
            )


        # -------------------------------------------------
        # Sort by highest recommendation score
        # -------------------------------------------------

        scored_properties.sort(
            key=lambda item: item[1],
            reverse=True
        )


        # -------------------------------------------------
        # Return top 6 properties
        # -------------------------------------------------

        return [
            property
            for property, score
            in scored_properties[:6]
        ]