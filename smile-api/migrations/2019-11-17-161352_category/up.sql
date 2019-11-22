CREATE TABLE `smile`.`category` (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    parentId INT,
    PRIMARY KEY (id)
);

CREATE TABLE `smile`.`category_node` (
    id INT NOT NULL AUTO_INCREMENT,
    categoryId INT DEFAULT 0,
    postId INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT CN_TO_CATEGORY_AS_CATNODE FOREIGN KEY (categoryId)
        REFERENCES category (id)
        ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT CN_TO_POST_AS_CATNODE FOREIGN KEY (postId)
        REFERENCES post (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TRIGGER `smile`.set_default_if_category_null
	AFTER DELETE ON `smile`.`category` 
    	FOR EACH ROW 
		UPDATE `smile`.`category_node` 
			SET categoryId = 0 
            		WHERE categoryId = NULL;

INSERT INTO
  `smile`.`category`(`id`, `name`)
VALUES
  (0, "Uncategory");
