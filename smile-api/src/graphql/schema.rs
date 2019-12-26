use crate::{
    db::MysqlPoolConnection,
    errors::SmileError,
    graphql::{category::CategorySchema, post::PostSchema, user::UserSchema},
    models::{
        category::{Category, CategoryInput},
        embed::EmbedInput,
        handler::Handler,
        post::{Post, PostInput},
        user::{User, UserInput},
    },
    utils::Auth,
};
use actix_identity::Identity;
use async_std::task;
use diesel::prelude::*;
use juniper::RootNode;
use std::sync::Arc;

pub struct Context {
    pub user_id: Option<String>,
    pub conn: Arc<MysqlPoolConnection>,
    pub id: Arc<Identity>,
}

#[derive(Debug, Serialize, Deserialize, DbEnum, PartialEq, Clone, juniper::GraphQLEnum)]
pub enum ActionOption {
    INPUT,
    UPDATE,
    REMOVE,
}

impl juniper::Context for Context {}

pub struct Query;

#[juniper::object(Context = Context)]
impl Query {
    fn me(context: &Context) -> Result<Box<dyn UserSchema + 'static>, SmileError> {
        match &context.user_id {
            Some(auth_id) => Ok(User::find_by_id(auth_id, &context.conn)? as Box<dyn UserSchema>),
            None => Err(SmileError::Unauthorized),
        }
    }
    fn post(context: &Context) -> Result<Vec<Box<dyn PostSchema + 'static>>, SmileError> {
        let post = Post::list(&context.conn)?;
        Ok(post.into_iter().map(|e| e as Box<dyn PostSchema>).collect())
    }
    fn category(context: &Context) -> Result<Vec<Box<dyn CategorySchema + 'static>>, SmileError> {
        Category::list(&context.conn)
            .map(|list| list.into_iter().map(|item| item as Box<dyn CategorySchema>).collect())
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

    fn logout(context: &Context) -> Result<Auth, SmileError> {
        context.id.forget();
        Ok(Default::default())
    }

    fn register(mut input: UserInput, context: &Context) -> Result<Auth, SmileError> {
        if User::input(input.clone(), &context.conn)? {
            let login =
                User::login(input.username.unwrap(), input.password.unwrap(), &context.conn)?;
            if let Some(token) = &login.token {
                context.id.remember(token.to_owned());
            }
            return Ok(login);
        }
        Ok(Default::default())
    }
    fn me(input: UserInput, context: &Context) -> Result<bool, SmileError> {
        match &context.user_id {
            Some(auth_id) => User::update(auth_id.to_owned(), input, &context.conn),
            None => Err(SmileError::Unauthorized),
        }
    }
    fn post(
        post_id: Option<i32>,
        mut input: PostInput,
        categories: Option<Vec<i32>>,
        embed: Option<EmbedInput>,
        context: &Context,
        action_option: ActionOption,
    ) -> Result<bool, SmileError> {
        let conn: &MysqlConnection = &context.conn;
        match &context.user_id {
            Some(aunt_id) => {
                input.author_id = Some(aunt_id.to_owned());
                match (action_option, post_id) {
                    (ActionOption::INPUT, _) => {
                        if Post::input(input, conn)? {
                            return task::block_on(Post::handler_input_node(
                                categories, embed, conn,
                            ));
                        }
                        Ok(false)
                    }
                    (ActionOption::UPDATE, Some(post_id)) => {
                        return Post::update(post_id, input, conn);
                    }
                    (ActionOption::REMOVE, Some(post_id)) => {
                        unimplemented!("not implimented yet ");
                    }
                    _ => unreachable!(),
                }
            }
            None => Err(SmileError::Unauthorized),
        }
    }
    fn category(input: CategoryInput, context: &Context) -> Result<bool, SmileError> {
        Category::input(input, &context.conn)
    }
}

pub type Schema = RootNode<'static, Query, Mutation>;

pub fn create_context(
    user_id: Option<String>,
    mysql_pool: MysqlPoolConnection,
    id: Arc<Identity>,
) -> Context {
    Context { user_id, conn: Arc::new(mysql_pool), id }
}

pub fn create_schema() -> Schema {
    Schema::new(Query {}, Mutation {})
}
