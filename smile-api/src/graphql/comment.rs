use super::{schema::Context, user::UserSchema};
use crate::{
    errors::SmileError,
    models::{comment::Comment, handler::Handler, user::User},
};
use chrono::prelude::*;
use diesel::prelude::*;

pub trait CommentSchema {
    fn id(&self) -> &i32;
    fn content(&self) -> &Option<String>;
    fn createdAt(&self) -> &Option<NaiveDateTime>;
    fn author(
        &self,
        connection: &MysqlConnection,
    ) -> Result<Option<Box<dyn UserSchema>>, SmileError>;
    fn reply(
        &self,
        connection: &MysqlConnection,
    ) -> Result<Vec<Box<dyn CommentSchema>>, SmileError>;
}

impl CommentSchema for Comment {
    fn id(&self) -> &i32 {
        &self.id
    }

    fn content(&self) -> &Option<String> {
        &self.content
    }

    fn createdAt(&self) -> &Option<NaiveDateTime> {
        &self.createdAt
    }

    fn author(
        &self,
        connection: &MysqlConnection,
    ) -> Result<Option<Box<dyn UserSchema>>, SmileError> {
        if let Some(userId) = &self.userId {
            return Ok(Some(
                User::find_by_id(userId, connection).map(|e| e as Box<dyn UserSchema>)?,
            ));
        }
        Ok(None)
    }

    fn reply(
        &self,
        connection: &MysqlConnection,
    ) -> Result<Vec<Box<dyn CommentSchema>>, SmileError> {
        Comment::belonging_to(self)
            .load::<Comment>(connection)
            .map_err(SmileError::from)
            .map(|e| e.into_iter().map(Box::from).map(|e| e as Box<dyn CommentSchema>).collect())
    }
}

#[juniper::object(
name="Comment",
Context=Context)]
impl Box<dyn CommentSchema> {
    fn id(&self) -> &i32 {
        &self.id()
    }

    fn content(&self) -> &Option<String> {
        &self.content()
    }

    fn createdAt(&self) -> &Option<NaiveDateTime> {
        &self.createdAt()
    }
    fn author(&self, context: &Context) -> Result<Option<Box<dyn UserSchema>>, SmileError> {
        self.author(&context.conn)
    }
    fn reply(
        &self,
        context: &Context,
    ) -> Result<Vec<Box<dyn CommentSchema + 'static>>, SmileError> {
        self.reply(&context.conn)
    }
}
