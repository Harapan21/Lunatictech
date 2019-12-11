use crate::graphql::Context;
use crate::models::category::Category;
use crate::models::category::CategoryNode;
use crate::models::post::Post;
use crate::models::user::User;

trait Node<T> {
    fn id(&self) -> T;
    fn posts(&self) -> Option<Box<Vec<Post>>>;
    fn categories(&self) -> Option<Box<Vec<Category>>>;
    fn user(&self) -> Option<Box<Vec<User>>>;
}

struct

impl Node<T> for CategoryNode {
    fn id(&self) -> T {
        self.id
    }

    fn categories(&self) -> Option<Box<Vec<Category>>> {
        None
    }
}

impl Node<T> for Post {

    fn id(&self) -> T {
        self.id
    }

    fn posts(&self) -> Option<Box<Vec<Post>>> {

    }
}

juniper::graphql_interface!(<'a> &'a Character: Database as "Character" |&self| {
    field id() -> &str { self.id() }

    instance_resolvers: |_| {
        &Category => context.humans.get(self.id()),
        &Post => context.droids.get(self.id()),
    }
});
