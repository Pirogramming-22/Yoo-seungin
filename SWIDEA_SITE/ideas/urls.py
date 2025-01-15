from django.urls import path
from . import views

app_name = 'ideas'

urlpatterns = [
    path('', views.idea_list, name='idea_list'),
    path('idea/create/', views.idea_create, name='idea_create'),
    path('idea/<int:pk>/', views.idea_detail, name='idea_detail'),
    path('devtool/create/', views.devtool_create, name='devtool_create'),
    path('devtool/list/', views.devtool_list, name='devtool_list'),
    path('<int:pk>/star/', views.toggle_star, name='star_toggle'),
    path('<int:pk>/interestup/', views.interest_up, name='interest_up'),
    path('<int:pk>/interestdown/', views.interest_down, name='interest_down'),
    path('idea/<int:pk>/delete/', views.idea_delete, name='idea_delete'),
    path('idea/<int:pk>/update/', views.idea_update, name='idea_update'),
    path('devtool/<int:pk>/', views.devtool_detail, name='devtool_detail'),
    path('devtool/<int:pk>/update/', views.devtool_update, name='devtool_update'),
    path('devtool/<int:pk>/delete/', views.devtool_delete, name='devtool_delete'),
]