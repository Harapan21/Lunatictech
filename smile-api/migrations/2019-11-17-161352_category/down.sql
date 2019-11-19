-- This file should undo anything in `up.sql`
DROP TABLE `smile`.`category`;
DROP TABLE `smile`.`category_node`;
DROP TRIGGER [IF EXISTS] `smile`.set_default_if_category_null;
