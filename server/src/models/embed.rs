use crate::{
    errors::SmileError,
    models::{game::Game, movie::Movie, post::Post},
    schema::{embed, embed::dsl::*, rating},
};
use diesel::{prelude::*, update as Update};

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
#[belongs_to(Game, foreign_key = "game")]
#[belongs_to(Movie, foreign_key = "movie")]
#[table_name = "embed"]
pub struct Embed {
    pub id: i32,
    #[graphql(skip)]
    pub postId: i32,
    pub thumbnail: Option<String>,
    pub video: Option<String>,
    pub game: Option<i32>,
    pub movie: Option<i32>,
}

#[derive(
    Debug, juniper::GraphQLInputObject, AsChangeset, Serialize, Deserialize, PartialEq, Clone,
)]
#[table_name = "embed"]
pub struct EmbedInput {
    pub thumbnail: Option<String>,
    pub video: Option<String>,
    pub game: Option<i32>,
    pub movie: Option<i32>,
}

#[derive(
    juniper::GraphQLObject,
    Debug,
    Queryable,
    Identifiable,
    Serialize,
    Deserialize,
    PartialEq,
    AsChangeset,
    Associations,
)]
#[belongs_to(Post, foreign_key = "postId")]
#[table_name = "rating"]
pub struct Rating {
    pub id: i32,
    #[graphql(skip)]
    pub postId: i32,
    pub view: i32,
    pub share: i32,
    pub comment: i32,
    pub video_rate: Option<i32>,
}

impl Embed {
    pub fn update(
        post_id: &i32,
        input: EmbedInput,
        conn: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        Update(embed.filter(postId.eq(post_id)))
            .set(input)
            .execute(conn)
            .map(|_| true)
            .map_err(SmileError::from)
    }
}
