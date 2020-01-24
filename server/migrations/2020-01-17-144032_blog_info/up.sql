-- Your SQL goes here
CREATE TABLE `smile`.`blog_info` (
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	PRIMARY KEY (name)
);

INSERT INTO `smile`.`blog_info`
	(name,
	description)
VALUES
	("Lunatictech",
	"Watch and Play");

	
