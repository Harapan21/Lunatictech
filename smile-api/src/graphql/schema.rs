use crate::db::MysqlPoolConnection;
use crate::errors::SmileError;
use crate::graphql::post::PostSchema;
use crate::graphql::user::UserSchema;
use crate::models::handler::Handler;
use crate::models::node::CategoryNode;
use crate::models::post::{Post, PostInput};
use crate::models::user::{User, UserInput};
use crate::utils::Auth;
use actix_identity::Identity;
use diesel::prelude::*;
use juniper::RootNode;
use std::sync::Arc;

pub struct Context {
    pub user_id: Option<String>,
    pub conn: Arc<MysqlPoolConnection>,
    pub id: Arc<Identity>,
}

impl juniper::Context for Context {}

pub struct Query;

#[juniper::object(Context = Context)]
impl Query {
    fn me(context: &Context) -> Result<Box<dyn UserSchema + 'static>, SmileError> {
        if let Some(aunt_id) = &context.user_id {
            return Ok(User::find_by_id(aunt_id, &context.conn)? as Box<dyn UserSchema>);
        }
        Err(SmileError::Unauthorized)
    }
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
        let login = User::login(username, password, &context.conn)?;
        if let Some(token) = &login.token {
            context.id.remember(token.to_owned());
        }
        Ok(login)
    }
    fn register(mut input: UserInput, context: &Context) -> Result<Auth, SmileError> {
        if User::input(input.clone(), &context.conn)? {
            let login = User::login(input.username, input.password, &context.conn)?;
            if let Some(token) = &login.token {
                context.id.remember(token.to_owned());
            }
            return Ok(login);
        }
        Ok(Default::default())
    }
    fn post(input: PostInput, categories: Vec<i32>, context: &Context) -> Result<bool, SmileError> {
        use crate::schema::post::dsl::*;
        let conn: &MysqlConnection = &context.conn;
        if Post::input(input, conn)? && !categories.is_empty() {
            let result = post.order(id.desc()).first::<Post>(conn)?;
            return CategoryNode::push_node(&context.conn, categories, result.id);
        }
        Ok(false)
    }
}

pub type Schema = RootNode<'static, Query, Mutation>;

pub fn create_context(
    user_id: Option<String>,
    mysql_pool: MysqlPoolConnection,
    id: Arc<Identity>,
) -> Context {
    Context {
        user_id,
        conn: Arc::new(mysql_pool),
        id,
    }
}

pub fn create_schema() -> Schema {
    Schema::new(Query {}, Mutation {})
}
