-- This file should undo anything in `up.sql`
ALTER TABLE `smile`.`category_node` DROP FOREIGN KEY CN_TO_CATEGORY_AS_CATNODE DROP FOREIGN KEY CN_TO_POST_AS_CATNODE;
ALTER TABLE `smile`.`category`;
DROP TABLE `smile`.`category`;
DROP TABLE `smile`.`category_node`;
