initdb -D /var/lib/postgresql/data && \
echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf && \
echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf && \
pg_ctl start -D /var/lib/postgresql/data && \
psql && \
#ALTER USER postgres WITH PASSWORD 'test';
psql -c "CREATE DATABASE transcendence" && \
psql -c "ALTER USER postgres WITH PASSWORD 'test'" && \
pg_ctl stop -D /var/lib/postgresql/data
