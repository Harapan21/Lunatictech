use crate::schema::category;

#[derive(Debug, Clone, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[table_name = "category"]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub parentId: Option<i32>,
}

#[derive(Debug, Clone, Queryable, Insertable, Serialize, Deserialize, PartialEq)]
#[table_name = "category"]
pub struct CategoryInput {
    pub name: String,
    pub parentId: Option<i32>,
}
