extern crate uuid;

use super::{
    category::{Category, CategoryInput},
    post::{Post, PostInput},
    user::{User, UserInput},
};

use crate::{
    errors::SmileError,
    schema::{
        category::dsl::category,
        post::dsl::post,
        usr_smile::dsl::{username, usr_smile},
    },
    utils::Auth,
};

use bcrypt::{hash, verify, DEFAULT_COST};

use diesel::{delete as Delete, insert_into as Insert, prelude::*, update as Remove};

pub trait Handler<T, M> {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<Self>>, SmileError>;
    fn find_by_id(id: &T, connection: &MysqlConnection) -> Result<Box<Self>, SmileError>;
    fn input(input: M, connection: &MysqlConnection) -> Result<bool, SmileError>;
    fn update(id: T, input: M, connection: &MysqlConnection) -> Result<bool, SmileError>;
    fn remove(id: T, connection: &MysqlConnection) -> Result<bool, SmileError>;
}

impl Handler<i32, PostInput> for Post {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<Post>>, SmileError> {
        let vec_post = post
            .load::<Post>(connection)
            .map(|e| e.into_iter().map(Box::new).collect::<Vec<Box<Post>>>())
            .map_err(SmileError::from)?;
        Ok(vec_post)
    }

    fn find_by_id(id: &i32, connection: &MysqlConnection) -> Result<Box<Post>, SmileError> {
        post.find(id).first::<Post>(connection).map(Box::new).map_err(SmileError::from)
    }

    fn input(input: PostInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        Insert(post).values(&input).execute(connection).map(|_| true).map_err(SmileError::from)
    }

    fn update(id: i32, input: PostInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        Remove(post.find(id)).set(input).execute(connection).map(|_| true).map_err(SmileError::from)
    }
    fn remove(id: i32, connection: &MysqlConnection) -> Result<bool, SmileError> {
        Delete(post.find(id)).execute(connection).map(|_| true).map_err(SmileError::from)
    }
}

impl Handler<i32, CategoryInput> for Category {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<Category>>, SmileError> {
        let vec_cat = category
            .load::<Category>(connection)
            .map(|e| e.into_iter().map(Box::new).collect::<Vec<Box<Category>>>())
            .map_err(SmileError::from)?;
        Ok(vec_cat)
    }

    fn find_by_id(id: &i32, connection: &MysqlConnection) -> Result<Box<Category>, SmileError> {
        category.find(id).first::<Category>(connection).map(Box::new).map_err(SmileError::from)
    }

    fn input(input: CategoryInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        Insert(category).values(&input).execute(connection).map_err(SmileError::from).map(|_| true)
    }
    fn update(
        id: i32,
        input: CategoryInput,
        connection: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        Remove(category.find(id))
            .set(input)
            .execute(connection)
            .map(|_| true)
            .map_err(SmileError::from)
    }
    fn remove(id: i32, connection: &MysqlConnection) -> Result<bool, SmileError> {
        Delete(category.find(id)).execute(connection).map(|_| true).map_err(SmileError::from)
    }
}

impl Handler<String, UserInput> for User {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<User>>, SmileError> {
        let vec_user = usr_smile
            .load::<User>(connection)
            .map(|e| e.into_iter().map(Box::new).collect::<Vec<Box<User>>>())
            .map_err(SmileError::from)?;
        Ok(vec_user)
    }

    fn find_by_id(id: &String, connection: &MysqlConnection) -> Result<Box<User>, SmileError> {
        usr_smile.find(id).first::<User>(connection).map(Box::new).map_err(SmileError::from)
    }

    fn input(mut input: UserInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        input.user_id = Some(uuid::Uuid::new_v4().to_string());
        match input.password {
            Some(val_password) => {
                input.password = Some(hash(val_password, DEFAULT_COST)?);
                Insert(usr_smile)
                    .values(&input)
                    .execute(connection)
                    .map(|_| true)
                    .map_err(SmileError::from)
            }
            None => Err(SmileError::Required("password")),
        }
    }
    fn update(
        id: String,
        input: UserInput,
        connection: &MysqlConnection,
    ) -> Result<bool, SmileError> {
        Remove(usr_smile.find(id))
            .set(input)
            .execute(connection)
            .map(|_| true)
            .map_err(SmileError::from)
    }
    fn remove(id: String, connection: &MysqlConnection) -> Result<bool, SmileError> {
        Delete(usr_smile.find(id)).execute(connection).map(|_| true).map_err(SmileError::from)
    }
}

impl User {
    pub fn login(
        input_username: String,
        input_password: String,
        connection: &MysqlConnection,
    ) -> Result<Auth, SmileError> {
        let user = usr_smile.filter(username.eq(&input_username)).first::<User>(connection)?;
        let is_verify = verify(&input_password, &user.password)
            .map_err(|_e| SmileError::PasswordNotMatch("Password Wrong".to_owned()))?;
        return if is_verify {
            Ok(Auth::new(&user.user_id))
        } else {
            Err(SmileError::WrongPassword("Password Wrong".to_owned()))
        };
    }
}
