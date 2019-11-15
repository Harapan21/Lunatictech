-- Your SQL goes here
CREATE TABLE `smile`.`post` (
    id INT NOT NULL AUTO_INCREMENT,
    author_id CHAR(36),
    title VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content LONGTEXT,
    status ENUM('publish', 'draft', 'hide') NOT NULL DEFAULT 'draft', -- note: snake_case
    last_edited_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_edited_by CHAR(36),
    PRIMARY KEY (id),
    FOREIGN KEY (author_id)
        REFERENCES usr_smile (user_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);
