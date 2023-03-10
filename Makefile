MY_VAR_CONT := $(shell docker ps -aq)
MY_VAR_IMGS := $(shell docker images -q)
MY_VAR_VLMS := $(shell docker volume ls -q)

all :
	docker compose -f ./docker-compose.yml up --build -d

clean : 
	docker stop $(MY_VAR_CONT)
	docker rm $(MY_VAR_CONT)
	docker rmi $(MY_VAR_IMGS)

fclean : clean

re : clean all

.PHONY: fclean re all clean