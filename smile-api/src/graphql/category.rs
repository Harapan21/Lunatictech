use super::post::Post;
use super::schema::Context;
use crate::models::category::CategoryNode;

pub use crate::models::category::Category;

#[juniper::object(
Context = Context
    )]
impl Category {
    fn id(&self) -> i32 {
        self.id
    }
    fn name(&self) -> String {
        self.name
    }
    fn post(&self, context: &Context) -> Vec<Post> {
        let conn = &context.conn;
        CategoryNode::get_by_categoryId(self, conn)
    }
}
