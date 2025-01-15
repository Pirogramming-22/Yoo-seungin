from django.shortcuts import render, redirect, get_object_or_404
from django.core.paginator import Paginator
from django.db.models import Count
from .models import Idea, DevTool
from .forms import IdeaForm, DevToolForm
from django.http import JsonResponse

def idea_list(request):
    sort_option = request.GET.get('sort', 'latest')
    
    if sort_option == 'stars':
        ideas = Idea.objects.annotate(star_count=Count('stars')).order_by('-star_count')
    elif sort_option == 'name':
        ideas = Idea.objects.order_by('title')
    elif sort_option == 'created':
        ideas = Idea.objects.order_by('created_at')
    else:  
        ideas = Idea.objects.order_by('-created_at')
    
    paginator = Paginator(ideas, 4)
    page = request.GET.get('page')
    ideas = paginator.get_page(page)
    
    return render(request, 'ideas/idea_list.html', {
        'ideas': ideas,
        'sort_option': sort_option
    })

def idea_create(request):
    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES)
        if form.is_valid():
            idea = form.save(commit=False)
            idea.author = request.user
            idea.save()
            return redirect('ideas:idea_list')
    else:
        form = IdeaForm()
    return render(request, 'ideas/idea_form.html', {'form': form})

def idea_detail(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    return render(request, 'ideas/idea_detail.html', {'idea': idea})

def idea_delete(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    if request.method == 'POST':
        idea.delete()
        return redirect('ideas:idea_list')
    return redirect('ideas:idea_detail', pk=pk)

def idea_update(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES, instance=idea)
        if form.is_valid():
            idea = form.save()
            return redirect('ideas:idea_detail', pk=idea.pk)
    else:
        form = IdeaForm(instance=idea)
    return render(request, 'ideas/idea_form.html', {'form': form})

def devtool_list(request):
    devtools = DevTool.objects.all().order_by('name')
    return render(request, 'ideas/devtool_list.html', {'devtools': devtools})

def devtool_create(request):
    if request.method == 'POST':
        form = DevToolForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('ideas:devtool_list')
    else:
        form = DevToolForm()
    return render(request, 'ideas/devtool_form.html', {'form': form})

def devtool_detail(request, pk):
    devtool = get_object_or_404(DevTool, pk=pk)
    return render(request, 'ideas/devtool_detail.html', {'devtool': devtool})

def toggle_star(request, pk):
    if request.method == "POST":
        idea = get_object_or_404(Idea, id=pk)
        if request.user in idea.stars.all():
            idea.stars.remove(request.user)
            is_starred = False
        else:
            idea.stars.add(request.user)
            is_starred = True
        return JsonResponse({'is_starred': is_starred})
    return JsonResponse({'error': "error"})

def interest_up(request, pk):
    if request.method == "POST":
        idea = get_object_or_404(Idea, id=pk)
        idea.interest += 1
        idea.save()
        return JsonResponse({'interest': idea.interest})
    return JsonResponse({'error': "error"})

def interest_down(request, pk):
    if request.method == "POST":
        idea = get_object_or_404(Idea, id=pk)
        idea.interest = max(0, idea.interest - 1)
        idea.save()
        return JsonResponse({'interest': idea.interest})
    return JsonResponse({'error': "error"})