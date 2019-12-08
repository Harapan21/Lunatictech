use super::schema::Context;
use crate::errors::SmileError;
use crate::models::category::CategoryNode;
use crate::models::handler::Handler;
use crate::models::post::Post;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub parentId: Option<i32>,
}

#[juniper::object(
Context = Context
    )]
impl Category {
    fn id(&self) -> i32 {
        self.id
    }
    fn name(&self) -> &str {
        self.name.as_str()
    }
    fn parent(&self, context: &Context) -> Result<Option<Box<Category>>, SmileError> {
        if self.parentId.is_some() {
            use crate::models::category::Category as CategoryModels;
            let parent = CategoryModels::find_by_id(&self.parentId.unwrap(), &context.conn)?;
            return Ok(Some(Box::new(Category {
                id: parent.id,
                name: parent.name,
                parentId: parent.parentId,
            })));
        }
        Ok(None)
    }
    fn post(&self, context: &Context) -> Vec<Post> {
        let conn = &context.conn;
        let cat = crate::models::category::Category {
            id: self.id,
            name: self.name,
            parentId: self.parentId,
        };
        CategoryNode::get_by_categoryId(&cat, conn)
    }
}
