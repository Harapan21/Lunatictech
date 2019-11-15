extern crate uuid;
use crate::errors::SmileError;
// use crate::models::drive::Drive;
use super::*;
use crate::schema::usr_smile;
use crate::schema::usr_smile::dsl::*;
use crate::utils::Auth;
use bcrypt::{hash, verify, DEFAULT_COST};
use diesel::prelude::*;
use uuid::Uuid;
#[derive(Queryable, Serialize, Deserialize, PartialEq)]
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
                ..self.clone().into()
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
