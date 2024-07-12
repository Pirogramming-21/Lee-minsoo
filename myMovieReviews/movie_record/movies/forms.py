from django import forms
from .models import Movie, Comment

class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = ['title', 'description', 'release_date', 'director', 'genre', 'rating']  # 추가된 필드 포함

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
