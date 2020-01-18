use super::user::User;
use crate::{
    errors::SmileError,
    models::{
        embed::{Embed, EmbedInput},
        node::CategoryNode,
    },
    schema::post,
};
// use async_std::task;
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

#[derive(Clone, Serialize, Deserialize, Identifiable, Queryable, PartialEq, Debug, Associations)]
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

impl Post {
    pub async fn push_mul(
        vec_category: Option<Vec<i32>>,
        embed_value: Option<EmbedInput>,
        connection: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        use crate::schema::post::dsl::*;
        let post_target = Box::new(post.order(id.desc()).first::<Post>(connection)?);
        let post_id = &post_target.id;
        let t2 = async move {
            match embed_value {
                Some(value) => {
                    Some(Embed::update(&post_id, value, connection).expect("failed load embed"))
                }
                None => None,
            }
        };
        let t1 =
            async move { CategoryNode::push_node(connection, vec_category, post_id.to_owned()) };
        let t3: Option<bool> = t2.await;
        if t1.await? && (t3.is_none() || t3 == Some(true)) { Ok(true) } else { Ok(false) }
    }
}
