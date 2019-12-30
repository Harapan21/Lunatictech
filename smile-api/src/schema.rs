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
        categoryId -> Nullable<Integer>,
        postId -> Integer,
    }
}

table! {
    comment (id) {
        id -> Integer,
        postId -> Integer,
        userId -> Nullable<Char>,
        createdAt -> Nullable<Timestamp>,
        content -> Nullable<Longtext>,
        reply -> Bool,
        reply_for_id -> Nullable<Integer>,
    }
}

table! {
    use crate::models::post::Status;
    use diesel::sql_types::*;
    contrib_post_temp (id) {
        id -> Integer,
        postId -> Integer,
        title -> Varchar,
        content -> Nullable<Longtext>,
        status -> Nullable<Status>,
        accepted -> Nullable<Bool>,
        createdAt -> Timestamp,
        updateAt -> Timestamp,
        author_id -> Char,
    }
}

table! {
    embed (id) {
        id -> Integer,
        postId -> Integer,
        thumbnail -> Nullable<Varchar>,
        video -> Nullable<Longtext>,
    }
}

table! {
    use crate::models::post::Status;
    use diesel::sql_types::*;
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
    rating (id) {
        id -> Integer,
        postId -> Integer,
        view -> Integer,
        share -> Integer,
        comment -> Integer,
        video_rate -> Nullable<Integer>,
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
joinable!(comment -> post (postId));
joinable!(comment -> usr_smile (userId));
joinable!(contrib_post_temp -> post (postId));
joinable!(embed -> post (postId));
joinable!(post -> usr_smile (author_id));
joinable!(rating -> post (postId));

allow_tables_to_appear_in_same_query!(
    category,
    category_node,
    comment,
    contrib_post_temp,
    embed,
    post,
    rating,
    usr_smile,
);
