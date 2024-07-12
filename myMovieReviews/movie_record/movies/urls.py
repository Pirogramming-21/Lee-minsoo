from django.urls import path
from .views import movie_list, movie_create, movie_detail, movie_update, movie_delete, add_comment

urlpatterns = [
    path('', movie_list, name='movie_list'),
    path('create/', movie_create, name='movie_create'),
    path('<int:pk>/', movie_detail, name='movie_detail'),
    path('<int:pk>/edit/', movie_update, name='movie_update'),
    path('<int:pk>/delete/', movie_delete, name='movie_delete'),
    path('<int:pk>/comment/', add_comment, name='add_comment'),
]
