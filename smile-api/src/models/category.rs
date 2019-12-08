use super::post::Post;
use crate::errors::SmileError;
use crate::schema::{category, category_node};
use diesel::prelude::*;

#[derive(Debug, Clone, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[table_name = "category"]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub parentId: Option<i32>,
}

#[derive(
    Debug,
    Clone,
    juniper::GraphQLInputObject,
    Queryable,
    Insertable,
    Serialize,
    Deserialize,
    PartialEq,
)]
#[table_name = "category"]
pub struct CategoryInput {
    pub name: String,
    pub parentId: Option<i32>,
}

#[derive(
    Insertable,
    Queryable,
    Associations,
    Identifiable,
    Debug,
    Clone,
    Serialize,
    Deserialize,
    PartialEq,
)]
#[belongs_to(Category, foreign_key = "categoryId")]
#[belongs_to(Post, foreign_key = "postId")]
#[table_name = "category_node"]
pub struct CategoryNode {
    id: i32,
    categoryId: Option<i32>,
    postId: i32,
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

    pub fn get_by_postId(parentPost: &Post, connection: &MysqlConnection) -> Vec<Category> {
        let category_result: Vec<Category> = Self::belonging_to(parentPost)
            .inner_join(category::table)
            .select(category::all_columns)
            .load(connection)
            .expect("fialed to load category");
        category_result
    }

    pub fn get_by_categoryId(parentCategory: &Category, connection: &MysqlConnection) -> Vec<Post> {
        use crate::schema::post;
        let post_result: Vec<Post> = Self::belonging_to(parentCategory)
            .inner_join(post::table)
            .select(post::all_columns)
            .load(connection)
            .expect("failed to load post");
        post_result
    }
}
