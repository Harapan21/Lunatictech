use super::node::CategoryNode;
use super::post::Post;
use super::schema::Context;
use crate::models::handler::Handler;

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
    pub fn id(&self) -> i32 {
        self.id
    }

    pub fn name(&self) -> &str {
        self.name.as_str()
    }

    pub fn parent(&self, context: &Context) -> Option<Category> {
        if self.parentId.is_some() {
            use crate::models::category::Category as CategoryModels;
            let parent = CategoryModels::find_by_id(&self.parentId.unwrap(), &context.conn)
                .ok()
                .unwrap();
            return Some(Category {
                id: parent.id,
                name: parent.name,
                parentId: parent.parentId,
            });
        }
        None
    }

    pub fn post(&self, context: &Context) -> Vec<Post> {
        let conn = &context.conn;
        let cat = crate::models::category::Category {
            id: self.id,
            name: self.name,
            parentId: self.parentId,
        };
        let posts = CategoryNode::get_by_categoryId(&cat, &conn);

        let result = posts
            .iter()
            .map(|e| {
                let category = CategoryNode::get_by_postId(&e, &conn);

                return Post {
                    id: e.id,
                    author_id: e.author_id,
                    title: e.title,
                    createdAt: e.createdAt,
                    content: e.content,
                    status: e.status,
                    last_edited_at: e.last_edited_at,
                    last_edited_by: e.last_edited_by,
                    category,
                };
            })
            .collect::<Vec<Post>>();
        result
    }
}
