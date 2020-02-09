table! {
    blog_info (name) {
        name -> Varchar,
        description -> Varchar,
    }
}

table! {
    category (id) {
        id -> Integer,
        name -> Varchar,
        topicId -> Nullable<Integer>,
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
    comment (id) {
        id -> Integer,
        postId -> Integer,
        userId -> Nullable<Char>,
        createdAt -> Nullable<Timestamp>,
        content -> Nullable<Longtext>,
        reply_for_id -> Nullable<Integer>,
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
    page (id) {
        id -> Integer,
        name -> Varchar,
        icon -> Nullable<Varchar>,
        content -> Nullable<Longtext>,
    }
}

table! {
    post (id) {
        id -> Integer,
        author_id -> Nullable<Char>,
        title -> Nullable<Varchar>,
        createdAt -> Timestamp,
        content -> Nullable<Longtext>,
        status -> Enum,
        lastEditedAt -> Nullable<Timestamp>,
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
    topic (id) {
        id -> Integer,
        name -> Integer,
        pageId -> Nullable<Integer>,
        thumbnail -> Nullable<Varchar>,
    }
}

table! {
    topic_node (id) {
        id -> Integer,
        topicId -> Integer,
        postId -> Integer,
    }
}

table! {
    user (user_id) {
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
joinable!(comment -> user (userId));
joinable!(embed -> post (postId));
joinable!(post -> user (author_id));
joinable!(rating -> post (postId));
joinable!(topic -> page (pageId));
joinable!(topic_node -> post (postId));
joinable!(topic_node -> topic (topicId));

allow_tables_to_appear_in_same_query!(
    blog_info,
    category,
    category_node,
    comment,
    embed,
    page,
    post,
    rating,
    topic,
    topic_node,
    user,
);
