use super::user::User;
use crate::schema::post;
use chrono::prelude::*;

#[derive(Debug, Serialize, Deserialize, DbEnum, PartialEq, Clone)]
#[DieselType = "Status"]
#[derive(juniper::GraphQLEnum)]
pub enum StatusPost {
    #[db_rename = "publish"]
    Publish,
    #[db_rename = "draft"]
    Draft,
    #[db_rename = "hide"]
    Hide,
}

#[derive(
    juniper::GraphQLObject,
    Clone,
    Serialize,
    Deserialize,
    Identifiable,
    Queryable,
    PartialEq,
    Debug,
    Associations,
)]
#[belongs_to(User, foreign_key = "author_id")]
#[table_name = "post"]
pub struct Post {
    pub id: i32,
    pub author_id: Option<String>,
    pub title: Option<String>,
    pub createdAt: NaiveDateTime,
    pub content: Option<String>,
    pub status: Option<StatusPost>,
    pub last_edited_at: Option<NaiveDateTime>,
    pub last_edited_by: Option<String>,
}

#[derive(
    juniper::GraphQLInputObject,
    Insertable,
    Identifiable,
    AsChangeset,
    Serialize,
    Deserialize,
    PartialEq,
    Debug,
    Clone,
)]
#[table_name = "post"]
pub struct PostInput {
    #[serde(skip)]
    pub id: Option<i32>,
    pub title: Option<String>,
    pub content: Option<String>,
    pub author_id: Option<String>,
    pub status: Option<StatusPost>,
    pub last_edited_at: Option<NaiveDateTime>,
    pub last_edited_by: Option<String>,
}
