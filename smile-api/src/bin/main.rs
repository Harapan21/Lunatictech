use smile_api_lib::*;

const NICKNAME: &'static str = r#"
  _____           _ _      
 / ____|         (_) |     
| (___  _ __ ___  _| | ___ 
 \___ \| '_ ` _ \| | |/ _ \
 ____) | | | | | | | |  __/
|_____/|_| |_| |_|_|_|\___|

| by Harapan Pardamean <harapanpardamean@gmail.com>
"#;
const HOSTNAME: &'static str = "127.0.0.1:8088";

fn main() {
    println!("{}", NICKNAME);
    let sys = actix::System::new("users");
    HttpServer::new(|| {
        let schema = std::sync::Arc::new(models::schema::create_schema());
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
                    .max_age(3600),
            )
            .data(establish_connection())
            .service(
                web::resource("/graphql").route(web::post().to_async(handlers::graphql::graphql)),
            )
            .service(
                web::resource("/users")
                    .route(web::get().to_async(handlers::user::index))
                    .route(web::post().to_async(handlers::user::create)),
            )
            .service(web::resource("/login").route(web::post().to(handlers::user::login)))
            .service(web::resource("/logout").route(web::post().to(handlers::user::logout)))
            .service(web::resource("/auth").route(web::post().to(handlers::user::create)))
    })
    .bind(HOSTNAME)
    .unwrap()
    .start();
    println!("Listen  {}", HOSTNAME);
    let _ = sys.run();
}
