use super::schema::{create_context, Schema};
use crate::db::MysqlPool;
use crate::utils::Auth;
use actix_identity::Identity;
use actix_web::{web, Error, HttpResponse};
use juniper::http::graphiql::graphiql_source;
use juniper::http::GraphQLRequest;
use std::sync::Arc;

pub fn client() -> HttpResponse {
    let html = graphiql_source("http://127.0.0.1:8088/graphql");
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(html)
}

pub async fn api(
    st: web::Data<Arc<Schema>>,
    data: web::Json<GraphQLRequest>,
    id: Identity,
    pool: web::Data<MysqlPool>,
) -> Result<HttpResponse, Error> {
    let aunt_id: Option<String> = match id.identity() {
        Some(token) => Some(Auth::from(token).get_id_authorize().ok().unwrap()),
        None => None,
    };
    let handler = web::block(move || {
        let mysql_poll = pool.get().map_err(|e| serde::ser::Error::custom(e))?;
        let context = create_context(aunt_id, mysql_poll);
        let res = data.execute(&st, &context);
        Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
    })
    .await?;

    Ok(HttpResponse::Ok()
        .content_type("application/json")
        .body(handler))
}
