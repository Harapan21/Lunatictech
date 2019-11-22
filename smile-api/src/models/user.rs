extern crate uuid;
use super::post::Post;
use super::*;
use crate::errors::SmileError;
use crate::schema::usr_smile;
use crate::schema::usr_smile::dsl::*;
use crate::utils::Auth;
use bcrypt::{hash, verify, DEFAULT_COST};
use diesel::prelude::*;
use uuid::Uuid;

#[derive(Debug, Clone, Queryable, Serialize, Deserialize, PartialEq)]
pub struct UserResolve {
    pub user_id: String,
    pub username: String,
    pub email: Option<String>,
    pub joinAt: NaiveDateTime,
    pub lastEditedAt: Option<NaiveDateTime>,
    pub fullname: Option<String>,
    pub avatar: Option<String>,
    pub isAdmin: Option<bool>,
    pub firstlatter: String,
    pub posts: Vec<post::Post>,
}

pub trait UserGraph {
    fn flat(user: &User, posts: Vec<post::Post>) -> Self;
}
impl UserGraph for UserResolve {
    fn flat(user: &User, posts: Vec<post::Post>) -> Self {
        UserResolve {
            user_id: user.user_id.clone(),
            username: user.username.clone(),
            email: user.email.clone(),
            joinAt: user.joinAt.clone(),
            lastEditedAt: user.lastEditedAt.clone(),
            fullname: user.fullname.clone(),
            avatar: user.avatar.clone(),
            isAdmin: user.isAdmin.clone(),
            firstlatter: user.username[..1].to_string(),
            posts,
        }
    }
}

#[juniper::object(name = "User")]
impl UserResolve {
    fn user_id(&self) -> String {
        self.user_id.clone()
    }
    fn username(&self) -> String {
        self.username.clone()
    }
    fn email(&self) -> Option<String> {
        self.email.clone()
    }
    fn joinAt(&self) -> NaiveDateTime {
        self.joinAt.clone()
    }
    fn lastEditedAt(&self) -> Option<NaiveDateTime> {
        self.lastEditedAt.clone()
    }
    fn fullname(&self) -> Option<String> {
        self.fullname.clone()
    }
    fn avatar(&self) -> Option<String> {
        self.avatar.clone()
    }
    fn isAdmin(&self) -> Option<bool> {
        self.isAdmin.clone()
    }
    fn firstlatter(&self) -> String {
        self.firstlatter.clone()
    }
    fn posts(&self) -> Vec<Post> {
        self.posts.clone()
    }
}

#[derive(Debug, Clone, Queryable, Identifiable, Serialize, Deserialize, PartialEq)]
#[primary_key(user_id)]
#[table_name = "usr_smile"]
pub struct User {
    pub user_id: String,
    pub username: String,
    pub email: Option<String>,
    pub joinAt: NaiveDateTime,
    pub lastEditedAt: Option<NaiveDateTime>,
    pub fullname: Option<String>,
    #[serde(skip)]
    pub password: String,
    pub avatar: Option<String>,
    pub isAdmin: Option<bool>,
}

impl User {
    pub fn find(id: &String, connection: &MysqlConnection) -> Result<Self, SmileError> {
        usr_smile
            .find(id)
            .first::<User>(connection)
            .map_err(SmileError::from)
    }
}

#[derive(Insertable, Deserialize, PartialEq, Clone)]
#[table_name = "usr_smile"]
pub struct Register {
    #[serde(skip_deserializing)]
    pub user_id: String,
    pub username: String,
    pub email: Option<String>,
    pub fullname: String,
    pub password: String,
    pub avatar: Option<String>,
    pub isAdmin: Option<bool>,
}

impl Register {
    pub fn execute(&self, connection: &MysqlConnection) -> Result<Auth, SmileError> {
        diesel::insert_into(usr_smile::table)
            .values(Register {
                user_id: Uuid::new_v4().to_string(),
                password: Self::hash_password(self.password.clone())?,
                ..self.clone()
            })
            .execute(connection)
            .expect("Failed to Register");

        let login = Login {
            username: self.username.clone(),
            password: self.password.clone(),
        };

        Ok(login.login(connection)?)
    }

    pub fn hash_password(plain: String) -> Result<String, SmileError> {
        Ok(hash(plain, DEFAULT_COST)?)
    }
}

#[derive(Debug, Deserialize)]
pub struct Login {
    pub username: String,
    pub password: String,
}

impl Login {
    pub fn login(&self, connection: &MysqlConnection) -> Result<Auth, SmileError> {
        let user = usr_smile
            .filter(username.eq(&self.username))
            .first::<User>(connection)?;
        let is_verify = verify(&self.password, &user.password)
            .map_err(|_error| SmileError::PasswordNotMatch("Password wrong".to_owned()))?;
        if is_verify {
            Ok(Auth::new(user.user_id))
        } else {
            Err(SmileError::WrongPassword("password wrong".to_owned()))
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct UserList(pub Vec<User>);
impl UserList {
    pub fn list(connection: &MysqlConnection) -> Self {
        let result = usr_smile
            .limit(10)
            .load::<User>(connection)
            .expect("Error loading products");
        UserList(result)
    }
}
