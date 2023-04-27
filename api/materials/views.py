from rest_framework.decorators import api_view
from rest_framework.response import Response

from materials.models import Material

from materials.serializers import MaterialSerializer

@api_view(["GET"])
def get_materials(request):
    materials = Material.objects.all()
    serializer = MaterialSerializer(materials, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_material(request, pk):
    material = Material.objects.get(id=pk)
    serializer = MaterialSerializer(material, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def add_material(request):
    serializer = MaterialSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)