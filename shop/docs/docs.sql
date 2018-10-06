create database riceshop DEFAULT CHARACTER SET euckr COLLATE euckr_korean_ci;
grant all privileges on riceshop.* to shopadmin@localhost identified by 'shop123' with grant option;

create table riceshop.item (
    id int not null auto_increment primary key,
    title varchar(100),
    markdown text,
    options varchar(500),
    prices varchar(500),
    category varchar(100) not null default 'etc',
    publishedDate varchar(200)
) DEFAULT CHARSET=euckr;

-- ALTER TABLE riceshop.item ADD category varchar(100) not null default 'etc';


create table riceshop.member (
    id int not null auto_increment unique,
    userID varchar(50) not null primary key,
    userName varchar(50) not null,
    userEmail varchar(100) not null,
    userPassword varchar(50) not null,
    userAddress varchar(300) not null,
    userPostCode varchar(200) not null,
    userDetailAddress varchar(500) not null,
    userPhone varchar(100) not null,
    createdAt varchar(200)
) DEFAULT CHARSET=euckr;

-- ALTER TABLE riceshop.member MODIFY userPostCode varchar(200) not null;

create table riceshop.checkout (
    id int not null auto_increment primary key,
    imp_uid varchar(200) not null,
    merchant_uid varchar(200) not null,
    paid_amount varchar(20) not null,
    apply_num varchar(100) not null,
    buyer_email varchar(100) not null,
    buyer_name varchar(100) not null,
    buyer_tel varchar(100) not null,
    buyer_addr varchar(200) not null,
    buyer_postcode varchar(20) not null,
    checked boolean not null default false,
    ordered_list varchar(1000) not null,
    ordered_number varchar(100) not null,
    createdAt varchar(200) not null,
    buyer_id varchar(200) not null,
    songjang varchar(30),
    cancelled boolean not null default false,
    pay_backed boolean not null default false,
    item_number varchar(300) not null,
    iscomplete boolean not null default false
) DEFAULT CHARSET=euckr;

 send_before_rejected boolean not null default false,
    send_after_rejected boolean not null default false,
    arrived boolean not null default false,
    arrived_time varchar(200)

create table riceshop.qnabbs (
    id int not null auto_increment primary key,
    title varchar(300) not null,
    username varchar(100) not null,
    content text not null,
    grpno int,
    grpord int not null default 0,
    depth int not null default 1,
    createdAt varchar(200),
    isanswer boolean not null default false,
    isedited boolean not null default false,
    isanswered boolean not null default false,
    isprivate boolean not null
) DEFAULT CHARSET=euckr;

create table riceshop.afterpost (
    id int not null auto_increment primary key,
    title varchar(300) not null,
    content text not null,
    username varchar(100) not null,
    itemid int not null,
    createdAt varchar(200)
) DEFAULT CHARSET=euckr;

create table riceshop.category (
    id int not null auto_increment primary key,
    title varchar(100) not null,
    keyname varchar(100) unique not null
) DEFAULT CHARSET=euckr;


insert into riceshop.category (title, keyname) values ('쌀', 'rice');
insert into riceshop.category (title, keyname) values ('약재', 'herb');
insert into riceshop.category (title, keyname) values ('과일', 'fruits');
insert into riceshop.category (title, keyname) values ('기타', 'etc');

-------------------------------------------

-- 원글 삽입
insert into qnabbs (title, username, content, createdAt)
    VALUES("title", "dongho", "content", "2018-02-03");

select max(id) from qnabbs;

-- maxid 를 lastid에 
select id from qnabbs where id = lastid;

update qnabbs set grpno = id where id = id;

-- 댓글 삽입
select grpord, depth from qnabbs where id = 원글id;
insert into qnabbs (title, username, content, createdAt, grpno, grpord, depth)
        VALUES ("title", "관리자", "content", "2018-02-03", grpno, grpord + 1, depth+ 1)


insert into checkout (imp_uid, merchant_uid, paid_amount, apply_num, buyer_email, buyer_name, buyer_tel, buyer_addr, buyer_postcode, createdAt, buyer_id, ordered_list, ordered_number)
    values ("1", "1", "20000", "1", "dongho@navrer.com", "최동호", "010-1234-1234", "서울시 강서구 우현로 67, 111동 1201호", "123", "2018-04-25 22:49:38", "dongho2903", "테스트 상품-테스트1,", "1,");

insert into checkout (imp_uid, merchant_uid, paid_amount, apply_num, buyer_email, buyer_name, buyer_tel, buyer_addr, buyer_postcode, createdAt)
    values ("2", "2", "20000", "2", "dkqlsktm44@naver.com", "김말숙", "010-3309-2234", "서울시 강남구 신길로 7, 101동 101호", "9008", "2018-04-26 22:49:38");