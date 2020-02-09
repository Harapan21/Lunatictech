use super::category::CategorySchema;
use super::schema::Context;
use crate::models::category::Category;
use crate::models::topic::Topic;
use diesel::prelude::*;

pub trait TopicSchema {
    fn id(&self) -> &i32;
    fn name(&self) -> &str;
    fn thumbnail(&self) -> &Option<String>;
    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>>;
}

impl TopicSchema for Topic {
    fn id(&self) -> &i32 {
        &self.id
    }

    fn name(&self) -> &str {
        &self.name.as_str()
    }

    fn thumbnail(&self) -> &Option<String> {
        &self.thumbnail
    }

    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>> {
        let conn: &MysqlConnection = &context.conn;
        Category::belonging_to(self)
            .load::<Category>(conn)
            .map(|x| x.into_iter().map(Box::new).map(|x| x as Box<dyn CategorySchema>).collect())
            .expect("failed load category")
    }
}

#[juniper::object(
    name="Topic",
    Context=Context)]
impl Box<dyn TopicSchema> {
    fn id(&self) -> &i32 {
        &self.id()
    }
    fn name(&self) -> &str {
        &self.name()
    }
    fn thumbnail(&self) -> &Option<String> {
        &self.thumbnail()
    }
    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema + 'static>> {
        self.category(context)
    }
}
