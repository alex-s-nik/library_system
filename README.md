# library_system
Небольшая библиотечная система

## Общая информация
В библиотеке хранятся книги(издания, брошюры, журналы, рукописи и т.д.).

У книг есть Название и Описание.

В библиотеку приходят читатели/посетители. У них есть Имя и Информация о посетителе.

Им выдаются книги или они сдают книги.

## Система пользователей

- Обычный пользователь/работник на выдаче приеме книг - может CRUD посетителей, может CRUD записи о выдаче/приеме книг

- Библиотекарь - может то же, что и Обычный пользователь, плюс CRUD книги

- Главный пользователь/администратор - может то же, что и Библиотекарь, плюс имеет доступ к админке, где также может управлять пользователями.

### Запуск сервера
Python >= 3.8 (```python --version```)

Для Windows-систем

```
>>> cd backend
>>> python -m venv venv
>>> cd venv/scripts/
>>> activate.bat
>>> (venv) cd ../..
>>> (venv) pip install -r requirements.txt
>>> (venv) cd mylibrary
>>> (venv) python manage.py migrate
>>> (venv) python manage.py createsuperuser
>>> (venv) python manage.py runserver
```
По умолчанию сервер будет доступен по адресу
```127.0.0.1:8000```

### Запуск сервера через docker
```
>>> cd backend
>>> docker build -t back .
>>> docker run -d -p 8000:8000 -v "/$(pwd)/mylibrary/db.sqlite3":/app/mylibrary/db.sqlite3 back
```

### Запуск клиента
1) установить NodeJs
2) установить angular cli командой npm install -g @angular/cli
3) перейти в каталог frontend
4) установить необходимые модули командой npm install
5) запустить Angular Live Development Server командой ng serve
6) Клиент будет доступен по адресу `localhost:4200`

### Запуск клиента через docker
```
>>> cd frontend
>>> docker build -t front .
>>> docker run -d -p 4200:4200 front
```