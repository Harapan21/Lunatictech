use crate::graphql::post::Post;
use crate::graphql::schema::Context;
use crate::graphql::user::User;
use crate::models::category::Category;
use crate::models::node::{CategoryNode, PostNode};
use diesel::prelude::*;

pub trait Node {
    fn id(&self) -> &str;
    fn posts(&self, conn: &MysqlConnection) -> Option<Vec<Post>> {
        None
    }
    fn categories(&self, conn: &MysqlConnection) -> Option<Vec<Category>> {
        None
    }
    fn user(&self, conn: &MysqlConnection) -> Option<Vec<User>> {
        None
    }
}

impl Node for CategoryNode {
    fn id(&self) -> &str {
        String::from(self.id).as_str()
    }

    fn categories(&self, conn: &MysqlConnection) -> Option<Vec<Category>> {
        None
    }
}

impl Node for PostNode {
    fn id(&self) -> &str {
        self.user_id.as_str()
    }

    fn posts(&self, conn: &MysqlConnection) -> Option<Vec<Post>> {
        None
    }
}

juniper::graphql_interface!(<'a> &'a dyn Node: Context as "Node" |&self| {
    field id() -> &str{ self.id() }

    instance_resolvers: |&context| {
        &CategoryNode => self.categories(&context.conn),
        &PostNode => self.posts(&context.conn),
    }
});
