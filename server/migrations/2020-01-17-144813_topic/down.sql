-- This file should undo anything in `up.sql`
alter table `smile`.`category` drop foreign key CN_TO_TOPIC;
drop table `smile`.`topic`;
