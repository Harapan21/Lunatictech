use super::schema::Context;
use super::topic::TopicSchema;
use crate::{
    errors::SmileError,
    models::{category::Category, handler::Handler, topic::Topic},
};

pub trait CategorySchema {
    fn id(&self) -> &i32;
    fn name(&self) -> &str;
    fn topic(
        &self,
        context: &Context,
    ) -> Result<Option<Box<dyn TopicSchema + 'static>>, SmileError>;
}

impl CategorySchema for Category {
    fn id(&self) -> &i32 {
        &self.id
    }
    fn name(&self) -> &str {
        &self.name.as_str()
    }
    fn topic(
        &self,
        context: &Context,
    ) -> Result<Option<Box<dyn TopicSchema + 'static>>, SmileError> {
        return match &self.topicId {
            Some(topic_id) => {
                let topic = Topic::find_by_id(topic_id, &context.conn)?;
                Ok(Some(topic as Box<dyn TopicSchema>))
            }
            None => Ok(None),
        };
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
    ) -> Result<Option<Box<dyn TopicSchema + 'static>>, SmileError> {
        self.topic(context)
    }
}
