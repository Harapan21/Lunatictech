use super::topic::Topic;
use crate::schema::category;

#[derive(Debug, Clone, Associations, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[belongs_to(Topic, foreign_key = "topicId")]
#[table_name = "category"]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub topicId: Option<i32>,
}

#[derive(
    juniper::GraphQLInputObject,
    Debug,
    Clone,
    Queryable,
    Insertable,
    Serialize,
    AsChangeset,
    Deserialize,
    PartialEq,
)]
#[table_name = "category"]
pub struct CategoryInput {
    pub name: String,
    pub topicId: Option<i32>,
}
