
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Root URL → Home Page
    path('about/', views.about, name='about'),  # Future About Page
    path('projects/', views.projects, name='projects'),  # Projects Page
    path('contact/', views.contact, name='contact'),  # Contact Page
]
