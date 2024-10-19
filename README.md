# Sistema de Gestión de Inventario API

Este proyecto es una API sencilla para gestionar el inventario de artículos. Permite registrar, modificar, eliminar y asignar categorías a los artículos en el sistema de inventario.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas antes de empezar:

- Python 3.x
- pip (el gestor de paquetes de Python)
- Virtualenv (obligatorio, para aislar el entorno de desarrollo)

## Instalación

Sigue el manual para la instalación de Django. Recuerda generar una carpeta para que sirva de raiz.

## SUPERUSUARIO

gourmet, 1234

## Endpoints de la API
1. Listar y crear artículos
URL: /api/articulos/
Métodos: GET, POST
Ejemplo de creación de artículo (POST):
json
Copiar código
{
  "nombre": "Nuevo Artículo",
  "descripcion": "Descripción del artículo",
  "categoria": "insumo",
  "cantidad": 100,
  "precio": 15.50
}
2. Obtener, modificar y eliminar un artículo
URL: /api/articulos/<id>/
Métodos: GET, PUT, PATCH, DELETE
Ejemplo de eliminación de un artículo (DELETE):
bash
Copiar código
curl -X DELETE http://127.0.0.1:8000/api/articulos/1/
Probar la API
Puedes probar la API utilizando herramientas como Postman o curl en la línea de comandos. También puedes acceder a los datos directamente desde un navegador en los métodos GET.

Ejemplo de curl para listar artículos:
bash
Copiar código
curl -X GET http://127.0.0.1:8000/api/articulos/
