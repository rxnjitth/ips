# views.py
from django.shortcuts import render

def landing_page(request):
    """
    View function for the landing page
    """
    return render(request, 'index.html')

def join_community(request):
    """
    View function for the join community page
    """
    # Add your logic for joining the community here
    return render(request, 'join_community.html')

def project_submission(request):
    """
    View function for project submission
    """
    if request.method == 'POST':
        # Process form data here
        # You can create a form model to handle this
        pass
    return render(request, 'project_submission.html')

