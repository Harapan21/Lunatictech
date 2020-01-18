#[derive(juniper::GraphQLObject, Clone, Serialize, Deserialize)]
pub struct Drive {
    pub id: i32,
    pub location: Option<String>,
}
