from django import forms
from .models import Review

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review # 리뷰 모델과 연결
        fields = ['title', 'release_year', 'director', 'actors', 
                 'genre', 'rating', 'running_time', 'review_text', 'image'] # 폼에서 사용할 모델의 필드 정의 
        widgets = {
            'release_year': forms.NumberInput(attrs={'min': 1900}), # 1900년 이후로만 입력
            'rating': forms.NumberInput(attrs={'min': 0, 'max': 5, 'step': 0.5}),  # 별점은 0~5 사이의 값을 0.5 단위로 입력 
            'running_time': forms.NumberInput(attrs={'min': 1}), # 러닝타임 최소 1분 이상 입력 
            'review_text': forms.Textarea(attrs={'rows': 5}),
        }