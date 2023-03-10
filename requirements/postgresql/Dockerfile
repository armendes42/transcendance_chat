FROM alpine:3.16

RUN apk update && \
	apk add postgresql && \
	mkdir /run/postgresql && \
	chown postgres:postgres /run/postgresql/ && \
	mkdir /var/lib/postgresql/data && \
	chown postgres /var/lib/postgresql/data && \
	chgrp postgres /var/lib/postgresql/data && \
	chmod 0700 /var/lib/postgresql/data && \
	apk add vim
	#echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf && \
	#echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf

COPY tools/setup.sh /tmp

RUN	chmod +x /tmp/setup.sh

USER postgres

RUN	/tmp/setup.sh

#RUN	initdb -D /var/lib/postgresql/data && \
#	echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf && \
#	echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf 

COPY conf/pg_hba.conf /var/lib/postgresql/data/pg_hba.conf

EXPOSE 5432

#CMD ["yes"]
#CMD ["pg_ctl", "start", "-D", "/var/lib/postgresql/data"]
CMD ["postgres", "-D", "/var/lib/postgresql/data"]	
	#chmod 700 /var/lib/postgresql/data

# drwx------    2 postgres postgres      4096 Mar  8 00:33 data 
