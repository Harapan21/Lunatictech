extern crate uuid;
use super::category::{Category, CategoryInput};
use super::post::{Post, PostInput};
use super::user::{User, UserInput};
use crate::errors::SmileError;
use bcrypt::{hash, DEFAULT_COST};
use diesel::{insert_into, prelude::*, update};

pub trait Handler<T, M> {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<Self>>, SmileError>;
    fn find_by_id(id: &T, connection: &MysqlConnection) -> Result<Box<Self>, SmileError>;
    fn input(input: M, connection: &MysqlConnection) -> Result<bool, SmileError>;
}

impl Handler<i32, PostInput> for Post {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<Post>>, SmileError> {
        use crate::schema::post::dsl::*;
        let vec_post = post
            .load::<Post>(connection)
            .map(|e| e.into_iter().map(Box::new).collect::<Vec<Box<Post>>>())
            .map_err(SmileError::from)?;
        Ok(vec_post)
    }

    fn find_by_id(id: &i32, connection: &MysqlConnection) -> Result<Box<Post>, SmileError> {
        use crate::schema::post::dsl::post;
        post.find(id)
            .first::<Post>(connection)
            .map(Box::new)
            .map_err(SmileError::from)
    }
    fn input(input: PostInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        use crate::schema::post::dsl::*;
        insert_into(post)
            .values(input)
            .execute(connection)
            .map(|e| true)
            .map_err(SmileError::from)
    }
}

impl Handler<i32, CategoryInput> for Category {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<Category>>, SmileError> {
        use crate::schema::category::dsl::*;
        let vec_cat = category
            .load::<Category>(connection)
            .map(|e| e.into_iter().map(Box::new).collect::<Vec<Box<Category>>>())
            .map_err(SmileError::from)?;
        Ok(vec_cat)
    }

    fn find_by_id(id: &i32, connection: &MysqlConnection) -> Result<Box<Category>, SmileError> {
        use crate::schema::category::dsl::category;
        category
            .find(id)
            .first::<Category>(connection)
            .map(Box::new)
            .map_err(SmileError::from)
    }

    fn input(input: CategoryInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        use crate::schema::category::dsl::*;
        insert_into(category)
            .values(&input)
            .execute(connection)
            .map_err(SmileError::from)
            .map(|_e| true)
    }
}

impl Handler<String, UserInput> for User {
    fn list(connection: &MysqlConnection) -> Result<Vec<Box<User>>, SmileError> {
        use crate::schema::usr_smile::dsl::*;
        let vec_user = usr_smile
            .load::<User>(connection)
            .map(|e| e.into_iter().map(Box::new).collect::<Vec<Box<User>>>())
            .map_err(SmileError::from)?;
        Ok(vec_user)
    }

    fn find_by_id(id: &String, connection: &MysqlConnection) -> Result<Box<User>, SmileError> {
        use crate::schema::usr_smile::dsl::*;
        usr_smile
            .find(id)
            .first::<User>(connection)
            .map(Box::new)
            .map_err(SmileError::from)
    }
    // fn validation(
    //     &self,
    //     input: &UserInput,
    //     connection: &MysqlConnection,
    // ) -> Future<Item = (bool, bool)> {
    //     use crate::schema::usr_smile::dsl::*;
    //     let is_username = usr_smile
    //         .filter(username.eq(input.username))
    //         .load::<User>(connection)
    //         .map(|e| true)
    //         .map_err(|e| false);
    //     let is_email = usr_smile
    //         .filter(email.eq(input.email))
    //         .load::<User>(connection)
    //         .map(|e| true)
    //         .map_err(|e| false);

    //     Future::join(is_username, is_email)
    // }

    // fn login(
    //     &self,
    //     input: Box<UserInput>,
    //     connection: &MysqlConnection,
    // ) -> Result<Auth, SmileError> {
    //     use crate::schema::usr_smile::dsl::*;
    //     let user = usr_smile
    //         .filter(username.eq(&self.username))
    //         .first::<User>(connection)?;
    //     let is_verify = verify(&self.password, &user.password)
    //         .map_err(|_e| SmileError::PasswordNotMatch("Password Wrong".to_owned()))?;
    //     return if is_verify {
    //         OK(Auth::new(user.user_id))
    //     } else {
    //         Err(SmileError::WrongPassword("password wrong".to_owned()))
    //     };
    // }

    fn input(mut input: UserInput, connection: &MysqlConnection) -> Result<bool, SmileError> {
        use crate::schema::usr_smile::dsl::*;
        input.user_id = uuid::Uuid::new_v4().to_string();
        input.password = hash(input.password, DEFAULT_COST)?;
        insert_into(usr_smile)
            .values(&input)
            .execute(connection)
            .map_err(SmileError::from)
            .map(|_e| true)
    }
}
