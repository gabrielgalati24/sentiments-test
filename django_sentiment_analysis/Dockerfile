# Usar una imagen oficial de Python como imagen base
FROM python:3.8-slim-buster

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Agregar el directorio actual (es decir, el directorio de la aplicación Django) al contenedor en /app
ADD . /app

# Instalar las dependencias de la aplicación
RUN pip install --no-cache-dir -r requirements.txt

# Hacer que el puerto 8000 esté disponible para el mundo exterior
EXPOSE 8000

# Ejecutar el comando manage.py runserver 0.0.0.0:8000 cuando se inicie el contenedor
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
