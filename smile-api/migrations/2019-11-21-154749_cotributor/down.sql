-- This file should undo anything in `up.sql`
ALTER TABLE `smile`.`contrib_post_temp` DROP FOREIGN KEY CN_TO_POST_AS_CONTRIBTMP; 
DROP TABLE `smile`.`contrib_post_temp`;

