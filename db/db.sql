create table credentials (
    uid BIGSERIAL NOT NULL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(1000) NOT NULL
);

create table tasks (
    tid BIGSERIAL PRIMARY KEY,
    uid BIGINT NOT NULL REFERENCES credentials(uid),
    task_name VARCHAR(100) NOT NULL,
    body VARCHAR(5000) NOT NULL,
    pats NUMERIC(10) DEFAULT 0,
    streak NUMERIC(5) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ONGOING',
    isRecurring NUMERIC(1) NOT NULL DEFAULT 1,
    frequency VARCHAR(15),
    start_date VARCHAR(20) NOT NULL,
    end_date VARCHAR(20),
    private_goal NUMERIC(1) NOT NULL,
    category VARCHAR(50) NOT NULL,
    task_thumbnail VARCHAR
);

-- Frequency - D, W, M
--         D - Daily,
--         5W - 5 times a week
--         3D - Every 3 days
--         11M - 11 times a month

insert into tasks (uid, task_name, body, isRecurring, frequency, private_goal, category) values (5, 'Get ripped', 'Planning to work on fitness for next 6 months. Wish me luck', 1, '3W', 0,'Fitness');

insert into tasks (uid, task_name, body, isRecurring, private_goal, end_date, category)
    values (4, 'Lose Weight', 'Been wanting to do this for quite some time. I am Trying to lose 5 kilos by March 31st', 0, 1, TO_DATE('31/03/2022', 'DD/MM/YYYY'),'Fitness');


insert into tasks (uid, task_name, body, isRecurring, frequency, private_goal, category)
    values (6, 'Code 1hr everyday', 'Day 1 of my coding adventure begins today. Will become an expert coder by the end of this. You guys just watch', 1, 'D', 0,'Education');


create table calendar (
    update_id BIGSERIAL PRIMARY KEY,
    update_date VARCHAR(20) NOT NULL,
    tid BIGINT NOT NULL REFERENCES tasks(tid),
    update_thumbnail VARCHAR,
    body VARCHAR(1000) 
);


create table friends (
    uid BIGSERIAL NOT NULL REFERENCES credentials(uid),
    isFriendOf BIGSERIAL NOT NULL REFERENCES credentials(uid)
);

create table user_details (
    uid BIGSERIAL NOT NULL REFERENCES credentials(uid) PRIMARY KEY,
    goald NUMERIC NOT NULL DEFAULT 100,
    level VARCHAR(50) NOT NULL DEFAULT 'Slacker',
    highest_streak NUMERIC(5) DEFAULT 0,
    best_level VARCHAR(50) ,
    tasks_completed NUMERIC(5) DEFAULT 0,
    tasks_failed NUMERIC(5) DEFAULT 0,
    tasks_ongoing NUMERIC(5) DEFAULT 0
);

insert into user_details (uid ) values (4);
insert into user_details (uid ) values (5);
insert into user_details (uid ) values (6);
