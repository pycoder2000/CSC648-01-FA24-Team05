from django.shortcuts import render

def about_us(request):
    members = [
        {'name': 'Parth Desai', 'image': 'Parth.jpg', 'position': 'Team Lead'},
        {'name': 'Parth Desai', 'image': 'Parth1.jpg', 'position': 'Front End Lead'},
        {'name': 'Parth Desai', 'image': 'Parth2.jpg', 'position': 'Back End Developer'},
        {'name': 'Parth Desai', 'image': 'Parth3.jpg', 'position': 'Full Stack Developer'},
        {'name': 'Parth Desai', 'image': 'Parth4.jpg', 'position': 'Data Scientist'},
        {'name': 'Parth Desai', 'image': 'Parth5.jpg', 'position': 'DevOps Engineer'},
        {'name': 'Parth Desai', 'image': 'Parth6.jpg', 'position': 'QA Engineer'}
    ]
    return render(request, 'about_us/index.html', {'members': members})

def home(request):
    return render(request, 'home.html')

def member_detail(request, name):
    return render(request, 'about_us/member_detail.html', {'name': name})
