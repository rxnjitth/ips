
from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='landing_page'),
    path('join-community/', views.join_community, name='join_community'),
    path('project-submission/', views.project_submission, name='project_submission'),
]