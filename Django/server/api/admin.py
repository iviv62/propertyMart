from django.contrib import admin
from .models import House,Image
from mapbox_location_field.admin import MapAdmin



class InLineImage(admin.StackedInline):
    model=Image



class HouseAdmin(MapAdmin):
    inlines=[InLineImage]
    list_display=("title",'created_on',)
    list_filter=("created_on",)
    search_fields = ['title','created_on']

admin.site.register(House,HouseAdmin)