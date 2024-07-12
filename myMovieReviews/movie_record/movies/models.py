from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_date = models.DateField()
    director = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)  # 추가된 필드
    rating = models.DecimalField(max_digits=3, decimal_places=1)  # 추가된 필드

    def __str__(self):
        return self.title

class Comment(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.movie.title} - Comment"
