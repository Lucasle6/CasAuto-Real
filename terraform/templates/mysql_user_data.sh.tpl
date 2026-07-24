#!/bin/bash
set -euo pipefail

# Amazon Linux 2023 ships MariaDB by default, not MySQL - add the official
# MySQL 8 repo so this actually matches docker-compose.yml (mysql:8.0).
dnf install -y https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
dnf install -y mysql-community-server
systemctl enable --now mysqld

# Wait for mysqld to write its startup log and generate the temporary
# root password before we try to use it.
for i in $(seq 1 30); do
  if grep -q 'temporary password' /var/log/mysqld.log 2>/dev/null; then
    break
  fi
  sleep 2
done
TEMP_PASS=$(grep 'temporary password' /var/log/mysqld.log | awk '{print $NF}')

mysql --connect-expired-password -u root -p"$TEMP_PASS" <<SQL
ALTER USER 'root'@'localhost' IDENTIFIED BY '${db_root_password}';
CREATE DATABASE IF NOT EXISTS ${db_name};
CREATE USER IF NOT EXISTS '${db_user}'@'%' IDENTIFIED BY '${db_password}';
GRANT ALL PRIVILEGES ON ${db_name}.* TO '${db_user}'@'%';
FLUSH PRIVILEGES;
SQL

# Accept connections from the backend (the security group already
# restricts who can reach this port at all).
sed -i 's/^bind-address.*/bind-address = 0.0.0.0/' /etc/my.cnf.d/mysql-server.cnf
systemctl restart mysqld
