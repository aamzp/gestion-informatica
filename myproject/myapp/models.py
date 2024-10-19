from django.db import models

class Articulo(models.Model):
    CATEGORIAS = [
        ('INSUMO', 'Insumo'),
        ('IMPLEMENTO', 'Implemento'),
    ]

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=10, choices=CATEGORIAS)
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    ultima_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre