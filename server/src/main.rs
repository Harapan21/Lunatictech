#![allow(non_snake_case, proc_macro_derive_resolution_fallback, non_camel_case_types)]
extern crate actix_cors;
extern crate actix_identity;
extern crate jsonwebtoken as jwt;
extern crate rayon;
#[macro_use]
extern crate juniper;
extern crate serde;
extern crate serde_json;
extern crate uuid;
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
pub mod graphql;
pub mod models;
pub mod schema;
pub mod utils;

pub use db::establish_connection;

const NICKNAME: &'static str = r#"
 __    __  __  _  _    __   ____  ____  ___  ____  ____  ___  _   _ 
(  )  (  )(  )( \( )  /__\ (_  _)(_  _)/ __)(_  _)( ___)/ __)( )_( )
 )(__  )(__)(  )  (  /(__)\  )(   _)(_( (__   )(   )__)( (__  ) _ ( 
(____)(______)(_)\_)(__)(__)(__) (____)\___) (__) (____)\___)(_) (_)

| by Harapan Pardamean <harapanpardamean@gmail.com>
"#;

const HOSTNAME: &'static str = "localhost:8088";

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    println!("{}", NICKNAME);
    HttpServer::new(move || {
        let schema = std::sync::Arc::new(graphql::schema::create_schema());
        App::new()
            .wrap(IdentityService::new(
                CookieIdentityPolicy::new(&[0; 32])
                    .domain("localhost")
                    .name("aunt")
                    .path("/")
                    .max_age(chrono::Duration::days(1).num_seconds())
                    .secure(false),
            ))
            .data(schema.clone())
            .wrap(
                Cors::new()
                    .send_wildcard()
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec![
                        header::AUTHORIZATION,
                        header::CONTENT_TYPE,
                        header::ACCEPT,
                    ])
                    .max_age(3600)
                    .finish(),
            )
            .data(establish_connection())
            .service(web::resource("/graphql").route(web::post().to(graphql::handler::api)))
            .service(web::resource("/graphiql").route(web::get().to(graphql::handler::client)))
    })
    .bind(HOSTNAME)?
    .run()
    .await
}
