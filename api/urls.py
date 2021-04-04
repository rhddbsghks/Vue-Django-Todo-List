from django.urls import path

from . import views
app_name = 'api'
urlpatterns = [
  path('todo/list/', views.ApiTodoLV.as_view(), name='index'),
  path('todo/<int:pk>/delete/', views.ApiToDelV.as_view(), name='delete'),
  path('todo/create/', views.ApiTodoCV.as_view(), name='create'),
]
