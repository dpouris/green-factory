from django.urls import path

from materials.views import get_material, get_materials, add_material


urlpatterns = [
    path("", view=get_materials, name="materials"),
    path("add/", view=add_material, name="material"),
    path("<str:pk>/", view=get_material, name="material"),
]
