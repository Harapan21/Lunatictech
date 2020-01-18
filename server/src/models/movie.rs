use crate::schema::movie;

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
#[table_name = "movie"]
pub struct Movie {
    id: i32,
    name: String,
    thumbnail: Option<String>,
}

#[derive(AsChangeset, Insertable)]
#[table_name = "movie"]
pub struct MovieInput {
    pub name: String,
    pub thumbnail: Option<String>,
}
