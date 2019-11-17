use super::user::User;
use crate::db::MysqlPoolConnection;
use crate::schema::usr_smile::dsl::*;
use diesel::prelude::*;
use juniper::{FieldResult, RootNode};
use std::sync::Arc;

pub struct Context {
    pub user_id: String,
    pub conn: Arc<MysqlPoolConnection>,
}
impl juniper::Context for Context {}

pub struct Query;

#[juniper::object(
    Context = Context,
)]
impl Query {
    fn me(context: &Context) -> FieldResult<User> {
        println!("{}", &context.user_id);
        let conn: &MysqlConnection = &context.conn;
        let user = usr_smile
            .filter(user_id.eq(&context.user_id))
            .first::<User>(conn)?;
        Ok(user)
    }
}

pub struct Mutation;

#[juniper::object(
    Context = Context,
)]
impl Mutation {}

pub type Schema = RootNode<'static, Query, Mutation>;

pub fn create_context(logged_user_id: String, mysql_pool: MysqlPoolConnection) -> Context {
    Context {
        user_id: logged_user_id,
        conn: Arc::new(mysql_pool),
    }
}

pub fn create_schema() -> Schema {
    Schema::new(Query {}, Mutation {})
}
