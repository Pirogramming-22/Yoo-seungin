from django.urls import path
from . import views

app_name = 'pirostagram'

urlpatterns = [
    path('', views.index, name='index'),
    path('post/<int:post_id>/', views.post_detail, name='post_detail'),
    path('post/<int:post_id>/like/', views.like_post, name='like_post'),
    path('post/<int:post_id>/comment/', views.add_comment, name='add_comment'),
    path('comment/<int:comment_id>/delete/', views.delete_comment, name='delete_comment'),
    path('search/users/', views.search_users, name='search_users'),
    path('sort-posts/', views.sort_posts, name='sort_posts'),
    path('search/posts/', views.search_posts, name='search_posts'),
]