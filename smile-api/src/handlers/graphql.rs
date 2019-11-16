use crate::db::MysqlPool;
use actix_web::{web, Error, HttpResponse};
use juniper::http::GraphQLRequest;
use std::sync::Arc;
use actix_identity::Identity;


pub async fn graphql(
    st: web::Data<Arc<Schema>>,
    data: web::Json<GraphQLRequest>,
    id: Identity,
    pool: web::Data<MysqlPool>,
) -> Result<HttpResponse, Error> {
let block = async move {
        let pg_pool = pool.get().map_err(|e| serde::ser::Error::custom(e))?;
        let auth = id.identity().unwrap_or_else(|| "".to_owned());
        // let ctx = create_context(auth, pg_pool);
        let res = data.execute(&st, &());
        Ok::<_, serde_json::error::Error>(serde_json::to_string(&res)?)
};


block.await.map(|user|
        HttpResponse::Ok()
            .content_type("application/json")
            .body(user)).map_err(Error::from)



}
