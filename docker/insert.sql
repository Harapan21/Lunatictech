
SELECT `usr_smile`.`user_id`,
    `usr_smile`.`username`,
    `usr_smile`.`email`,
    `usr_smile`.`joinAt`,
    `usr_smile`.`lastEditedAt`,
    `usr_smile`.`fullname`,
    `usr_smile`.`password`,
    `usr_smile`.`avatar`,
    `usr_smile`.`isAdmin`
FROM `smile`.`usr_smile`;




INSERT INTO `smile`.`post`
(`author_id`,
`title`,
`content`)
VALUES
("675ade6a1d8d34adc4cffe9224f63df2",
"test post2",
"lorem ipsum");

delete from post where id = 2;

SELECT `post`.`id`,
    `post`.`author_id`,
    `post`.`title`,
    `post`.`createdAt`,
    `post`.`content`,
    `post`.`status`,
    `post`.`last_edited_at`,
    `post`.`last_edited_by`
FROM `smile`.`post`;

SELECT `category`.`id`,
    `category`.`name`,
    `category`.`parentId`
FROM `smile`.`category`;

SELECT `category_node`.`id`,
    `category_node`.`categoryId`,
    `category_node`.`postId`
FROM `smile`.`category_node`;
DELETE FROM `smile`.`category_node`
WHERE id=5;

INSERT INTO `smile`.`category_node`
(`categoryId`,
`postId`)
VALUES
(1,
4);


INSERT INTO `smile`.`category_node`
(`postId`)
VALUES
(1,1);

SELECT 
    *
FROM
    smile.category_node
        INNER JOIN
    smile.category ON smile.category_node.categoryId = smile.category.id
WHERE
    postId = 3;
    
    SELECT 
    *
FROM
    smile.category_node
        INNER JOIN
    post ON category_node.postId = post.id
WHERE
    categoryId = 1;