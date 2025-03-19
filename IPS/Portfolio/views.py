from django.shortcuts import render

def home(request):
    return render(request, 'header.html')

def about(request):
    return render(request, 'about.html')

def projects(request):
    return render(request, 'projects.html')

def contact(request):
    return render(request, 'contact.html')
