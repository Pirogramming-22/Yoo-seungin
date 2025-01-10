from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.urls import reverse_lazy
from django.db.models import Q
from .models import Review
from .forms import ReviewForm

# 클래스 기반의 뷰를 사용하여 구현 
class ReviewListView(View): # 리뷰 목록 보기
    def get(self, request): # get 요청 처리 
        sort = request.GET.get('sort', '-created_at')
        reviews = Review.objects.all() # 모든 리뷰 데이터 가져오기 
        # order_by 사용하여 제목, 별점, 상영 시간 정렬하기  
        if sort == 'title': # 제목 오름차순
            reviews = reviews.order_by('title')
        elif sort == 'rating': # 별점 내림차순 (가장 별점이 좋은게 제일 앞으로 오게하기 위해서)
            reviews = reviews.order_by('-rating')
        elif sort == 'running_time': # 상영 시간 오름차순 
            reviews = reviews.order_by('running_time')
            
        return render(request, 'reviews/review_list.html', {
            'reviews': reviews
        })

class ReviewDetailView(View): # 리뷰 상세 보기 
    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        return render(request, 'reviews/review_detail.html', {
            'review': review
        })

class ReviewCreateView(View): # 리뷰 작성 
    def get(self, request):
        form = ReviewForm()
        return render(request, 'reviews/review_form.html', {
            'form': form
        })

    def post(self, request): # post 요청 처리 
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save()
            return redirect('review_list')
        return render(request, 'reviews/review_form.html', {
            'form': form
        })

class ReviewUpdateView(View): # 리뷰 수정 
    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        form = ReviewForm(instance=review)
        return render(request, 'reviews/review_form.html', {
            'form': form,
            'review': review
        })

    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        form = ReviewForm(request.POST, request.FILES, instance=review)
        if form.is_valid():
            review = form.save()
            return redirect('review_detail', pk=review.pk)
        return render(request, 'reviews/review_form.html', {
            'form': form,
            'review': review
        })

class ReviewDeleteView(View): # 리뷰 삭제 
    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        return render(request, 'reviews/review_delete.html', {
            'review': review
        })
    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        review.delete()
        return redirect('review_list')

def review_list(request): # 리뷰 리스트 페이지 
    sort = request.GET.get('sort', '-created_at')
    reviews = Review.objects.all()
    
    if sort == 'title':  # 제목순
        reviews = reviews.order_by('title')
    elif sort == 'rating': # 별점순
        reviews = reviews.order_by('-rating')
    elif sort == 'running_time': # 상영시간순
        reviews = reviews.order_by('running_time')
        
    context = {
        'reviews': reviews
    }
    return render(request, 'reviews/review_list.html', context)

def review_create(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES)  
        if form.is_valid():
            form.save()
            return redirect('review_list')
    else:
        form = ReviewForm()
    return render(request, 'reviews/review_form.html', {'form': form})