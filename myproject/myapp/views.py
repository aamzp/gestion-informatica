from rest_framework import generics
from .models import Articulo
from .serializers import ArticuloSerializer

# Vista para listar y crear artículos
class ArticuloListCreateView(generics.ListCreateAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer

# Vista para obtener, actualizar o eliminar un artículo por ID
class ArticuloRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    lookup_field = 'id'