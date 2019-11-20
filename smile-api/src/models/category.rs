use super::post::{Post, PostList};
use crate::errors::SmileError;
use crate::schema::category::dsl::*;
#[allow(unused_imports)]
use crate::schema::category_node::dsl::*;
use crate::schema::{category, category_node};
use diesel::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, juniper::GraphQLObject)]
pub struct CategoryResolve {
    pub id: i32,
    pub name: String,
    posts: Vec<Post>,
}

impl CategoryResolve {}

#[derive(Debug, Clone, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[table_name = "category"]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub parentId: Option<i32>,
}

impl Category {
    pub fn list(connection: &MysqlConnection) -> Result<Vec<Self>, SmileError> {
        category
            .load::<Category>(connection)
            .map_err(SmileError::from)
    }
    pub fn get_by_id(&self, connection: &MysqlConnection, input_id: i32) -> Self {
        let cat = category
            .find(&input_id)
            .first::<Category>(connection)
            .expect("Error loading category");
        cat
    }
}

#[derive(Queryable, Associations, Identifiable, Debug, Clone, Serialize, Deserialize, PartialEq)]
#[belongs_to(Category, foreign_key = "categoryId")]
#[belongs_to(Post, foreign_key = "postId")]
#[table_name = "category_node"]
pub struct CategoryNode {
    id: i32,
    categoryId: Option<i32>,
    postId: i32,
}
