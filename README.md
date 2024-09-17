# CSC648-S01-FA24-Team05

**Application URL: <https://example.com>**

## Team

|   Student Name   |     Student Email     | GitHub Username |  Student's Role  |
| :--------------: | :-------------------: | :-------------: | :--------------: |
|   Parth Desai    |   pdesai@sfsu.edu     |   pycoder2000 / Parth Desai   |   Team Lead / PM |
|   Pedro Grande   | pgrande@mail.sfsu.edu |   PFGrande      |   Front-end Developer |
|  Charvi Sharma   |   csharma@sfsu.edu    | charvisharma6732 |   Scrum Master   |
| Josue Hernandez  | jhernandez53@mail.sfsu.edu |            |   Git Master     |
|  Andre Velarde   |  nvelarde@sfsu.edu    |                 |   Back-end Lead  |
|  Preet Vithani   |  pvithani@sfsu.edu    |                 |   Front-end Lead |
|  Hsin-Ying Tsai  |   htsai1@sfsu.edu     |   Golden1018    |   Back-end Developer |

## Setup ##

1. Clone the project repository
```bash
git@github.com:CSC-648-SFSU/CSC648-01-FA24-Team05.git
```

2. Move to the project root folder.
```bash
cd application/backend
```

3. Create and activate a virtual environment.
> (for mac)
```bash
virtualenv venv
source venv/bin/activate
```

To deactivate the environment
```bash
deactivate
```

4. Install requirements

```bash
pip install -r requirements.txt
```

5. Initialize database
```bash
python manage.py migrate
```

7. Run development server
```bash
python manage.py runserver
```

## Resources

- [How to setup Github SSH](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitHub-SSH-Key-Setup-Config-Ubuntu-Linux)
- [How to setup a Django Project](https://medium.com/@hacodder/setting-up-a-django-project-a-step-by-step-guide-a60dad87e82a)(:warning: Only uptil Step 2)
