use super::category::Category;
use crate::models::category::Categories;
use crate::models::post::StatusPost;
use chrono::prelude::*;

#[derive(juniper::GraphQLObject, Clone, Serialize, Deserialize, PartialEq, Debug)]
pub struct Post {
    id: i32,
    author_id: Option<String>,
    title: Option<String>,
    createdAt: NaiveDateTime,
    content: Option<String>,
    status: Option<crate::models::post::StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
    category: Vec<Category>,
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
