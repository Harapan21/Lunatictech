use crate::schema::usr_smile;
use chrono::prelude::*;

#[derive(Debug, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[table_name = "usr_smile"]
#[primary_key(user_id)]
pub struct User {
    pub user_id:      String,
    pub username:     String,
    pub email:        Option<String>,
    pub joinAt:       NaiveDateTime,
    pub lastEditedAt: Option<NaiveDateTime>,
    pub fullname:     Option<String>,
    #[serde(skip)]
    pub password:     String,
    pub avatar:       Option<String>,
    pub isAdmin:      Option<bool>,
}
#[derive(
    Debug, juniper::GraphQLInputObject, Insertable, Serialize, Deserialize, PartialEq, Clone,
)]
#[table_name = "usr_smile"]
pub struct UserInput {
    #[serde(skip_deserializing)]
    pub user_id:  Option<String>,
    pub username: String,
    pub email:    Option<String>,
    pub fullname: String,
    pub password: String,
    pub avatar:   Option<String>,
    pub isAdmin:  Option<bool>,
}
