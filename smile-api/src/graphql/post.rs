use crate::graphql::category::Category;
use crate::models::node::Categories;
use crate::models::post::StatusPost;
use chrono::prelude::*;

#[derive(juniper::GraphQLObject, Clone, Serialize, Deserialize, PartialEq, Debug)]
pub struct Post {
    pub id: i32,
    pub author_id: Option<String>,
    pub title: Option<String>,
    pub createdAt: NaiveDateTime,
    pub content: Option<String>,
    pub status: Option<StatusPost>,
    pub last_edited_at: Option<NaiveDateTime>,
    pub last_edited_by: Option<String>,
    pub category: Vec<Category>,
}

#[derive(juniper::GraphQLInputObject, Serialize, Deserialize, PartialEq, Debug, Clone)]
pub struct PostInput {
    pub id: Option<i32>,
    pub title: Option<String>,
    pub content: Option<String>,
    pub author_id: Option<String>,
    pub status: Option<StatusPost>,
    pub last_edited_at: Option<NaiveDateTime>,
    pub last_edited_by: Option<String>,
    pub category: Categories,
}
