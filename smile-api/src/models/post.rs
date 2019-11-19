use super::user::User;
use super::*;
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
pub struct Posts {
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
    title: String,
    content: String,
    status: Option<StatusPost>,
    last_edited_at: NaiveDateTime,
    last_edited_by: String,
}

#[derive(Serialize, Deserialize)]
pub struct PostList(pub Vec<Posts>);
impl PostList {
    pub fn list(connection: &MysqlConnection) -> Self {
        let posts = post
            .limit(20)
            .load::<Posts>(connection)
            .expect("Error loading products");
        PostList(posts)
    }
    pub fn by_author_id(user: &User, connection: &MysqlConnection) -> Self {
        let posts = Posts::belonging_to(user)
            .load::<Posts>(connection)
            .expect("error laoding posts");
        PostList(posts)
    }
    pub fn as_vec(&self) -> Vec<Posts> {
        self.0.to_owned()
    }
}
