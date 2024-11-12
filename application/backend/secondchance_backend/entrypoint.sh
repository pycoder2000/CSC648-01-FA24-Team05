#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Check if database is running..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.1
    done

    echo "The database is up and running :-D"
fi

./manage.py makemigrations || exit 1
./manage.py migrate || exit 1
./manage.py collectstatic --noinput || exit 1

exec "$@"
