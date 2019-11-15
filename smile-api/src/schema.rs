table! {
    use diesel::sql_types::{Integer, Nullable,Char, Timestamp, Longtext, Varchar} ;
    use crate::models::post::Status;
    post (id) {
        id -> Integer,
        author_id -> Nullable<Char>,
        title -> Nullable<Varchar>,
        createdAt -> Timestamp,
        content -> Nullable<Longtext>,
        status -> Nullable<Status>,
        last_edited_at -> Nullable<Timestamp>,
        last_edited_by -> Nullable<Char>,
    }
}

table! {
    usr_smile (user_id) {
        user_id -> Char,
        username -> Varchar,
        email -> Nullable<Varchar>,
        joinAt -> Timestamp,
        lastEditedAt -> Nullable<Timestamp>,
        fullname -> Nullable<Varchar>,
        password -> Varchar,
        avatar -> Nullable<Varchar>,
        isAdmin -> Nullable<Bool>,
    }
}

joinable!(post -> usr_smile (author_id));

allow_tables_to_appear_in_same_query!(post, usr_smile,);
