use super::schema::Context;
use crate::{
    errors::SmileError,
    models::{category::Category, handler::Handler},
};

pub trait CategorySchema {
    fn id(&self) -> &i32;
    fn name(&self) -> &str;
    fn topic(&self, context: &Context) -> Result<Option<Box<dyn CategorySchema>>, SmileError>;
}

impl CategorySchema for Category {
    fn id(&self) -> &i32 {
        &self.id
    }
    fn name(&self) -> &str {
        &self.name.as_str()
    }
    fn topic(&self, context: &Context) -> Result<Option<Box<dyn CategorySchema>>, SmileError> {
        match &self.topicId {
            Some(topic_id) => {
                let category = Category::find_by_id(topic_id, &context.conn)?;
                return Ok(Some(category));
            }
            None => Ok(None),
        }
    }
}

#[juniper::object(
    name="Category",
    Context= Context
)]
impl Box<dyn CategorySchema> {
    fn id(&self) -> &i32 {
        &self.id()
    }
    fn name(&self) -> &str {
        &self.name()
    }
    fn topic(
        &self,
        context: &Context,
    ) -> Result<Option<Box<dyn CategorySchema + 'static>>, SmileError> {
        self.topic(context)
    }
}
