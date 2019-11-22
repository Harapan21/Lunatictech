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
    FOREIGN KEY (postId)
        REFERENCES post (id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
