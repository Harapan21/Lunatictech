use crate::*;
use diesel::r2d2::{ConnectionManager, Pool, PoolError, PooledConnection};

type MysqlPool = Pool<ConnectionManager<MysqlConnection>>;
type MysqlPoolConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

fn init_pool(database_url: &str) -> Result<MysqlPool, PoolError> {
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    Pool::builder().build(manager)
}

pub fn establish_connection() -> MysqlPool {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    MysqlConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url));
    init_pool(&database_url).expect("failed to create pool")
}
