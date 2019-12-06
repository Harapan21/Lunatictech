use crate::models::post::Post;
use chrono::prelude::*;

#[derive(juniper::GraphQLObject, Debug, Clone, Serialize, PartialEq)]
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
    pub posts: Vec<Post>,
}
