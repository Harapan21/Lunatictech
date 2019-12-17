use super::category::Category;
use super::post::Post;
use crate::errors::SmileError;
use crate::schema::category_node;
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
    categoryId: Option<i32>,
    postId: i32,
}

pub type Categories = Option<Vec<Option<i32>>>;

impl CategoryNode {
    pub fn push_node(
        conn: &MysqlConnection,
        categories: Categories,
        post_id: i32,
    ) -> Result<bool, SmileError> {
        use crate::schema::category_node::dsl::*;
        let values: Vec<CategoryNodeField> = categories
            .unwrap_or(vec![None])
            .into_iter()
            .map(|cat_id| CategoryNodeField {
                categoryId: cat_id,
                postId: post_id,
            })
            .collect::<Vec<CategoryNodeField>>();
        diesel::insert_into(category_node)
            .values(&values)
            .execute(conn)
            .map(|_| true)
            .map_err(SmileError::from)
    }

    pub fn get_by_postId(parentPost: &Post, connection: &MysqlConnection) -> Vec<Self> {
        let category_result: Vec<CategoryNode> = Self::belonging_to(parentPost)
            .load(connection)
            .expect("fialed to load category");
        category_result
    }

    pub fn get_by_categoryId(parentCategory: &Category, connection: &MysqlConnection) -> Vec<Self> {
        let post_result: Vec<CategoryNode> = Self::belonging_to(parentCategory)
            .load(connection)
            .expect("failed to load post");
        post_result
    }
}

#[derive(juniper::GraphQLObject, Debug)]
pub struct PostNode {
    pub user_id: String,
}
