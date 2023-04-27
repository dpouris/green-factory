from django.contrib import admin
from django.urls import path, include

from api.views import get_mean

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("image/mean", view=get_mean),
    path("materials/", include("materials.urls")),
]
