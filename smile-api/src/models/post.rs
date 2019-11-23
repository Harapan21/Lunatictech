use super::category::{Categories, CategoryNode, CategoryResolve};
use super::schema::Context;
use super::user::User;
use super::*;
use crate::errors::SmileError;
use crate::schema::post;
use crate::schema::post::dsl::*;
use diesel::prelude::*;
#[derive(Debug, Serialize, Deserialize, DbEnum, PartialEq, Clone)]
#[DieselType = "Status"]
#[derive(juniper::GraphQLEnum)]
pub enum StatusPost {
    #[db_rename = "publish"]
    Publish,
    #[db_rename = "draft"]
    Draft,
    #[db_rename = "hide"]
    Hide,
}

#[derive(Clone, juniper::GraphQLObject, Serialize, Deserialize, PartialEq, Debug)]
pub struct PostResolve {
    id: i32,
    author_id: Option<String>,
    title: Option<String>,
    createdAt: NaiveDateTime,
    content: Option<String>,
    status: Option<StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
    category: Vec<CategoryResolve>,
}

#[derive(Clone, Serialize, Deserialize, Identifiable, Queryable, PartialEq, Debug, Associations)]
#[belongs_to(User, foreign_key = "author_id")]
#[table_name = "post"]
pub struct Post {
    id: i32,
    author_id: Option<String>,
    title: Option<String>,
    createdAt: NaiveDateTime,
    content: Option<String>,
    status: Option<StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
}

#[derive(Insertable, AsChangeset, Serialize, Deserialize, PartialEq, Debug, Clone)]
#[table_name = "post"]
pub struct PostField {
    title: Option<String>,
    content: Option<String>,
    author_id: Option<String>,
    status: Option<StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
}

#[derive(juniper::GraphQLInputObject, Serialize, Deserialize, Debug, Clone)]
pub struct PostInput {
    title: Option<String>,
    content: Option<String>,
    author_id: Option<String>,
    status: Option<StatusPost>,
    last_edited_at: Option<NaiveDateTime>,
    last_edited_by: Option<String>,
    categories: Categories,
}
impl PostInput {
    fn destructor(&self) -> (Categories, PostField) {
        let to_posting = PostField {
            title: self.title.to_owned(),
            content: self.content.to_owned(),
            author_id: self.author_id.to_owned(),
            status: self.status.to_owned(),
            last_edited_at: self.last_edited_at.to_owned(),
            last_edited_by: self.last_edited_by.to_owned(),
        };
        (self.categories.to_owned(), to_posting)
    }

    pub fn execute(&self, context: &Context, input_id: &Option<i32>) -> Result<bool, SmileError> {
        use diesel::{insert_into, update};
        let conn: &MysqlConnection = &context.conn;
        let (categories, to_posting) = self.destructor();
        return match input_id {
            Some(is_id) => update(post)
                .filter(id.eq(is_id))
                .set(PostField {
                    last_edited_by: context.user_id.clone().into(),
                    ..to_posting.clone().into()
                })
                .execute(conn)
                .map(|_e| true)
                .map_err(SmileError::from),
            None => {
                let posting = insert_into(post)
                    .values(PostField {
                        author_id: context.user_id.clone().into(),
                        ..to_posting.clone().into()
                    })
                    .execute(conn);
                if posting.is_ok() {
                    let id_post_to_push = post.select(id).order(id.desc()).first(conn)?;
                    return CategoryNode::push_node(conn, categories, id_post_to_push);
                }
                Err(SmileError::Unreachable("post"))
            }
        };
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub struct PostList(pub Vec<PostResolve>);

impl PostList {
    pub(self) fn convert_to_resolve(
        vec_post: Vec<Post>,
        connection: &MysqlConnection,
    ) -> Vec<PostResolve> {
        vec_post
            .into_iter()
            .map(|e| {
                CategoryNode::get_by_postId(&e, connection);
                PostResolve {
                    id: e.id.into(),
                    author_id: e.author_id.into(),
                    title: e.title.into(),
                    createdAt: e.createdAt.into(),
                    content: e.content.into(),
                    status: e.status.into(),
                    last_edited_at: e.last_edited_at.into(),
                    last_edited_by: e.last_edited_by.into(),
                    category: Vec::new(),
                }
            })
            .collect::<Vec<PostResolve>>()
    }
    pub fn list(connection: &MysqlConnection) -> Self {
        let vec_post = post
            .limit(20)
            .load::<Post>(connection)
            .expect("Error loading products");
        let result = Self::convert_to_resolve(vec_post, connection);
        PostList(result)
    }
    pub fn by_author_id(user: &User, connection: &MysqlConnection) -> Result<PostList, SmileError> {
        Post::belonging_to(user)
            .load::<Post>(connection)
            .map(|vec_post| PostList(Self::convert_to_resolve(vec_post, &connection)))
            .map_err(SmileError::from)
    }
    pub fn as_vec(&self) -> Vec<PostResolve> {
        self.0.to_owned()
    }
}
