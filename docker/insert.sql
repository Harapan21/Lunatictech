use smile;

#insert user
INSERT INTO `smile`.`usr_smile`
(`username`,
`email`,
`fullname`,
`password`,
`avatar`)
VALUES
("michael11",
"michael.figun@gmail.com",
"Michael Figun",
"password1",
"https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3759e09a5b9fbe53088b23c615b6312e"),
("manyu22",
"dewantaraabimanyu@gmail.com",
"dewantara abimanyu",
"password2",
"https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3759e09a5b9fbe53088b23c615b6312e");

SELECT 
    *
FROM
    smile.usr_smile;

UPDATE `smile`.`usr_smile` 
SET 
    `email` = 'harapanpardamean@gmail.net'
WHERE
    `user_id` = 'd0c2499c48dc906b7538a36fe9773ec2';

UPDATE `smile`.`usr_smile`
SET
`user_id` = <{user_id: }>,
`username` = <{username: }>,
`email` = <{email: }>,
`fullname` = <{fullname: }>,
`password` = <{password: }>,
`avatar` = <{avatar: }>,
`isAdmin` = <{isAdmin: 0}>
WHERE `user_id` = <{expr}>;

# push posting by author_id ( user id )
INSERT INTO `smile`.`post`
(`author_id`,
`title`,
`content`,
`status`)
VALUES
("48ff750273b5568b04a2b794f1dfff04",
"post by michael",
"thid dummy post by michael ok fine thank you",
"publish");

UPDATE `smile`.`post` 
SET 
    `title` = 'this post edited by manyu',
    `content` = 'edited by manyu',
    `last_edited_by` = 'd0c2499c48dc906b7538a36fe9773ec2'
WHERE
    `id` = 1;

DELETE FROM `smile`.`post` 
WHERE
    id = 2;

SELECT 
    `post`.`id`,
    `post`.`author_id`,
    `post`.`title`,
    `post`.`createdAt`,
    `post`.`content`,
    `post`.`status`,
    `post`.`last_edited_at`,
    `post`.`last_edited_by`
FROM
    `smile`.`post`;


SELECT 
    `embed`.`id`,
    `embed`.`postId`,
    `embed`.`thumbnail`,
    `embed`.`video`
FROM
    `smile`.`embed`;

SELECT 
    `rating`.`id`,
    `rating`.`postId`,
    `rating`.`view`,
    `rating`.`share`,
    `rating`.`comment`,
    `rating`.`video_rate`
FROM
    `smile`.`rating`;

SELECT 
    `contributor_user`.`id`,
    `contributor_user`.`postId`,
    `contributor_user`.`contribAt`,
    `contributor_user`.`user_id`
FROM
    `smile`.`contributor_user`;

INSERT INTO `smile`.`comment`
(`postId`,
`content`,
`userId`)
VALUES
(1,
"this comment for id post 5 oke long test version hei hti slong etes",
"d0c2499c48dc906b7538a36fe9773ec2");


SELECT 
    `comment`.`id`,
    `comment`.`postId`,
    `comment`.`createdAt`,
    `comment`.`content`,
    `comment`.`reply`,
    `comment`.`reply_for_id`,
    `comment`.`userId`
FROM
    `smile`.`comment`;

DELETE FROM `smile`.`comment`
WHERE id=3;
UPDATE `smile`.`comment`
SET
`content` = <{content: }>,
`reply_for_id` = <{reply_for_id: }>
WHERE `id` = <{expr}>;



