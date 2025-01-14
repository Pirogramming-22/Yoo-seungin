from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from .models import Idea
from .forms import IdeaForm

def idea_list(request):
    
    paginator = Paginator(ideas, 4)
    page = request.GET.get('page')
    ideas = paginator.get_page(page)
    
    return render(request, 'ideas/idea_list.html', {
        'ideas': ideas,
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
  
def devtool_create(request):
    return render(request, 'ideas/devtool_form.html', {'form': form})

def devtool_list(request):
    return render(request, 'ideas/devtool_list.html', {'devtools': devtools})
  
def idea_detail(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    return render(request, 'ideas/idea_detail.html', {'idea': idea})