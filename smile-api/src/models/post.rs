use super::user::User;
use crate::schema::post;
use chrono::prelude::*;
use diesel::prelude::*;

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
    id: i32,
    author_id: Option<String>,
    title: Option<String>,
    createdAt: NaiveDateTime,
    content: Option<String>,
    status: Option<StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
}

#[derive(
    juniper::GraphQLInputObject,
    Insertable,
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
    id: Option<i32>,
    title: Option<String>,
    content: Option<String>,
    author_id: Option<String>,
    status: Option<StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
}
