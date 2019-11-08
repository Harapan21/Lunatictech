use diesel::sql_types::{Bool, Timestamp};

#[derive(Queryable)]
pub struct User {
    pub user_id: String,
    pub username: String,
    pub email: String,
    pub jointAt: Timestamp,
    pub lastEditedAt: Timestamp,
    pub fullname: String,
    pub avatar: String,
    pub password: String,
    pub isAdmin: Bool,
}
