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

### Запуск проекта production

Пример заполнения ENV-файла находится в файле example.env

```bash
#!/bin/bash
sudo make production
```
