use super::schema::Context;
use crate::models::{embed::Embed, handler::Handler};

pub trait EmbedSchema {
    fn id(&self) -> &i32;
    fn thumbnail(&self) -> &Option<String>;
    fn video(&self) -> &Option<String>;
    fn topic(&self) -> &Option<String>;
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
    fn topic(&self) -> &Option<String> {
        &self.topic
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
}
