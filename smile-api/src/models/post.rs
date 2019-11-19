use super::user::User;
use super::*;
use crate::errors::SmileError;
use crate::schema::post;
use crate::schema::post::dsl::*;
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
    Clone,
    juniper::GraphQLObject,
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

#[derive(AsChangeset, Serialize, Deserialize, PartialEq, Debug, Clone)]
#[table_name = "post"]
pub struct PostField {
    id: Option<String>,
    title: Option<String>,
    content: Option<String>,
    status: Option<StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
}

// impl PostField {
// pub fn execute(context: &Context,connection: &MysqlConnection, input: &PostField) ->  Result<Self, SmileError>{

// }

#[derive(Serialize, Deserialize)]
pub struct PostList(pub Vec<Post>);

impl PostList {
    pub fn list(connection: &MysqlConnection) -> Self {
        let posts = post
            .limit(20)
            .load::<Post>(connection)
            .expect("Error loading products");
        PostList(posts)
    }
    pub fn by_author_id(user: &User, connection: &MysqlConnection) -> Result<PostList, SmileError> {
        Post::belonging_to(user)
            .load::<Post>(connection)
            .map(|posts| PostList(posts))
            .map_err(SmileError::from)
    }
    pub fn as_vec(&self) -> Vec<Post> {
        self.0.to_owned()
    }
}
