-- Your SQL goes here
CREATE TABLE `smile`.`topic` (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    icon VARCHAR(255) NULL,
    PRIMARY KEY (id)
);

INSERT INTO `smile`.`topic` (id, name) SELECT id,name FROM `smile`.`category` WHERE parentId is null; 
DELETE FROM `smile`.`category` 
	WHERE
    		parentId IS NULL; 

alter table `smile`.`category` change parentId topicId int,
	ADD CONSTRAINT CN_TO_TOPIC FOREIGN KEY (topicId) REFERENCES topic(id) ON DELETE CASCADE ON UPDATE CASCADE
;

DROP TRIGGER `smile`.set_default_if_category_null;


DELETE FROM `smile`.`category`;


ALTER TABLE  `smile`.`embed`
	ADD COLUMN topicId int,
	ADD CONSTRAINT FROM_EMBED_CN_TO_TOPIC FOREIGN KEY (topicId)
        REFERENCES topic (id),
	DROP FOREIGN KEY CN_TO_GAME,
	DROP FOREIGN KEY CN_TO_MOVIE,
	DROP COLUMN game,
	DROP COLUMN movie;

DROP TABLE `smile`.`game`;
DROP TABLE `smile`.`movie`;
