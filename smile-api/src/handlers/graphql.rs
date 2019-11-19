use crate::db::MysqlPool;
use crate::models::schema::{create_context, Schema};
use crate::utils::Auth;
use actix_identity::Identity;
use actix_web::{web, Error, HttpResponse};
use futures::future::Future;
use juniper::http::GraphQLRequest;
use std::sync::Arc;

pub fn graphql(
    st: web::Data<Arc<Schema>>,
    data: web::Json<GraphQLRequest>,
    id: Identity,
    pool: web::Data<MysqlPool>,
) -> impl Future<Item = HttpResponse, Error = Error> {
    let id: Option<String> = match id.identity() {
        Some(token) => Some(Auth::from(token).get_id_authorize().ok().unwrap()),
        None => None,
    };
    web::block(move || {
        let mysql_poll = pool.get().map_err(|e| serde::ser::Error::custom(e))?;
        let context = create_context(id, mysql_poll);
        let res = data.execute(&st, &context);
        Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
    })
    .map_err(Error::from)
    .and_then(|user| {
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(user))
    })
}
