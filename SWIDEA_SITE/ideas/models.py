from django.db import models
from django.contrib.auth.models import User

class DevTool(models.Model):
    name = models.CharField("이름", max_length=100)
    kind = models.CharField("개발 툴 종류", max_length=100)
    content = models.TextField("내용")
    created_at = models.DateTimeField("생성일지", auto_now_add=True)

    def __str__(self):
        return self.name

class Idea(models.Model):
    title = models.CharField("제목", max_length=200)
    image = models.ImageField("이미지", upload_to='ideas/')
    content = models.TextField("내용")
    interest = models.IntegerField("관심도", default=0)
    devtool = models.ForeignKey(DevTool, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField("생성일지", auto_now_add=True)
    stars = models.ManyToManyField(User, through='IdeaStar', related_name='starred_ideas')
    
    def __str__(self):
        return self.title
    
class IdeaStar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    created_at = models.DateTimeField("생성일지", auto_now_add=True)