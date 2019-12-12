use crate::graphql::post::Post;
use crate::graphql::schema::Context;
use crate::graphql::user::User;
use crate::models::category::Category;
use crate::models::node::{CategoryNode, PostNode};
use diesel::prelude::*;

pub trait Node<T> {
    fn id(&self) -> T;
    fn posts(&self, conn: &MysqlConnection) -> Option<Vec<Box<Post>>> {
        None
    }
    fn categories(&self, conn: &MysqlConnection) -> Option<Vec<Box<Category>>> {
        None
    }
    fn user(&self, conn: &MysqlConnection) -> Option<Vec<Box<User>>> {
        None
    }
}

impl Node<i32> for CategoryNode {
    fn id(&self) -> i32 {
        self.id
    }

    fn categories(&self, conn: &MysqlConnection) -> Option<Vec<Box<Category>>> {
        None
    }
}

impl Node<String> for PostNode {
    fn id(&self) -> String {
        self.user_id
    }

    fn posts(&self, conn: &MysqlConnection) -> Option<Vec<Box<Post>>> {
        None
    }
}

juniper::graphql_interface!(<'a, T> &'a dyn Node<T>: Context as "Node" |&self| {
    field id() -> T { self.id() }

    instance_resolvers: |&context| {
        &CategoryNode => self.categories(&context.conn),
        &PostNode => self.posts(&context.conn),
    }
});
