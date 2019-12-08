use super::post::Post;
use super::schema::Context;
use crate::errors::SmileError;
use crate::models::category::CategoryNode;
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
    fn id(&self) -> i32 {
        self.id
    }
    fn name(&self) -> &str {
        &self.name.as_str()
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
    fn post(&self, context: &Context) -> Result<Vec<crate::graphql::post::Post>, SmileError> {
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
                let category = category
                    .iter()
                    .map(|e| Category {
                        id: e.id,
                        name: e.name,
                        parentId: e.parentId,
                    })
                    .collect::<Vec<Category>>();
                return crate::graphql::post::Post {
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
            .collect::<Vec<crate::graphql::post::Post>>();
        Ok(result)
    }
}
