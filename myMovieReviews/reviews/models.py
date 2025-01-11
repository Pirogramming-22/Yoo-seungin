from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator # 최소,최대값 제한 import

class Review(models.Model):
    GENRE_CHOICES = [
        ('Action', '액션'),
        ('Comedy', '코미디'),
        ('Drama', '드라마'),
        ('SF', 'SF'),
        ('Horror', '호러'),
        ('Romance', '로맨스'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='제목')    # 각각의 원하는 한글 이름을 사용하기 위해 verbose_name 설정
    release_year = models.IntegerField(
        validators=[MinValueValidator(1900)],
        verbose_name='개봉년도'
    )
    director = models.CharField(max_length=100, verbose_name='감독')
    actors = models.CharField(max_length=200, verbose_name='주연')
    genre = models.CharField(
        max_length=20,
        choices=GENRE_CHOICES,
        verbose_name='장르'
    )
    rating = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        verbose_name='별점'
    )
    running_time = models.IntegerField(
        validators=[MinValueValidator(1)],
        verbose_name='러닝타임(분)'
    )
    image = models.ImageField(  # 이미지 필드 추가
        upload_to='review_images/',
        null=True,
        blank=True,
        verbose_name='이미지'
    )
    review_text = models.TextField(verbose_name='리뷰')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def get_running_time_display(self): # 분 단위로 저장한 러닝타임을 시간, 분 형식으로 변환시켜주는 함수 
        hours = self.running_time // 60
        minutes = self.running_time % 60
        return f"{hours}시간 {minutes}분"

    class Meta:  # 최신순으로 정렬 (내림차순 정렬)
        ordering = ['-created_at']