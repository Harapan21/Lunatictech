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

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    println!("{}", NICKNAME);
    HttpServer::new(move || {
        let schema = std::sync::Arc::new(graphql::schema::create_schema());
        App::new()
            .wrap(IdentityService::new(
                CookieIdentityPolicy::new(&[0; 32])
                    .domain("127.0.0.1")
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
    .start()
    .await
}
