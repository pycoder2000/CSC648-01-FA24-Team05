from django.shortcuts import render, redirect
from .data.members_data import members


def about_us(request):
    return render(request, "about_us/index.html", {"members": members})


def home(request):
    return render(request, "home.html")


def member_detail(request, name):
    member = next((m for m in members if m["name"] == name), None)
    if member:
        return render(request, "about_us/member_detail.html", {"member": member})
    else:
        return redirect("about_us")
