from django.urls import path
from . import views

urlpatterns = [
    path('', views.ReviewListView.as_view(), name='review_list'),
    path('review/<int:pk>/', views.ReviewDetailView.as_view(), name='review_detail'),
    path('review/create/', views.ReviewCreateView.as_view(), name='review_create'),
    path('review/<int:pk>/update/', views.ReviewUpdateView.as_view(), name='review_update'),
    path('review/<int:pk>/delete/', views.ReviewDeleteView.as_view(), name='review_delete'),
]