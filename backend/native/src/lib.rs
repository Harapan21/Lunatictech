extern crate neon;
#[macro_use]
extern crate neon_serde;
extern crate serde_derive;
use std::fs;

use neon::prelude::*;
use neon::register_module;

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
