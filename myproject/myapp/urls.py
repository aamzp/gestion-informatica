from django.urls import path
from .views import ArticuloListCreateView, ArticuloRetrieveUpdateDestroyView

urlpatterns = [
    path('articulos/', ArticuloListCreateView.as_view(), name='articulo-list-create'),
    path('articulos/<int:id>/', ArticuloRetrieveUpdateDestroyView.as_view(),
        name='articulo-detail'),
]