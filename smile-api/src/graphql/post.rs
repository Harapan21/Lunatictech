use super::category::CategorySchema;
use crate::graphql::schema::Context;
use crate::models::node::CategoryNode;
use crate::models::post::{Post, StatusPost};
use chrono::prelude::*;
use diesel::prelude::*;

pub trait PostSchema {
    fn id(&self) -> &i32;
    fn author(&self) -> &Option<String>;
    fn title(&self) -> &Option<String>;
    fn createdAt(&self) -> &NaiveDateTime;
    fn content(&self) -> &Option<String>;
    fn status(&self) -> &Option<StatusPost>;
    fn last_edited_at(&self) -> &Option<NaiveDateTime>;
    fn last_edited_by(&self) -> &Option<String>;
    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>>;
}

impl PostSchema for Post {
    fn id(&self) -> &i32 {
        &self.id
    }
    fn author(&self) -> &Option<String> {
        &self.author_id
    }
    fn title(&self) -> &Option<String> {
        &self.title
    }
    fn createdAt(&self) -> &NaiveDateTime {
        &self.createdAt
    }
    fn content(&self) -> &Option<String> {
        &self.content
    }
    fn status(&self) -> &Option<StatusPost> {
        &self.status
    }
    fn last_edited_at(&self) -> &Option<NaiveDateTime> {
        &self.last_edited_at
    }
    fn last_edited_by(&self) -> &Option<String> {
        &self.last_edited_by
    }
    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>> {
        let conn: &MysqlConnection = &context.conn;
        let node = CategoryNode::get_by_postId(&self, conn)
            .into_iter()
            .map(|e| e as Box<dyn CategorySchema>)
            .collect();
        node
    }
}

#[juniper::object(Context=Context)]
impl Box<dyn PostSchema> {
    fn id(&self) -> &i32 {
        &self.id()
    }
    fn author(&self) -> &Option<String> {
        &self.author()
    }
    fn title(&self) -> &Option<String> {
        &self.title()
    }
    fn createdAt(&self) -> &NaiveDateTime {
        &self.createdAt()
    }
    fn content(&self) -> &Option<String> {
        &self.content()
    }
    fn status(&self) -> &Option<StatusPost> {
        &self.status()
    }
    fn last_edited_at(&self) -> &Option<NaiveDateTime> {
        &self.last_edited_at()
    }
    fn last_edited_by(&self) -> &Option<String> {
        &self.last_edited_by()
    }
    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>> {
        self.category(context)
    }
}
