from rest_framework import serializers
from .models import Articulo

class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = ['id',
                    'nombre',
                    'descripcion',
                    'categoria',
                    'cantidad',
                    'precio',
                    'fecha_registro',
                    'ultima_modificacion']