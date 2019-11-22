-- Your SQL goes here
CREATE TABLE `smile`.`contrib_post_temp`(
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT,
    status ENUM('publish', 'draft', 'hide') NOT NULL DEFAULT 'draft',
    accepted BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    author_id CHAR(36) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT CN_TO_POST_AS_CONTRIBTMP FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TRIGGER `smile`.`push_contrib`
	AFTER
	UPDATE
	  ON `smile`.`contrib_post_temp` FOR EACH ROW 
	BEGIN 
		IF (new.`accepted` = TRUE) THEN
			INSERT INTO
			  `smile`.`contributor_user` (`postId`, `user_id`)
			VALUES
			  (new.`postId`),
			  (new.`author_id`);
			DELETE FROM
			  `smile`.`contrib_post_temp`
			WHERE
			  new.`id`;
		END IF;
	END 
