from django.contrib import admin
from .models import CustomUser,SavedHouses

admin.site.register(SavedHouses)
admin.site.register(CustomUser)