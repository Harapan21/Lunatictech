use crate::schema::game;

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
#[table_name = "game"]
pub struct Game {
    pub id: i32,
    pub name: String,
    pub thumbnail: Option<String>,
}

#[derive(AsChangeset, Insertable)]
#[table_name = "game"]
pub struct GameInput {
    pub name: String,
    pub thumbnail: Option<String>,
}
