FROM python:3.9-alpine
EXPOSE 8000
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "mylibrary/manage.py", "runserver", "0.0.0.0:8000"]