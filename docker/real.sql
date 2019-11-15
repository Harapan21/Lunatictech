# create databases is exists or not
DROP DATABASE IF EXISTS smile;

CREATE DATABASE smile;

use smile;

CREATE TABLE usr_smile (
    user_id CHAR(36) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE,
    joinAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastEditedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    fullname VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    isAdmin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);
# create trigger for generete id for user
# triggered before insert user data
DELIMITER $$ 
	CREATE TRIGGER auto_generate_id 
	BEFORE
		INSERT
		  on usr_smile 
	FOR EACH ROW 
	BEGIN
		SET
		  NEW.user_id = MD5(UUID());
	END 
$$ DELIMITER ;


CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    parentId INT,
    PRIMARY KEY (id)
);

INSERT INTO
  category(id, name)
VALUES
  (0, "Uncategory");
  
  
CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT,
    author_id CHAR(36),
    title VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content LONGTEXT,
    status ENUM('publish', 'draft', 'hide') NOT NULL DEFAULT 'draft',
    last_edited_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_edited_by CHAR(36),
    PRIMARY KEY (id),jkljkj
    FOREIGN KEY (auhthor_id)
        REFERENCES usr_smile (user_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);


CREATE TABLE category_node (
    id INT NOT NULL AUTO_INCREMENT,
    categoryId INT DEFAULT 0,
    postId INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (categoryId)
        REFERENCES category (id)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (postId)
        REFERENCES post (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);


DELIMITER $$ 
	CREATE TRIGGER set_default_if_category_null
	AFTER
		DELETE ON category 
    FOR EACH ROW 
	BEGIN
			UPDATE
			  category_node
			SET
			  categoryId = 0
			WHERE
			  categoryId = NULL;
	END $$
DELIMITER ;



CREATE TABLE contrib_post_temp (
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
    FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE embed (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    thumbnail VARCHAR(255) NULL,
    video LONGTEXT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);



# push rating after publish post
DELIMITER $$ 
	CREATE TRIGGER push_embed_if_status_publish
	AFTER
	INSERT
	  ON post FOR EACH ROW 
	BEGIN
		INSERT INTO
		  embed(postId)
		VALUES(new.id);
	END 
$$ DELIMITER;



CREATE TABLE rating (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    view INT NOT NULL DEFAULT 0,
    share INT NOT NULL DEFAULT 0,
    comment INT NOT NULL DEFAULT 0,
    video_rate INT,
    PRIMARY KEY (id),
    FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


# push rating after publish post
DELIMITER $$ 
CREATE TRIGGER push_rating_if_status_publish
	AFTER
	INSERT
	  ON post FOR EACH ROW 
	BEGIN
	INSERT INTO
	  rating(postId)
	VALUES(new.id);
	END 
$$ DELIMITER;




CREATE TABLE contributor_user (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    contribAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id CHAR(36) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


# push contributor if id not equal to author_id
DELIMITER $$ 
	CREATE TRIGGER push_contrib
	AFTER
	UPDATE
	  ON contrib_post_temp FOR EACH ROW 
	BEGIN 
		IF (new.accepted = TRUE) THEN
			INSERT INTO
			  smile.contributor_user (postId, user_id)
			VALUES
			  (new.postId),
			  (new.author_id);
			DELETE FROM
			  contrib_post_temp
			WHERE
			  new.id;
		END IF;
	END 
$$ DELIMITER;



CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    userId CHAR(36),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content LONGTEXT,
    reply BOOLEAN NOT NULL DEFAULT FALSE,
    reply_for_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId)
        REFERENCES usr_smile (user_id)
        ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (reply_for_id)
        REFERENCES comment (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


# trigger for increment rating.comment if comment insert to post
DELIMITER $$ 
	CREATE TRIGGER increment_rating_comment
	AFTER
	INSERT
	  ON comment FOR EACH ROW 
	BEGIN 
	  DECLARE old_rating INT;
		SET
			old_rating = (
				SELECT
					comment
				FROM
					rating
				WHERE
					postid = new.postId
			) + 1;
		UPDATE
		  rating
		SET
		  comment = old_rating
		WHERE
		  postId = new.postId;
	END 
$$ DELIMITER;
    
DELIMITER $$ 
	CREATE TRIGGER decrement_rating_comment 
		BEFORE DELETE 
		ON comment FOR EACH ROW 
		BEGIN 
			DECLARE old_rating INT;
			SET
			  old_rating = (
				SELECT
				  comment
				FROM
				  rating
				WHERE
				  postid = old.postId ) - 1;
			UPDATE
			  rating
			SET
			  comment = old_rating
			WHERE
			  postId = old.postId;
		END $$ 
DELIMITER ;