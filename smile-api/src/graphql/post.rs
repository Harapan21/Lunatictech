use super::category::CategorySchema;
use crate::{
    graphql::{schema::Context, user::UserSchema},
    models::{
        embed::Embed,
        handler::Handler,
        node::CategoryNode,
        post::{Post, StatusPost},
        user::User,
    },
};
use chrono::prelude::*;
use diesel::prelude::*;

pub trait PostSchema {
    fn id(&self) -> &i32;
    fn author(&self, context: &Context) -> Option<Box<dyn UserSchema>>;
    fn title(&self) -> &Option<String>;
    fn createdAt(&self) -> &NaiveDateTime;
    fn content(&self) -> &Option<String>;
    fn status(&self) -> &Option<StatusPost>;
    fn last_edited_at(&self) -> &Option<NaiveDateTime>;
    fn last_edited_by(&self) -> &Option<String>;
    fn embed(&self, context: &Context) -> Embed;
    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>>;
}
impl PostSchema for Post {
    fn id(&self) -> &i32 {
        &self.id
    }
    fn author(&self, context: &Context) -> Option<Box<dyn UserSchema>> {
        if let Some(user_id) = &self.author_id {
            return match User::find_by_id(user_id, &context.conn) {
                Ok(e) => Some(e),
                Err(_) => None,
            };
        }
        None
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
    fn embed(&self, context: &Context) -> Embed {
        let conn: &MysqlConnection = &context.conn;
        Embed::belonging_to(self).first::<Embed>(conn).expect("failed to load embd")
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

#[juniper::object(
    name="Post",
    Context=Context)]
impl Box<dyn PostSchema> {
    fn id(&self) -> &i32 {
        &self.id()
    }
    fn author(&self, context: &Context) -> Option<Box<dyn UserSchema>> {
        self.author(context)
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
    fn embed(&self, context: &Context) -> Embed {
        self.embed(context)
    }
    fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema + 'static>> {
        self.category(context)
    }
}
