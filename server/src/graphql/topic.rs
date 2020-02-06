use super::schema::Context;
use super::category::CategorySchema;
use crate::models::topic::Topic;

pub trait TopicSchema {
    fn id(&self) -> &i32;
    fn name(&self) -> &str;
    fn icon(&self) -> &Option<String>;
    fn category(&self) -> Vec<Box<dyn CategorySchema>>;
}


impl TopicSchema for Topic {
fn id(&self) -> &i32 {
    &self.id
}
fn name(&self) -> &str { &self.name.as_str()}
fn icon(&self) -> &Option<String>;
fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>> {
unimplemented!()

}
}



#[juniper::object(
    name="Topic",
    Context=Context)]
impl Box<dyn TopicSchema> {


fn id(&self) -> &i32 {
    &self.id
}
fn name(&self) -> &str { &self.name.as_str()}
fn icon(&self) -> &Option<String>;
fn category(&self, context: &Context) -> Vec<Box<dyn CategorySchema>> {
unimplemented!()

}
}
