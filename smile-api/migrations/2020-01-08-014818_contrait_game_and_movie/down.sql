-- This file should undo anything in `up.sql`
ALTER TABLE  `smile`.`embed`  
	DROP COLUMN game INT,
	DROP COLUMN movie INT,
	DROP  CN_TO_GAME ,
	DROP  CN_TO_POST_AS_EMBED ;
