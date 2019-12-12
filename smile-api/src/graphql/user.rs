use super::node::Node;
use chrono::prelude::*;

#[derive(juniper::GraphQLObject, Serialize)]
pub struct User {
    pub user_id: String,
    pub username: String,
    pub email: Option<String>,
    pub joinAt: NaiveDateTime,
    pub lastEditedAt: Option<NaiveDateTime>,
    pub fullname: Option<String>,
    #[graphql(skip)]
    pub password: String,
    pub avatar: Option<String>,
    pub isAdmin: Option<bool>,
    pub node: dyn Node<String>,
}
