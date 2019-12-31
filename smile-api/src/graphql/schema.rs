use crate::{
    db::MysqlPoolConnection,
    errors::SmileError,
    graphql::{category::CategorySchema, post::PostSchema, user::UserSchema},
    models::{
        category::{Category, CategoryInput},
        comment::{Comment, CommentInput},
        embed::{Embed, EmbedInput},
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
        mut input: Option<PostInput>,
        categories: Option<Vec<i32>>,
        embed: Option<EmbedInput>,
        context: &Context,
        action: ActionOption,
    ) -> Result<bool, SmileError> {
        let conn: &MysqlConnection = &context.conn;
        match &context.user_id {
            Some(aunt_id) => match (action, post_id, input.clone()) {
                (ActionOption::INPUT, _, Some(mut input)) => {
                    input.author_id = Some(aunt_id.to_owned());
                    if Post::input(input, conn)? {
                        return task::block_on(Post::push_mul(categories, embed, conn));
                    }
                    Ok(false)
                }
                (ActionOption::UPDATE, Some(post_id), _) => {
                    if let Some(embed_value) = embed {
                        Embed::update(&post_id, embed_value, conn)?;
                    }
                    if let Some(mut input) = input {
                        input.author_id = Some(aunt_id.to_owned());
                        Post::update(post_id, input, conn)?;
                    }
                    Ok(true)
                }
                (ActionOption::REMOVE, Some(post_id), None) => {
                    let is_author = async {
                        let result_post = Post::find_by_id(&post_id, conn).unwrap();
                        result_post.author_id == Some(aunt_id.to_owned())
                    };
                    task::block_on(async move {
                        if is_author.await {
                            Post::remove(post_id, conn)
                        } else {
                            Err(SmileError::AccessDenied)
                        }
                    })
                }
                _ => unreachable!(),
            },
            None => Err(SmileError::Unauthorized),
        }
    }
    fn category(
        id: Option<i32>,
        input: CategoryInput,
        context: &Context,
        action: ActionOption,
    ) -> Result<bool, SmileError> {
        match (action, id) {
            (ActionOption::INPUT, None) => Category::input(input, &context.conn),
            (ActionOption::UPDATE, Some(id)) => Category::update(id, input, &context.conn),
            _ => unreachable!(),
        }
    }
    fn comment(
        commentId: Option<i32>,
        mut input: CommentInput,
        context: &Context,
        action: ActionOption,
    ) -> Result<bool, SmileError> {
        return match (action, &context.user_id, commentId) {
            (_, None, _) => Err(SmileError::Unauthorized),
            (ActionOption::INPUT, Some(user_id), _) => {
                input.userId = Some(user_id.to_owned());
                Comment::input(input, &context.conn)
            }
            (ActionOption::UPDATE, Some(user_id), Some(commentId)) => {
                input.userId = Some(user_id.to_owned());
                Comment::update(input, commentId, &context.conn)
            }
            (ActionOption::REMOVE, Some(user_id), Some(commentId)) => {
                Comment::delete(user_id, commentId, &context.conn)
            }
            _ => unreachable!(),
        };
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
