-- drop table user_images;
-- drop table user_occupation;
-- drop table user_skills;
-- drop table user_websites;
-- drop table user_credentials;
-- drop table user_employer_credentials;
-- drop table user_likes_ratings;
-- drop table comments;
-- drop table user_received_likes;
-- drop table user_received_ratings;

-- truncate table ;

create table user_credentials (
	user_id varchar(8) not null,
	user_name varchar(64) not null,
    user_password varchar(64) not null,
    user_email varchar(128) not null,
    verified boolean default false,
    
    primary key (user_email)
);

alter table user_credentials add column employer boolean default false after verified;

create table user_images (
	s_no int not null auto_increment,
	user_email varchar(128) not null,
	image_name varchar(64),
	image_description varchar(128),
		
	primary key (s_no),

	constraint fk_images_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_occupation (
	user_email varchar(128) not null,
	current_occupation varchar(64),
	current_company varchar(64),
    previous_company varchar(64),
    education_certification varchar(64) not null,
    user_bio varchar(256) not null,

		
	primary key (user_email),

	constraint fk_occupation_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_skills (
	s_no int not null auto_increment,
	user_email varchar(128) not null,
	skill_name varchar(64),
	skill_rating int default 1 not null,
    
	primary key (s_no),

	constraint fk_skills_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_websites (
	s_no int not null auto_increment,
	user_email varchar(128) not null,
	website_name varchar(64),
	website_url varchar(64),
    
	primary key (s_no),

	constraint fk_websites_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_comments (
	s_no int not null auto_increment,
	user_email varchar(128) not null,
	comment_id varchar(8) not null,
	comment_name varchar(32) not null,
    comment_text varchar(256) not null,
    
	primary key (s_no),

	constraint fk_comments_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_likes_ratings (
	user_email varchar(128) not null,
	user_likes int not null,
	user_ratings decimal(2,1) not null,
    
	primary key (user_email),

	constraint fk_likes_ratings_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_received_likes (
	s_no int not null auto_increment,
	user_email varchar(128) not null,
	liked_user varchar(128) not null,
    
	primary key (s_no),

	constraint fk_received_likes_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_received_ratings (
	s_no int not null auto_increment,
	user_email varchar(128) not null,
	rated_user varchar(128) not null,
    ratings decimal(2,1) not null,
    
	primary key (s_no),

	constraint fk_received_ratings_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

create table user_notifications (
	s_no int not null auto_increment,
	user_email varchar(128) not null,
	notification_email varchar(128) not null,
	notification_name varchar(128) not null,
	notification_content varchar(128) not null,
	notification_status varchar(128) not null,
    date_time timestamp default current_timestamp,
    
	primary key (s_no),

	constraint fk_notifications_user_email
		foreign key(user_email)
		references user_credentials(user_email)
		on delete cascade
);

select comment_id, comment_name, comment_text from user_comments;

select * from user_credentials;
select * from user_images;
select * from user_occupation;
select * from user_skills;
select * from user_websites;
select * from user_likes_ratings;
select * from user_received_likes;
select * from user_received_ratings;
select * from user_comments;
select * from user_notifications;

DELETE FROM user_credentials where user_email = 'employer1@talentbook.com';
DELETE FROM user_received_likes where user_email = 'aaronkwok@devbook.com' and liked_user = 'hughjackman@devbook.com';
DELETE FROM user_received_ratings where user_email = 'ianfong@devbook.com' and rated_user = 'ianfong@devbook.com';
DELETE FROM user_comments where user_email = 'aaronkwok@devbook.com';
update user_credentials set verified = false where user_email = 'williamshakespeare@devbook.com';
update user_credentials set user_email = 'nikolatesla@outlook.com' where user_id = '40cf941f';
update user_likes_ratings set user_ratings = 0 where user_email = 'aaronkwok@devbook.com';
update user_images set image_description = 'This was not my finest moment.' where user_email like 'loki%' and image_name = 'image01.jpg';
update user_comments set comment_id = '7893c98a' where s_no = '2';
update user_notifications set notification_status = 'NEW' where USER_EMAIL = 'hughjackman@devbook.com';
select count(*) from user_credentials where user_name like 'aaron%';
select * from user_credentials where user_id = '8845c97f';
select * from user_received_likes where user_email like 'aaron%';
select * from user_images where user_email like 'loki%';
select user_email, liked_user from user_received_likes where user_email = 'aaronkwok@devbook.com';

set time_zone = '+8:00';
insert into user_notifications (user_email, notification_email, notification_name, notification_content, notification_status) values 
	-- ('hughjackman@devbook.com','x','Patrick Jane','gave you a like!','NEW');
	-- ('hughjackman@devbook.com','x','Patrick Jane','rated you!','NEW');
	('hughjackman@devbook.com','x','Patrick Jane','left you a comment!','NEW');
select * from user_notifications order by date_time asc;
delete from user_notifications where user_email = 'hughjackman@devbook.com' order by date_time asc limit 1;
select count(*) from user_notifications where user_email = 'aaronkwok@devbook.com' and notification_status = 'NEW'