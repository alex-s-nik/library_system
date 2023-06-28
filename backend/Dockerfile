FROM python:3.11-alpine
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY ./mylibrary .
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "mylibrary.wsgi"]