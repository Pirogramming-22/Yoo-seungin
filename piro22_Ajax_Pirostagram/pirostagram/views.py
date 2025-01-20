from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Post, Comment
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth import logout
import json
from django.db.models import Q
from django.contrib.auth.models import User
from django.db.models import Count

@login_required
def index(request):
    posts = Post.objects.all().order_by('-created_at')
    post_count = posts.count()
    context = {
        'posts': posts,
        'post_count': post_count,
    }
    return render(request, 'pirostagram/index.html', context)

def post_detail(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    context = {
        'post': post,
    }
    return render(request, 'pirostagram/post_detail.html', context)

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('pirostagram:index')
    else:
        form = UserCreationForm()
    return render(request, 'pirostagram/signup.html', {'form': form})




@login_required
def like_post(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            liked = False
        else:
            post.likes.add(request.user)
            liked = True
        return JsonResponse({
            'success': True,
            'liked': liked,
            'likes_count': post.likes.count()
        })


@login_required
def add_comment(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        data = json.loads(request.body)  
        content = data.get('content')
        comment = Comment.objects.create(
            post=post,
            author=request.user,
            content=content
        )
        return JsonResponse({
            'success': True,
            'comment_id': comment.id,
            'content': comment.content,
            'author': comment.author.username
        })

@login_required
def delete_comment(request, comment_id):
    if request.method == 'POST':
        comment = get_object_or_404(Comment, id=comment_id)
        if request.user == comment.author:
            comment.delete()
            return JsonResponse({'success': True})
    return JsonResponse({'success': False})

def logout_view(request):
    logout(request)
    return redirect('login')

def search_users(request):
    if request.method == 'GET':
        query = request.GET.get('q', '')
        if query:
            users = User.objects.filter(
                Q(username__icontains=query) |
                Q(profile__bio__icontains=query)
            )[:5]  
            
            results = [{
                'id': user.id,
                'username': user.username,
                'profile_pic': user.profile.profile_pic.url if hasattr(user, 'profile') else None,
                'bio': user.profile.bio if hasattr(user, 'profile') else ''
            } for user in users]
            
            return JsonResponse({'results': results})
    return JsonResponse({'results': []})

@login_required
def sort_posts(request):
    sort_type = request.GET.get('sort_type', 'latest')
    
    if sort_type == 'latest':
        posts = Post.objects.all().order_by('-created_at')
    elif sort_type == 'comments':
        posts = Post.objects.annotate(comment_count=Count('comments')).order_by('-comment_count')
    
    posts_data = [{
        'id': post.id,
        'image_url': post.image.url,
        'comment_count': post.comments.count()
    } for post in posts]
    
    return JsonResponse({'posts': posts_data})