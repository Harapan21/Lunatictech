use super::*;
use crate::schema::post;
#[derive(Debug, Serialize, Deserialize, DbEnum, PartialEq)]
#[DieselType = "Status"]
pub enum StatusPost {
    #[db_rename = "publish"]
    Publish,
    #[db_rename = "draft"]
    Draft,
    #[db_rename = "hide"]
    Hide,
}

#[derive(Serialize, Deserialize, Identifiable, Queryable, Associations, PartialEq, Debug)]
#[table_name = "post"]
pub struct Posts {
    id: usize,
    author_id: String,
    title: String,
    createdAt: NaiveDateTime,
    content: String,
    status: Option<StatusPost>,
    last_edited_at: NaiveDateTime,
    last_edited_by: String,
}
