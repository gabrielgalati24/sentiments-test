# Nombre del Proyecto
Prueba tecnica 


## Requisitos

- Docker
- Docker Compose
- Node.js
- npm
- python

## Instrucciones de instalación

#FRONTEND

```bash
cd frontend && npm i && npm run dev
```

#Backend

Para ejecutar el proyecto, usa Docker Compose:

```bash
cd django_sentiment_analysis && pip install  -r .\requirements.txt && python .\manage.py runserver 
```

Esto iniciará tanto el frontend como el backend.

Pruebas
Para ejecutar las pruebas en el frontend y el backend, primero debes instalar las dependencias:

Frontend ---> npm run test

backend --->  python .\manage.py test 

Luego, puedes ejecutar las pruebas con:

npm test


EXTRA: 
 PONER EL CSV CON LA DATA DENTRO DEL PROYECTO DE DJANGO EN LA CARPETA DE assets
LA API KEY DE HUGGING_FACE se pueden cambiar en el .env de django