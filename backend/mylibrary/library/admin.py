from django.contrib import admin

from .models import Action, Book, Visitor


class BaseAdmin(admin.ModelAdmin):
    fields = (
        "created_by",
        "created_at",
    )
    readonly_fields = ("created_at",)


class BookAdmin(BaseAdmin):
    fields = (
        "title",
        "description",
    ) + BaseAdmin.fields
    list_display = ("title", "description", "in_library")


class VisitorAdmin(BaseAdmin):
    fields = (
        "name",
        "info",
    ) + BaseAdmin.fields


class ActionAdmin(admin.ModelAdmin):
    pass


admin.site.register(Book, BookAdmin)
admin.site.register(Visitor, VisitorAdmin)
admin.site.register(Action, ActionAdmin)
