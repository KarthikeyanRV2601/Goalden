create table tasks ( 
    u_id BIGSERIAL NOT NULL PRIMARY KEY,
    t_id BIGSERIAL NOT NULL PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL, 
    body VARCHAR(50) NOT NULL, 
    pats NUMERIC(5) NOT NULL, 
    status VARCHAR(20) NOT NULL, 
    streak VARCHAR(15) NOT NULL,
    isRecurring VARCHAR(5) NOT NULL,
    frequency NUMERIC(5) NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    calender_id BIGSERIAL NOT NULL PRIMARY KEY,
    category VARCHAR(20) NOT NULL,
    task_thumbnail VARCHAR(20) NOT NULL
); 

insert into tasks (u_id, t_id, task_name, body, pats, status, streak, isRecurring, frequency, start_date, end_date, calender_id, category, task_thumbnail) 
            values(1001, 1, 'Workout everyday' , 'insert_task_body', 5, 'Ongoing', '1 week', 'Weekly', 7, '2021-02-25', '2021-06-30', 1, 'Personal_Fitness', 'insert_thumbnail'); 
insert into tasks (u_id, t_id, task_name, body, pats, status, streak, isRecurring, frequency, start_date, end_date, calender_id, category, task_thumbnail) 
            values(1002, 2, 'Poop, first thing in the morning' , 'insert_task_body', 6, 'Behind Schedule', '2 days', 'Yearly', 2, '2021-02-25', '2022-02-25', 2, 'Health', 'insert_thumbnail'); 
insert into tasks (u_id, t_id, task_name, body, pats, status, streak, isRecurring, frequency, start_date, end_date, calender_id, category, task_thumbnail) values(1003, 3, 'Eat breakfast by 9' , 'insert_task_body', 4, 'Ongoing', '2 weeks', 'Weekly', 7, '2021-02-25', '2021-06-30', 3, 'Health', 'insert_thumbnail'); 
insert into tasks (u_id, t_id, task_name, body, pats, status, streak, isRecurring, frequency, start_date, end_date, calender_id, category, task_thumbnail) values(1004, 4, 'Go jogging at 7' , 'insert_task_body', 5, 'Ongoing', '1 week', 'Weekly', 7, '2021-02-25', '2021-06-30', 4, 'Personal_Fitness', 'insert_thumbnail'); 
insert into tasks (u_id, t_id, task_name, body, pats, status, streak, isRecurring, frequency, start_date, end_date, calender_id, category, task_thumbnail) values(1005, 5, 'Do yoga' , 'insert_task_body', 7, 'Ongoing', '1 week', 'Weekly', 7, '2021-02-25', '2021-06-30', 5, 'Personal_Fitness', 'insert_thumbnail'); 
insert into tasks (u_id, t_id, task_name, body, pats, status, streak, isRecurring, frequency, start_date, end_date, calender_id, category, task_thumbnail) values(1006, 6, 'Wake up at 6.30' , 'insert_task_body', 3, 'Ongoing', '1 week', 'Weekly', 7, '2021-02-25', '2021-06-30', 6, 'Routines', 'insert_thumbnail'); 
insert into tasks (u_id, t_id, task_name, body, pats, status, streak, isRecurring, frequency, start_date, end_date, calender_id, category, task_thumbnail) values(1007, 7, 'Feed dog at 8' , 'insert_task_body', 2, 'Completed', '1 month', 'Monthly', 25, '2021-02-25', '2021-06-30', 7, 'Pet_Goals', 'insert_thumbnail'); 

create table comment ( 
    t_id BIGSERIAL NOT NULL REFERENCES tasks(t_id), 
    u_id BIGSERIAL NOT NULL REFERENCES tasks(u_id),
    body VARCHAR(50) NOT NULL REFERENCES tasks(body),
    comment_id BIGSERIAL NOT NULL PRIMARY KEY 
);

insert into comment values (1001, 1,'insert_task_body', 1); 
insert into comment values (1002, 2, 'insert_task_body', 2); 
insert into comment values (1003, 3, 'insert_task_body', 3); 
insert into comment values (1004, 4, 'insert_task_body', 4); 
insert into comment values (1005, 5, 'insert_task_body', 5); 

create table credentials (
    u_id BIGSERIAL NOT NULL REFERENCES tasks(u_id),
    user_name VARCHAR(50) NOT NULL,
    passwd VARCHAR(50) NOT NULL,
);

insert into user_login (user_name, passwd) values ('customer1', 'customer1');
insert into user_login (user_name, passwd) values ('customer2', 'customer2');
insert into user_login (user_name, passwd) values ('customer3', 'customer3');
insert into user_login (user_name, passwd) values ('customer4', 'customer4');
insert into user_login (user_name, passwd) values ('customer5', 'customer5');
insert into user_login (user_name, passwd) values ('salesperson1', 'salesperson1');
insert into user_login (user_name, passwd) values ('salesperson2', 'salesperson2');

create table friends (
    u_id BIGSERIAL NOT NULL REFERENCES tasks(u_id),
    u_id BIGSERIAL NOT NULL REFERENCES tasks(u_id)
);

create table user (
    u_id BIGSERIAL NOT NULL REFERENCES tasks(u_id),
    coins BIGSERIAL NOT NULL,
    level BIGSERIAL NOT NULL,
    highest_streak NUMERIC(5) NOT NULL REFERENCES tasks(streak),
    best_level NUMERIC(5) NOT NULL REFERENCES user(level),
    tasks_completed NUMERIC(5) NOT NULL REFERENCES tasks(status),
    tasks_failed NUMERIC(5) NOT NULL REFERENCES tasks(status),
    tasks_ongoing NUMERIC(5) NOT NULL REFERENCES tasks(status)
);

insert into user (highest_streak, best_level, tasks_completed, tasks_failed, tasks_ongoing) values (5, 2, 2, 1, 3); 
insert into user (highest_streak, best_level, tasks_completed, tasks_failed, tasks_ongoing) values (6, 2, 4, 1, 2); 
insert into user (highest_streak, best_level, tasks_completed, tasks_failed, tasks_ongoing) values (7, 3, 1, 2, 3); 
insert into user (highest_streak, best_level, tasks_completed, tasks_failed, tasks_ongoing) values (8, 4, 2, 1, 2); 
insert into user (highest_streak, best_level, tasks_completed, tasks_failed, tasks_ongoing) values (4, 3, 2, 2, 2);