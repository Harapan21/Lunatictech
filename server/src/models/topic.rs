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

#[derive(juniper::GraphQLInputObject, AsChangeset, Debug, Serialize, Deserialize, Insertable)]
#[table_name = "topic"]
pub struct TopicInput {
    name: String,
    icon: Option<String>,
}
