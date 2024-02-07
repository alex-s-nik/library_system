production:
	docker compose -f docker-compose_prod.yml up -d

# command for first run
# starts backend and db containers
# applies migrates
# creates super user
front_dev_first_run: front_dev_run front_dev_after_pull 
	sudo docker compose -f docker-compose_front_dev.yml run --rm backend python manage.py createsuperuser --noinput

# command for run after pulling backend changes from repo
# applies migrates only
front_dev_after_pull:
	sudo docker compose -f docker-compose_front_dev.yml run --rm backend python manage.py migrate

# command for run containers with backend
front_dev_run:
	docker compose -f docker-compose_front_dev.yml up -d
