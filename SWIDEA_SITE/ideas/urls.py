from django.urls import path
from . import views

app_name = 'ideas'

urlpatterns = [
    path('', views.idea_list, name='idea_list'),
    path('idea/create/', views.idea_create, name='idea_create'),
    path('idea/<int:pk>/', views.idea_detail, name='idea_detail'),
    path('devtool/create/', views.devtool_create, name='devtool_create'),
    path('devtool/list/', views.devtool_list, name='devtool_list'),
]