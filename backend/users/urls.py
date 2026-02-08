from django.urls import path
from . import views

urlpatterns = [
    path("", views.users_list, name="users-list"),
    path("<int:pk>/", views.user_detail, name="user-detail"),
]
