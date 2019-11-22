table! {
    category (id) {
        id -> Integer,
        name -> Varchar,
        parentId -> Nullable<Integer>,
    }
}

table! {
    category_node (id) {
        id -> Integer,
        categoryId -> Integer,
        postId -> Integer,
    }
}

table! {
    use diesel::sql_types::*;
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

joinable!(category_node -> category (categoryId));
joinable!(category_node -> post (postId));
joinable!(post -> usr_smile (author_id));

allow_tables_to_appear_in_same_query!(category, category_node, post, usr_smile,);
