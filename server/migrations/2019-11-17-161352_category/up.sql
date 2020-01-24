CREATE TABLE `smile`.`category` (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    parentId INT,
    PRIMARY KEY (id)
);

ALTER TABLE `smile`.`category` AUTO_INCREMENT = 1;

CREATE TABLE `smile`.`category_node` (
    id INT NOT NULL AUTO_INCREMENT,
    categoryId INT DEFAULT 1,
    postId INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY category_node_id (categoryId , postId),
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
  `smile`.`category`(`name`)
VALUES
  ("Uncategory"), 
  ("Movie"), 
  ("Game");
