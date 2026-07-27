#!/bin/bash
set -euo pipefail

# Amazon Linux 2023 ships MariaDB by default, not MySQL - add the official
# MySQL 8 repo so this actually matches docker-compose.yml (mysql:8.0).
dnf install -y https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
# The release RPM ships the 2022 signing key, but current MySQL 8 packages are
# signed with the 2023 key, so import it or the server install fails GPG verification.
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023
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

# Accept connections from the backend. MySQL 8 already listens on all interfaces
# by default, but set it explicitly via a drop-in so the intent is clear. The old
# sed targeted /etc/my.cnf.d/mysql-server.cnf, which does not exist on Amazon Linux
# 2023, so it failed the whole script under `set -e`. The security group is what
# actually restricts who can reach port 3306.
cat > /etc/my.cnf.d/zz-bind-address.cnf <<CNF
[mysqld]
bind-address = 0.0.0.0
CNF
systemctl restart mysqld
