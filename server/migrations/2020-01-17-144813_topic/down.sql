-- This file should undo anything in `up.sql`
ALTER TABLE  `smile`.`embed`
	DROP COLUMN topicId,
	DROP FOREIGN KEY FROM_EMBED_CN_TO_TOPIC;

alter table `smile`.`category` drop foreign key CN_TO_TOPIC;

drop table `smile`.`topic`;
