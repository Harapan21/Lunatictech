use super::schema::Context;
use crate::models::category::CategoryNode;
use crate::models::post::Post;

pub use crate::models::category::Category;

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
    fn post(&self, context: &Context) -> Vec<Post> {
        let conn = &context.conn;
        CategoryNode::get_by_categoryId(self, conn)
    }
}
