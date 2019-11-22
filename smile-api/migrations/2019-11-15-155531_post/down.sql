-- This file should undo anything in `up.sql`
ALTER TABLE `smile`.`post` DROP FOREIGN KEY KEY CN_TO_USER;
ALTER TABLE `smile.`embed` DROP FOREIGN KEY CN_TO_POST_AS_EMBED;
ALTER TABLE `smile.`rating` DROP FOREIGN KEY CN_TO_POST_AS_RATING;
DROP TABLE `smile`.`post`;
DROP TABLE `smile.`embed`;
DROP TABLE `smile.`rating`;
