use super::schema::Context;
use crate::models::{embed::Embed, game::Game, handler::Handler, movie::Movie};

pub trait EmbedSchema {
    fn id(&self) -> &i32;
    fn thumbnail(&self) -> &Option<String>;
    fn video(&self) -> &Option<String>;
    fn game(&self, context: &Context) -> Option<Box<Game>>;
    fn movie(&self, context: &Context) -> Option<Box<Movie>>;
}

impl EmbedSchema for Embed {
    fn id(&self) -> &i32 {
        &self.id
    }
    fn thumbnail(&self) -> &Option<String> {
        &self.thumbnail
    }
    fn video(&self) -> &Option<String> {
        &self.video
    }
    fn movie(&self, context: &Context) -> Option<Box<Movie>> {
        match self.movie {
            Some(id) => Some(Movie::find_by_id(&id, &context.conn).expect("failed to find movie")),
            None => None,
        }
    }
    fn game(&self, context: &Context) -> Option<Box<Game>> {
        match self.movie {
            Some(id) => Some(Game::find_by_id(&id, &context.conn).expect("failed to find movie")),
            None => None,
        }
    }
}

#[juniper::object(Context=Context)]
impl Box<dyn EmbedSchema> {
    fn id(&self) -> &i32 {
        &self.id()
    }
    fn video(&self) -> &Option<String> {
        &self.video()
    }
    fn thumbnail(&self) -> &Option<String> {
        &self.thumbnail()
    }
    fn movie(&self, context: &Context) -> Option<Box<Movie>> {
        self.movie(context)
    }
    fn game(&self, context: &Context) -> Option<Box<Game>> {
        self.game(context)
    }
}
