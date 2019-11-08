#![allow(non_snake_case)]
extern crate chrono;
#[macro_use]
extern crate neon;
#[macro_use]
extern crate diesel;
extern crate dotenv;
#[macro_use]
extern crate neon_serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;
use std::fs;

use chrono::prelude::*;
use diesel::prelude::*;
use dotenv::dotenv;
use neon::prelude::*;
use neon::register_module;
use std::env;

mod db;
mod handlefile;
mod models;
mod schema;

register_module!(mut m, {
    m.export_function("check_garbage_upload", handlefile::check_garbage_upload)?;
    m.export_function("remove_dir", handlefile::remove_dir)?;
    Ok(())
});

// export! {
//     fn check_garbage_upload() -> Vec<String> {
//         let upload_file = fs::read_dir("./uploads").unwrap();
//         upload_file
//             .into_iter()
//             .filter(|ref x| x.as_ref().unwrap().path().is_dir())
//             .map(|entry| entry.unwrap().file_name().to_str().unwrap().into())
//             .collect()
//     }

//     fn remove_dir(path: String) -> String {
//         fs::remove_dir_all(path.to_owned()).unwrap();
//         format!("Removing garbage dir : {}",path.to_owned())
//     }

// }
