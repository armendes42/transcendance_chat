all:
	docker-compose -f docker-compose.yml up -d --build

down:
	docker-compose -f docker-compose.yml down

re: clean
	docker-compose -f docker-compose.yml up -d --build

clean:
	docker stop $$(docker ps -qa);\
	docker rm $$(docker ps -qa);\
	docker rmi -f $$(docker images -qa);

.PHONY:	all down re clean