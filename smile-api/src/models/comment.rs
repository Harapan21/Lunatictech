use crate::{
    errors::SmileError,
    models::{post::Post, user::User},
    schema::comment,
};
use chrono::prelude::*;
use diesel::{delete, insert_into, prelude::*, update as UpdateDiesel};

#[derive(Debug, Associations, Clone, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[belongs_to(Post, foreign_key = "postId")]
#[belongs_to(User, foreign_key = "userId")]
#[belongs_to(Comment, foreign_key = "reply_for_id")]
#[table_name = "comment"]
pub struct Comment {
    pub id: i32,
    pub postId: i32,
    pub userId: Option<String>,
    pub createdAt: Option<NaiveDateTime>,
    pub content: Option<String>,
    pub reply_for_id: Option<i32>,
}

#[derive(
    Debug,
    Clone,
    Insertable,
    Serialize,
    AsChangeset,
    Deserialize,
    PartialEq,
    juniper::GraphQLInputObject,
)]
#[table_name = "comment"]
pub struct CommentInput {
    pub postId: i32,
    pub userId: Option<String>,
    pub content: Option<String>,
    pub reply_for_id: Option<i32>,
}

impl Comment {
    pub fn input(input: CommentInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        insert_into(comment::table)
            .values(input)
            .execute(connection)
            .map(|_| true)
            .map_err(SmileError::from)
    }
    pub fn update(
        input: CommentInput,
        commentId: i32,
        connection: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        use crate::schema::comment::dsl::*;
        let result = UpdateDiesel(
            comment
                .filter(id.eq(commentId))
                .filter(postId.eq(&input.postId))
                .filter(userId.eq(&input.userId)),
        )
        .set(content.eq(&input.content))
        .execute(connection)
        .map_err(SmileError::from)?;
        return if result == 0 { Err(SmileError::AccessDenied) } else { Ok(true) };
    }
    pub fn delete(
        user_id: &String,
        commentId: i32,
        connection: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        use crate::schema::comment::dsl::*;
        delete(comment.filter(id.eq(commentId)).filter(userId.eq(user_id)))
            .execute(connection)
            .map(|_| true)
            .map_err(SmileError::from)
    }
}
