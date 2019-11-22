-- This file should undo anything in `up.sql`
DROP FOREIGN KEY CN_TO_POST_AS_CONTRIBTMP; 
DROP TABLE `smile`.`contrib_post_temp`;
DROP TRIGGER [IF EXISTS] `smile`.push_contrib;
;

