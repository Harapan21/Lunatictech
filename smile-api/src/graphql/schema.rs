use crate::db::MysqlPoolConnection;
use crate::errors::SmileError;
use crate::models::handler::Handler;
use crate::models::post::{Post, PostInput};
use crate::models::user::User;
use diesel::prelude::*;
use juniper::RootNode;
use std::sync::Arc;

pub struct Context {
    pub user_id: Option<String>,
    pub conn: Arc<MysqlPoolConnection>,
}

impl juniper::Context for Context {}

pub struct Query;

#[juniper::object( Context = Context,
)]
impl Query {
    fn me(context: &Context) -> Result<super::user::User, SmileError> {
        let conn: &MysqlConnection = &context.conn;
        if let Some(context_id) = &context.user_id {
            let user = User::find_by_id(&context_id, &conn)?;
            let posts = Post::belonging_to(user.as_ref()).load::<Post>(conn)?;
            return Ok(super::user::User {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                joinAt: user.joinAt,
                lastEditedAt: user.lastEditedAt,
                fullname: user.fullname,
                password: user.password,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                posts,
            });
        }
        Err(SmileError::Unauthorized)
    }

    fn post(context: &Context) -> Result<Vec<Box<Post>>, SmileError> {
        Post::list(&context.conn)
    }
}

pub struct Mutation;

#[juniper::object(
    Context = Context,
)]
impl Mutation {
    fn post(context: &Context, id: Option<i32>, mut input: PostInput) -> Result<bool, SmileError> {
        if let Some(context_id) = &context.user_id {
            input.author_id = Some(context_id.to_owned());
            return Post::input(input, &context.conn);
        }
        Err(SmileError::Unauthorized)
    }
}

pub type Schema = RootNode<'static, Query, Mutation>;

pub fn create_context(logged_user_id: Option<String>, mysql_pool: MysqlPoolConnection) -> Context {
    Context {
        user_id: logged_user_id,
        conn: Arc::new(mysql_pool),
    }
}

pub fn create_schema() -> Schema {
    Schema::new(Query {}, Mutation {})
}
