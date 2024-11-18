Installation
============

The **SecondChance** platform backend and frontend are containerized and use Python, Django, and Next.js. Follow the instructions below to set up the project on your local machine.

Installing SecondChance
-----------------------

1. Clone the repository:

   .. code-block:: bash

      git clone git@github.com:CSC-648-SFSU/CSC648-01-FA24-Team05.git

2. Navigate to the project root folder:

   .. code-block:: bash

      cd application

3. Set up Docker (if not installed):

   - Install `Docker`_

   .. _Docker: https://docs.docker.com/engine/install/


4. Build and run the Docker containers:

   .. code-block:: bash

      docker-compose up --build

   This will set up the backend and database.

5. Verify backend setup:

   .. code-block:: bash

      docker exec -it backend-web-1 python manage.py check

6. Navigate to the frontend folder:

   .. code-block:: bash

      cd secondchance

7. Install dependencies:

   .. code-block:: bash

      npm install

8. Build and run the frontend:

   .. code-block:: bash

      npm run build
      npm start

Custom Installation
-------------------

You can configure the backend environment using the `.env.dev` file and specify additional settings for the frontend in the `.env` file.

Backend Setup
~~~~~~~~~~~~~

Create a `.env.dev` file in the `backend` folder with the following content:

.. code-block:: bash

   DEBUG=1
   SECRET_KEY=secondchance_secret_key
   SQL_ENGINE=django.db.backends.postgresql
   SQL_DATABASE=secondchance
   SQL_USER=postgresuser
   SQL_PASSWORD=
   SQL_HOST=db
   SQL_PORT=5432
   DATABASE=postgres

Frontend Setup
~~~~~~~~~~~~~~

Create a `.env` file in the `secondchance` folder with the following content:

.. code-block:: bash

   NEXT_PUBLIC_API_HOST=http://localhost:8000
   NEXT_PUBLIC_WS_HOST=ws://localhost:8000

Combining Options
~~~~~~~~~~~~~~~~~

You can combine custom backend and frontend configurations to suit your environment.

Example: Use a custom database and WebSocket host for local testing:

.. code-block:: bash

   SQL_HOST=localhost
   NEXT_PUBLIC_WS_HOST=ws://localhost:8080

Troubleshooting
---------------

- Ensure Docker is installed and running.
- Update `npm` and `pip`:

  .. code-block:: bash

     npm install -g npm@latest
     pip install --upgrade pip

- Use virtual environments for Python dependencies:

  .. code-block:: bash

     python -m venv venv
     source venv/bin/activate  # For Unix
     .\venv\Scripts\activate  # For Windows

- Check logs for errors in the backend and frontend:

  .. code-block:: bash

     docker logs backend-web-1
     docker logs frontend-web-1

Next Steps
----------

Once installed, proceed to the **Usage** section to start interacting with the platform. Check out the **Contributing** guide if you want to enhance SecondChance further.