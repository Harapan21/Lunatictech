use super::schema::Context;
use crate::errors::SmileError;
use crate::models::category::Category;
use crate::models::handler::Handler;

pub trait CategorySchema {
    fn id(&self) -> &i32;
    fn name(&self) -> &str;
    fn parent(&self, context: &Context) -> Result<Option<Box<dyn CategorySchema>>, SmileError>;
}

impl CategorySchema for Category {
    fn id(&self) -> &i32 {
        &self.id
    }
    fn name(&self) -> &str {
        &self.name.as_str()
    }
    fn parent(&self, context: &Context) -> Result<Option<Box<dyn CategorySchema>>, SmileError> {
        if let Some(parent_id) = &self.parentId {
            let category = Category::find_by_id(parent_id, &context.conn)?;
            return Ok(Some(category));
        }
        Ok(None)
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
    fn parent(
        &self,
        context: &Context,
    ) -> Result<Option<Box<dyn CategorySchema + 'static>>, SmileError> {
        self.parent(context)
    }
}
