from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from unittest.mock import patch, MagicMock


class RegisterViewTestCase(TestCase):
    def test_register(self):
        client = APIClient()
        url = "/api/register/"
        data = {
            "username": "test",
            "email": "test@gamil.com",
            "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test")
        self.assertEqual(User.objects.get().email, "test@gamil.com")
        
    def test_register_without_username(self):
        client = APIClient()
        url = "/api/register/"
        data = {
              "email": "test@gamil.com",
                "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_register_same_username(self):
        client = APIClient()
        url = "/api/register/"
        data = {
            "username": "test",
            "email": "test@gamil.com",
            "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test")
        self.assertEqual(User.objects.get().email, "test@gamil.com")
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test")
        self.assertEqual(User.objects.get().email, "test@gamil.com")

    def test_login (self):
        client = APIClient()
        url = "/api/register/"
        data = {
            "username": "test",
            "email": "test@gamil.com",
            "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        url = "/api/login/"
        data = {
            "username": "test",
            "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test")
        self.assertEqual(User.objects.get().email, "test@gamil.com")
        self.assertEqual(response.data["token"], User.objects.get().auth_token.key)

    def test_login_wrong_credentials(self):
        client = APIClient()
        url = "/api/register/"
        data = {
            "username": "test",
            "email": "test@gmail.com",
            "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        url = "/api/login/"
        data = {
            "username": "test",
            "password": "test1",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test")

    def test_logout(self):
        client = APIClient()
        url = "/api/register/"
        data = {
            "username": "test",
            "email": "test@gmail.com",
            "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        url = "/api/login/"
        data = {
            "username": "test",
            "password": "test",
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "test")
        self.assertEqual(User.objects.get().email, "test@gmail.com")
        self.assertEqual(response.data["token"], User.objects.get().auth_token.key)
        url = "/logout/"
        response = client.post(url, data, format="json")
       
        self.assertEqual(User.objects.count(), 1)




