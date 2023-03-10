FROM alpine:3.16

#COPY srcs /srcs

#WORKDIR /srcs

RUN apk update && \
	apk upgrade && \
	apk add nodejs npm && \
	npm install --global yarn && \
	npm install -g @nestjs/cli && \
	nest new transcendence_back --package-manager yarn

COPY srcs /transcendence_back

WORKDIR /transcendence_back

	#yarn global add @nestjs/cli
RUN	yarn add prisma --dev && \
	yarn prisma init \
	yarn add socket.io \
	yarn add @nestjs/websockets

RUN	rm src/app.controller.spec.ts src/app.controller.ts src/app.service.ts

COPY	conf /transcendence_back/prisma

RUN	sed -i 's/DATABASE_URL="postgresql:\/\/johndoe:randompassword@localhost:5432\/mydb?schema=public"/DATABASE_URL="postgresql:\/\/postgres:test@postgresql:5432\/transcendence?schema=public"/g' .env

EXPOSE 3333

CMD ["yarn", "start:dev"]

# FAIRE SCRIPT AVEC LES 2 DERNIERS RUN
