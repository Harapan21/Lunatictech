-- This file should undo anything in `up.sql`
DROP FOREIGN KEY CN_TO_CATEGORY_AS_CATNODE;
DROP FOREIGN KEY CN_TO_POST_AS_CATNODE;
DROP TABLE `smile`.`category`;
DROP TABLE `smile`.`category_node`;
DROP TRIGGER [IF EXISTS] `smile`.set_default_if_category_null;
