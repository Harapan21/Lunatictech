use crate::schema::blog_info;

#[derive(
    juniper::GraphQLObject,
    Debug,
    Queryable,
    AsChangeset,
    Identifiable,
    Serialize,
    Deserialize,
    PartialEq,
    Associations,
)]
#[primary_key(name)]
#[table_name = "blog_info"]
pub struct InfoSchema {
    name: Option<String>,
    description: Option<String>,
}
