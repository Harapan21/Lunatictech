use crate::{models::post::Post, schema::embed};

#[derive(
    juniper::GraphQLObject,
    Debug,
    Queryable,
    Identifiable,
    Serialize,
    Deserialize,
    PartialEq,
    Associations,
)]
#[belongs_to(Post, foreign_key = "postId")]
#[table_name = "embed"]
pub struct Embed {
    pub id: i32,
    #[graphql(skip)]
    pub postId: i32,
    pub thumbnail: Option<String>,
    pub video: Option<String>,
}

#[derive(
    Debug, juniper::GraphQLInputObject, AsChangeset, Serialize, Deserialize, PartialEq, Clone,
)]
#[table_name = "embed"]
pub struct EmbedInput {
    pub thumbnail: Option<String>,
    pub video: Option<String>,
}
