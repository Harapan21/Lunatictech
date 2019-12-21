use super::post::PostSchema;
use super::schema::Context;
use crate::models::post::Post;
use crate::models::user::User;
use chrono::prelude::*;

pub trait UserSchema {
    fn id(&self) -> &str;
    fn username(&self) -> &str;
    fn email(&self) -> &Option<String>;
    fn joinAt(&self) -> &NaiveDateTime;
    fn lastEditedAt(&self) -> &Option<NaiveDateTime>;
    fn fullname(&self) -> &Option<String>;
    fn avatar(&self) -> &Option<String>;
    fn isAdmin(&self) -> &Option<bool>;
    fn post(&self, context: &Context) -> Vec<Box<dyn PostSchema>>;
}

impl UserSchema for User {
    fn id(&self) -> &str {
        &self.user_id.as_str()
    }
    fn username(&self) -> &str {
        &self.username
    }
    fn email(&self) -> &Option<String> {
        &self.email
    }
    fn joinAt(&self) -> &NaiveDateTime {
        &self.joinAt
    }
    fn lastEditedAt(&self) -> &Option<NaiveDateTime> {
        &self.lastEditedAt
    }
    fn fullname(&self) -> &Option<String> {
        &self.fullname
    }
    fn avatar(&self) -> &Option<String> {
        &self.avatar
    }
    fn isAdmin(&self) -> &Option<bool> {
        &self.isAdmin
    }
    fn post(&self, context: &Context) -> Vec<Box<dyn PostSchema>> {
        use diesel::prelude::*;
        let conn: &MysqlConnection = &context.conn;
        let post_result: Vec<Box<dyn PostSchema>> = Post::belonging_to(self)
            .load(conn)
            .map(|e: Vec<Post>| {
                e.into_iter()
                    .map(Box::from)
                    .map(|e| e as Box<dyn PostSchema>)
                    .collect()
            })
            .expect("failed to laod post");
        post_result
    }
}

#[juniper::object(
    name="User",
    Context=Context)]
impl Box<dyn UserSchema> {
    fn id(&self) -> &str {
        &self.id()
    }
    fn username(&self) -> &str {
        &self.username()
    }
    fn email(&self) -> &Option<String> {
        &self.email()
    }
    fn joinAt(&self) -> &NaiveDateTime {
        &self.joinAt()
    }
    fn lastEditedAt(&self) -> &Option<NaiveDateTime> {
        &self.lastEditedAt()
    }
    fn fullname(&self) -> &Option<String> {
        &self.fullname()
    }
    fn avatar(&self) -> &Option<String> {
        &self.avatar()
    }
    fn isAdmin(&self) -> &Option<bool> {
        &self.isAdmin()
    }
    fn post(&self, context: &Context) -> Vec<Box<dyn PostSchema + 'static>> {
        self.post(context)
    }
}
