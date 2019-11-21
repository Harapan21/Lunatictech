use super::category::Category;
use super::post::{Post, PostField, PostList};
use super::user::{User, UserResolve};
use crate::db::MysqlPoolConnection;
use crate::errors::SmileError;
use diesel::prelude::*;
use juniper::{FieldResult, RootNode};
use std::sync::Arc;

pub struct Context {
    pub user_id: Option<String>,
    pub conn: Arc<MysqlPoolConnection>,
}

impl juniper::Context for Context {}

pub struct Query;

#[juniper::object(
  Context = Context,
)]

impl Query {
    fn me(context: &Context) -> Result<UserResolve, SmileError> {
        let conn: &MysqlConnection = &context.conn;
        if let Some(context_id) = &context.user_id {
            let user = User::find(&context_id, &conn);
            let posts = PostList::by_author_id(&user, conn)?.as_vec();
            return Ok(UserResolve::new(user, &posts));
        }
        Err(SmileError::Unauthorized)
    }

    fn post(context: &Context) -> FieldResult<Vec<Post>> {
        Ok(PostList::list(&context.conn).as_vec())
    }
}

pub struct Mutation;

#[juniper::object(
    Context = Context,
)]
impl Mutation {
    fn post(context: &Context, id: Option<i32>, input: PostField) -> Result<bool, SmileError> {
        if let Some(context_id) = &context.user_id {
            return input.execute(context, &id);
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
