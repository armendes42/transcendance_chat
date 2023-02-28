
COMPOSE_FILE=srcs/docker-compose.yml

all: run

run: 
	@docker-compose -f $(COMPOSE_FILE) up --build

up:
	@docker-compose -f $(COMPOSE_FILE) up -d --build

debug:
	@docker-compose -f $(COMPOSE_FILE) --verbose up

list:	
	 docker ps -a

list_volumes:
	docker volume ls

clean: 	
	@docker-compose -f $(COMPOSE_FILE) down
	@-docker stop `docker ps -qa`
	@-docker rm `docker ps -qa`
	@-docker rmi -f `docker images -qa`

.PHONY: run up debug list list_volumes clean