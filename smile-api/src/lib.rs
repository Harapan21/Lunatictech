#![allow(
    non_snake_case,
    proc_macro_derive_resolution_fallback,
    non_camel_case_types
)]
extern crate actix;
extern crate actix_cors;
extern crate actix_identity;
extern crate futures;
extern crate jsonwebtoken as jwt;
#[macro_use]
extern crate juniper;
extern crate serde;
extern crate serde_json;
extern crate uuid;
#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate serde_derive;
extern crate actix_web;
extern crate dotenv;
#[macro_use]
extern crate diesel;
extern crate bcrypt;
#[macro_use]
extern crate diesel_derive_enum;

pub use actix_cors::Cors;
pub use actix_identity::{CookieIdentityPolicy, IdentityService};
pub use actix_web::{http::header, web, App, HttpServer};

pub mod db;
pub mod errors;
pub mod handlers;
pub mod models;
pub mod schema;
pub mod utils;

pub use db::establish_connection;
