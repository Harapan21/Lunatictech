use super::handler::Handler;
use super::user::User;
use crate::errors::SmileError;
use crate::graphql::schema::Context;
use crate::schema::blog_info;
use async_std::task;
use diesel::{prelude::*, update};

#[derive(
    juniper::GraphQLObject,
    Debug,
    Queryable,
    AsChangeset,
    Identifiable,
    Serialize,
    Deserialize,
    PartialEq,
    Associations,
)]
#[primary_key(name)]
#[table_name = "blog_info"]
pub struct InfoSchema {
    pub name: String,
    pub description: String,
}

impl InfoSchema {
    pub fn get(conn: &MysqlConnection) -> Result<Self, SmileError> {
        blog_info::table.first::<InfoSchema>(conn).map_err(SmileError::from)
    }

    pub fn set(context: &Context, values: InfoSchema) -> Result<bool, SmileError> {
        let conn: &MysqlConnection = &context.conn;
        task::block_on(async {
            let user: Box<User> =
                User::find_by_id(&context.user_id.to_owned().unwrap(), conn).unwrap();
            return if user.isAdmin.unwrap() {
                update(blog_info::table)
                    .set(values)
                    .execute(conn)
                    .map(|_| true)
                    .map_err(SmileError::from)
            } else {
                Err(SmileError::Unauthorized)
            };
        })
    }
}
