use smile;

CREATE TABLE user (
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

CREATE TABLE post (
    id INT NOT NULL AUTO_INCREMENT,
    author_id CHAR(36),
    title VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content LONGTEXT,
    status ENUM('publish', 'draft', 'hide') NOT NULL DEFAULT 'draft',
    lastEditedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT post_to_user FOREIGN KEY (author_id)
        REFERENCES user (user_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);


CREATE TABLE embed (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    thumbnail VARCHAR(255) NULL,
    video LONGTEXT NULL,
    PRIMARY KEY (id),
    CONSTRAINT embed_to_post FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE rating (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    view INT NOT NULL DEFAULT 0,
    share INT NOT NULL DEFAULT 0,
    comment INT NOT NULL DEFAULT 0,
    video_rate INT,
    PRIMARY KEY (id),
    CONSTRAINT rating_to_post FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE 
    TRIGGER  push_embed
 AFTER INSERT ON post FOR EACH ROW 
    INSERT INTO embed (postId) VALUES (new.id);
CREATE 
    TRIGGER  push_rating
 AFTER INSERT ON post FOR EACH ROW 
    INSERT INTO rating (postId) VALUES (new.id);


CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    userId CHAR(36),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content LONGTEXT,
    reply_for_id INT NULL,
    PRIMARY KEY (id),
    CONSTRAINT comment_to_user FOREIGN KEY (userId)
        REFERENCES user (user_id)
        ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT comment_to_post FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT comment_to_comment FOREIGN KEY (reply_for_id)
        REFERENCES comment (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE page (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    content LONGTEXT,
    PRIMARY KEY (id)
);


CREATE TABLE topic (
    id INT NOT NULL AUTO_INCREMENT,
    name INT NOT NULL,
    pageId INT,
    thumbnail VARCHAR(255) NULL,
    PRIMARY KEY (id),
    CONSTRAINT topic_to_page FOREIGN KEY (pageId)
        REFERENCES page (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE topic_node (
    id INT NOT NULL AUTO_INCREMENT,
    topicId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY topic_node_id (topicId , postId),
    CONSTRAINT node_topic_to_post FOREIGN KEY (postId)
        REFERENCES post (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT node_topic_to_topic FOREIGN KEY (topicId)
        REFERENCES topic (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    topicId INT,
    PRIMARY KEY (id)
);

CREATE TABLE category_node (
    id INT NOT NULL AUTO_INCREMENT,
    categoryId INT NOT NULL,
    postId INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY category_node_id (categoryId , postId),
    CONSTRAINT category_node_to_category FOREIGN KEY (categoryId)
        REFERENCES category (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT category_node_to_post FOREIGN KEY (postId)
        REFERENCES post (id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE blog_info (
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (name)
);

INSERT INTO
  page(name)
VALUES
  ("Movie"), 
  ("Game");

INSERT INTO blog_info
	(name,
	description)
VALUES
	("Lunatictech",
	"Watch and Play");