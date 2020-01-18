-- This file should undo anything in `up.sql`
ALTER TABLE  `smile`.`embed`
	DROP FOREIGN KEY CN_TO_GAME,
	DROP FOREIGN KEY CN_TO_MOVIE,
	DROP COLUMN game,
	DROP COLUMN movie;
