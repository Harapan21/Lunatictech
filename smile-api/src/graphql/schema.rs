use crate::graphql::post::PostSchema;
// use super::post::PostInput;
use crate::db::MysqlPoolConnection;
use crate::errors::SmileError;
use crate::models::handler::Handler;
// use crate::models::node::PostNode;
use crate::models::post::Post;
use crate::models::user::{User, UserInput};
use crate::utils::Auth;
// use diesel::prelude::*;
use juniper::RootNode;
use std::sync::Arc;

pub struct Context {
    pub user_id: Option<String>,
    pub conn: Arc<MysqlPoolConnection>,
}

impl juniper::Context for Context {}

pub struct Query;

#[juniper::object(Context = Context)]
impl Query {
    fn post(context: &Context) -> Result<Vec<Box<dyn PostSchema + 'static>>, SmileError> {
        let post = Post::list(&context.conn)?;
        Ok(post.into_iter().map(|e| e as Box<dyn PostSchema>).collect())
    }
}

pub struct Mutation;

#[juniper::object(
    Context = Context,
)]
impl Mutation {
    fn login(username: String, password: String, context: &Context) -> Result<Auth, SmileError> {
        User::login(username, password, &context.conn)
    }
}

pub type Schema = RootNode<'static, Query, Mutation>;

pub fn create_context(user_id: Option<String>, mysql_pool: MysqlPoolConnection) -> Context {
    Context {
        user_id,
        conn: Arc::new(mysql_pool),
    }
}

pub fn create_schema() -> Schema {
    Schema::new(Query {}, Mutation {})
}
