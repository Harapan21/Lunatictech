use crate::graphql::Context;
use crate::models::category::{Category, CategoryNode};
use crate::models::post::Post;
use crate::models::user::User;

trait Node<T> {
    fn id(&self) -> T;
    fn posts(&self) -> Option<Vec<Box<Post>>> {
        None
    }
    fn categories(&self) -> Option<Vec<Box<Category>>> {
        None
    }
    fn user(&self) -> Option<Vec<Box<User>>> {
        None
    }
}

impl Node<T> for CategoryNode {
    fn id(&self) -> T {
        self.id
    }

    fn categories(&self) -> Option<Vec<Box<Category>>> {
        None
    }
}

impl Node<T> for Post {
    fn id(&self) -> T {
        self.id
    }

    fn posts(&self) -> Option<Vec<Box<Post>>> {}
}

juniper::graphql_interface!(<'a> &'a Character: Database as "Character" |&self| {
    field id() -> &str { self.id() }

    instance_resolvers: |_| {
        &Category => context.humans.get(self.id()),
        &Post => context.droids.get(self.id()),
    }
});
