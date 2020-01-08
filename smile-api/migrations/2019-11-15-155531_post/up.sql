-- Your SQL goes here
CREATE TABLE `smile`.`post` (
    id INT NOT NULL AUTO_INCREMENT,
    author_id CHAR(36),
    title VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content LONGTEXT,
    status ENUM('publish', 'draft', 'hide') NOT NULL DEFAULT 'draft',
    last_edited_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_edited_by CHAR(36),
    PRIMARY KEY (id),
    CONSTRAINT CN_TO_USER FOREIGN KEY (author_id)
        REFERENCES usr_smile (user_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE `smile`.`embed` (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    thumbnail VARCHAR(255) NULL,
    video LONGTEXT NULL,
    PRIMARY KEY (id),
    CONSTRAINT CN_TO_POST_AS_EMBED FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `smile`.`rating` (
    id INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    view INT NOT NULL DEFAULT 0,
    share INT NOT NULL DEFAULT 0,
    comment INT NOT NULL DEFAULT 0,
    video_rate INT,
    PRIMARY KEY (id),
    CONSTRAINT CN_TO_POST_AS_RATING FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE 
    TRIGGER  `smile` . push_embed_if_status_publish
 AFTER INSERT ON post FOR EACH ROW 
    INSERT INTO `smile`.`embed` (`postId`) VALUES (new.id);

CREATE 
    TRIGGER  `smile` . push_rating_if_status_publish
 AFTER INSERT ON `smile`.`post` FOR EACH ROW 
    INSERT INTO `smile`.`rating` (postId) VALUES (new.id);
