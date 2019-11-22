-- This file should undo anything in `up.sql`
DROP FOREIGN KEY CN_TO_POST;
DROP FOREIGN KEY CN_TO_USER; 
DROP FOREIGN CN_TO_POST_AS_EMBED;
DROP TABLE `smile`.`post`;
DROP TABLE `smile.`embed`;
DROP TABLE `smile.`rating`;
DROP TRIGGER [IF EXISTS] `smile`.push_embed_if_status_publish;
DROP TRIGGER [IF EXISTS] `smile`.push_rating_if_status_publish;
