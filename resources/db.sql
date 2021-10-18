CREATE USER 'paymentapp' @'%' IDENTIFIED BY '^R&KLbxIfiKlgukDUJc<;JF^&ofl';

GRANT
SELECT
,
INSERT
,
UPDATE
    ON payments.* TO 'paymentapp' @'%';

ALTER USER 'paymentapp' @'%' IDENTIFIED WITH mysql_native_password BY '^R&KLbxIfiKlgukDUJc<;JF^&ofl';

flush privileges;

create database payments;

use payments;

create table transactions (
    id INT AUTO_INCREMENT,
    vendor varchar(255),
    amount FLOAT,
    date_created datetime DEFAULT CURRENT_TIMESTAMP,
    paid BIT,
    date_paid datetime,
    primary key(id)
);

create table accounts (
    id int auto_increment,
    username varchar(255),
    password varchar(255),
    primary key(id)
)