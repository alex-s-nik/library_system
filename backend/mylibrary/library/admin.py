from django.contrib import admin

from .models import Book, History, Visitor


class BaseAdmin(admin.ModelAdmin):
    fields = ('created_by', 'created_at',)
    readonly_fields = ('created_at',)


class BookAdmin(BaseAdmin):
    fields = ('title', 'description',) + BaseAdmin.fields
    list_display = ('title', 'description', 'in_library')

    
class VisitorAdmin(BaseAdmin):
    fields = ('name', 'info',) + BaseAdmin.fields


class HistoryAdmin(BaseAdmin):
    fields = ('visitor', 'book', 'action_type',) + BaseAdmin.fields


admin.site.register(Book, BookAdmin)
admin.site.register(Visitor, VisitorAdmin)
admin.site.register(History, HistoryAdmin)
