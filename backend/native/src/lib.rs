#![allow(non_snake_case)]
extern crate neon;
#[macro_use]
extern crate diesel;
extern crate dotenv;
#[macro_use]
extern crate neon_serde;
extern crate serde_derive;
use std::fs;

use diesel::prelude::*;
use dotenv::dotenv;
use neon::prelude::*;
use neon::register_module;
use std::env;

mod models;
mod schema;

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    MysqlConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

export! {
    fn check_garbage_upload() -> Vec<String> {
        let upload_file = fs::read_dir("./uploads").unwrap();
        upload_file
            .into_iter()
            .filter(|ref x| x.as_ref().unwrap().path().is_dir())
            .map(|entry| entry.unwrap().file_name().to_str().unwrap().into())
            .collect()
    }

    fn remove_dir(path: String) -> String {
        fs::remove_dir_all(path.to_owned()).unwrap();
        format!("Removing garbage dir : {}",path.to_owned())
    }

}
