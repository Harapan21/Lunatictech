use crate::schema::topic;

#[derive(
    juniper::GraphQLObject,
    Debug,
    Queryable,
    Identifiable,
    Serialize,
    Deserialize,
    PartialEq,
    Insertable,
    Associations,
)]
#[table_name = "topic"]
pub struct Topic {
    id: i32,
    name: String,
    icon: Option<String>,
}
