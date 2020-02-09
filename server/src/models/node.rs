use super::page::Page;
use super::topic::Topic;
use crate::{
    errors::SmileError,
    models::{category::Category, post::Post},
    schema::{category, category_node, page_and_topic, post},
};
use diesel::prelude::*;

#[derive(
    juniper::GraphQLObject,
    Insertable,
    Queryable,
    Associations,
    Identifiable,
    Serialize,
    Debug,
    Deserialize,
    PartialEq,
)]
#[belongs_to(Category, foreign_key = "categoryId")]
#[belongs_to(Post, foreign_key = "postId")]
#[table_name = "category_node"]
pub struct CategoryNode {
    pub id: i32,
    pub categoryId: Option<i32>,
    pub postId: i32,
}

#[derive(Insertable, Debug, Clone, Serialize, Deserialize, PartialEq)]
#[table_name = "category_node"]
pub struct CategoryNodeField {
    categoryId: i32,
    postId: i32,
}

impl CategoryNode {
    pub fn push_node(
        conn: &MysqlConnection,
        categories: Option<Vec<i32>>,
        postId: i32,
    ) -> Result<bool, SmileError> {
        use crate::schema::category_node::dsl::category_node;
        let values: Vec<CategoryNodeField> = categories
            .unwrap_or(vec![1])
            .into_iter()
            .map(|categoryId| CategoryNodeField { categoryId, postId })
            .collect::<Vec<CategoryNodeField>>();
        diesel::insert_into(category_node)
            .values(&values)
            .execute(conn)
            .map(|_| true)
            .map_err(SmileError::from)
    }

    pub fn get_by_postId(parentPost: &Post, connection: &MysqlConnection) -> Vec<Box<Category>> {
        let category_result: Vec<Category> = Self::belonging_to(parentPost)
            .inner_join(category::table)
            .select(category::all_columns)
            .load(connection)
            .expect("fialed to load category");
        category_result.into_iter().map(Box::from).collect()
    }

    pub fn get_by_categoryId(
        parentCategory: &Category,
        connection: &MysqlConnection,
    ) -> Vec<Box<Post>> {
        let post_result: Vec<Post> = Self::belonging_to(parentCategory)
            .inner_join(post::table)
            .select(post::all_columns)
            .load(connection)
            .expect("failed to load post");
        post_result.into_iter().map(Box::from).collect()
    }
}

#[derive(juniper::GraphQLObject, Debug, Serialize)]
pub struct PostNode {
    pub user_id: String,
}

#[derive(
    juniper::GraphQLObject,
    Insertable,
    Queryable,
    Associations,
    Identifiable,
    Serialize,
    Debug,
    Deserialize,
    PartialEq,
)]
#[belongs_to(Topic, foreign_key = "topicId")]
#[belongs_to(Page, foreign_key = "pageId")]
#[table_name = "page_and_topic"]
pub struct PageNode {
    id: i32,
    topicId: i32,
    pageId: i32,
}
