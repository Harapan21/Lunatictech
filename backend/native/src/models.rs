use crate::*;
use schema::usr_smile;
#[derive(Serialize, Queryable, PartialEq)]
pub struct User {
    pub user_id: String,
    pub username: String,
    pub email: String,
    pub jointAt: NaiveDateTime,
    pub lastEditedAt: NaiveDateTime,
    pub fullname: String,
    pub avatar: String,
    pub password: String,
    pub isAdmin: bool,
}

#[derive(Insertable)]
#[table_name = "usr_smile"]
pub struct LoginField<'a> {
    username: &'a str,
    password: &'a str,
}

#[derive(Insertable)]
#[table_name = "usr_smile"]
pub struct UserField<'a> {
    pub user_id: &'a str,
    pub username: &'a str,
    pub email: &'a str,
    pub fullname: &'a str,,
    pub avatar: &'a str,
    pub password: String,
    pub isAdmin: bool,
}
