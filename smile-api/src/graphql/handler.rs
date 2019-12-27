use super::schema::{create_context, Schema};
use crate::{db::MysqlPool, utils::Auth};
use actix_identity::Identity;
use actix_web::{web, Error, HttpResponse};
use juniper::http::{graphiql::graphiql_source, GraphQLRequest};
use std::sync::Arc;

pub fn client() -> HttpResponse {
    let html = graphiql_source("http://127.0.0.1:8088/graphql");
    HttpResponse::Ok().content_type("text/html; charset=utf-8").body(html)
}

pub async fn api(
    st: web::Data<Arc<Schema>>,
    data: web::Json<GraphQLRequest>,
    id: Identity,
    pool: web::Data<MysqlPool>,
) -> Result<HttpResponse, Error> {
    let identity_arc = Arc::new(id);
    let handler = async move {
        let aunt_id = match &identity_arc.identity() {
            Some(token) => Some(Auth::from(token.to_owned()).verify().unwrap()),
            None => None,
        };
        let mysql_poll = pool.get().map_err(|e| serde::ser::Error::custom(e))?;
        let context = create_context(aunt_id, mysql_poll, identity_arc);
        let res = data.execute(&st, &context);
        Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
    }
    .await?;

    Ok(HttpResponse::Ok().content_type("application/json").body(handler))
}
