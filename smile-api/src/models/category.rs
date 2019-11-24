use super::post::{Post, PostResolve};
use crate::errors::SmileError;
use crate::schema::{category, category_node};
use diesel::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, juniper::GraphQLObject)]
pub struct CategoryResolve {
    pub id: i32,
    pub name: String,
    posts: Vec<PostResolve>,
}

#[derive(Debug, Clone, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[table_name = "category"]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub parentId: Option<i32>,
}

impl Category {
    pub(self) fn convert_to_resolve(vec_cat: Vec<Category>) -> Vec<CategoryResolve> {
        vec_cat
            .into_iter()
            .map(|cat| CategoryResolve {
                id: cat.id.into(),
                name: cat.name.into(),
                posts: Vec::new(),
            })
            .collect::<Vec<CategoryResolve>>()
    }
    pub fn list(connection: &MysqlConnection) -> Result<Vec<CategoryResolve>, SmileError> {
        use crate::schema::category::dsl::*;
        let vec_cat = category.load::<Category>(connection)?;
        let result = Self::convert_to_resolve(vec_cat);
        // let category_node = CategoryNode::belongs_to(&category).inner_join(post).load::<CategoryNode>(&connection),map_err(SmileError::from);
        Ok(result)
    }
    pub fn get_by_id(&self, connection: &MysqlConnection, input_id: i32) -> Self {
        use crate::schema::category::dsl::*;
        let cat = category
            .find(&input_id)
            .first::<Category>(connection)
            .expect("Error loading category");
        cat
    }
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
            .unwrap_or(vec![Some(0)])
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
    pub fn get_by_postId(parentPost: &Post, connection: &MysqlConnection) /* -> Vec<CategoryResolve>  */
    {
        let get_node = Self::belonging_to(parentPost).load::<CategoryNode>(connection);
        println!("{:?}", get_node);
        // Category::convert_to_resolve(Category {
        //     id: get_node.id.to_owned(),
        //     name: get_node.name.to_owned(),
        //     parentId: get_node.parentId.to_owned(),
        // })
    }
}
