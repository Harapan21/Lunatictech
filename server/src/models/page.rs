use crate::schema::page;
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
#[table_name = "page"]
pub struct Page {
    pub id: i32,
    pub name: String,
    pub icon: Option<String>,
    pub content: Option<String>,
}

#[derive(juniper::GraphQLInputObject, AsChangeset, Debug, Serialize, Deserialize, Insertable)]
#[table_name = "page"]
pub struct PageInput {
    pub name: String,
    pub icon: Option<String>,
    pub content: Option<String>,
}
