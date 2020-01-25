use crate::schema::topic;

#[derive(
    juniper::GraphQLObject,
    Debug,
    Queryable,
    Identifiable,
    Serialize,
    Deserialize,
    PartialEq,
    Associations,
)]
#[table_name = "topic"]
pub struct Topic {
    id: i32,
    name: String,
    icon: Option<String>,
}
