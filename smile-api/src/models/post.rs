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
use diesel::{prelude::*, update};

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
    pub async fn handler_input_node(
        vec_category: Option<Vec<i32>>,
        embed_value: Option<EmbedInput>,
        connection: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        let result_cat = Self::push_cat_node(vec_category, connection);
        let result_embed: Option<bool> = match embed_value {
            Some(value) => Some(Self::push_embed_node(value, connection).await?),
            None => None,
        };
        if result_cat.await? && (result_embed.is_none() || result_embed == Some(true)) {
            Ok(true)
        } else {
            Ok(false)
        }
    }
    pub(self) async fn push_cat_node(
        categories: Option<Vec<i32>>,
        conn: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        use crate::schema::post::dsl::*;
        let result = post.order(id.desc()).first::<Post>(conn)?;
        return CategoryNode::push_node(conn, categories, result.id);
    }

    pub(self) async fn push_embed_node(
        embed_input: EmbedInput,
        conn: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        use crate::schema::embed::dsl::*;
        let result = embed.order(id.desc()).first::<Embed>(conn)?;
        return update(embed.find(result.id))
            .set(embed_input)
            .execute(conn)
            .map(|_| true)
            .map_err(SmileError::from);
    }
}
