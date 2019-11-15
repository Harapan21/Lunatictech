use crate::db::{MysqlPool, MysqlPoollConnection};
use crate::models::user::{Login, Register, UserList};
use actix_identity::Identity;
use actix_web::{web, HttpRequest, HttpResponse};

type ResponseResult = Result<HttpResponse, HttpResponse>;

fn mysql_pool_header(pool: web::Data<MysqlPool>) -> Result<MysqlPoollConnection, HttpResponse> {
    pool.get()
        .map_err(|e| HttpResponse::InternalServerError().json(e.to_string()))
}

pub fn index(_req: HttpRequest, pool: web::Data<MysqlPool>, id: Identity) -> ResponseResult {
    let mysql_pool = mysql_pool_header(pool)?;
    println!(
        "{}",
        id.identity().unwrap_or_else(|| "Anonymous".to_owned())
    );
    Ok(HttpResponse::Ok().json(UserList::list(&mysql_pool)))
}

pub fn create(new_user: web::Json<Register>, pool: web::Data<MysqlPool>) -> ResponseResult {
    let mysql_pool = mysql_pool_header(pool)?;
    new_user
        .execute(&mysql_pool)
        .map(|user| HttpResponse::Ok().json(user))
        .map_err(|e| HttpResponse::InternalServerError().json(e.to_string()))
}

pub fn logout(id: Identity) -> ResponseResult {
    id.forget();
    Ok(HttpResponse::Ok().json(true))
}

pub fn login(
    login_user: web::Json<Login>,
    pool: web::Data<MysqlPool>,
    id: Identity,
) -> ResponseResult {
    let mysql_pool = mysql_pool_header(pool)?;
    login_user
        .login(&mysql_pool)
        .map(|user| {
            id.remember(user.token.to_owned().unwrap());
            return HttpResponse::Ok().json(user);
        })
        .map_err(|e| HttpResponse::InternalServerError().json(e.to_string()))
}
