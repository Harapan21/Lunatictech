use crate::db::MysqlPool;
use actix_web::{web, Error, HttpResponse};
use futures::future::Future;
use juniper::http::GraphQLRequest;
use std::sync::Arc;
use actix_identity::Identity;

pub fn graphql(
    st: web::Data<Arc<Schema>>,
    data: web::Json<GraphQLRequest>,
    id: Identity,
    pool: web::Data<MysqlPool>,
) -> impl Future<Item = HttpResponse, Error = Error> {
    web::block(move || {
        let pg_pool = pool.get().map_err(|e| serde_json::Error::custom(e))?;

        let auth = id.identity().unwrap_or_else(|| "".to_owned())
        let ctx = create_context(auth, pg_pool);

        let res = data.execute(&st, &ctx);
        Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
    })
    .map_err(Error::from)
    .and_then(|user| {
        Ok(HttpResponse::Ok()
            .content_type("application/json")
            .body(user))
    })
}
