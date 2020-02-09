use super::topic::TopicSchema;
use crate::models::page::Page;

pub trait PageSchema {
    fn id(&self) -> &i32;
    fn name(&self) -> &String;
    fn icon(&self) -> &Option<String>;
    fn content(&self) -> &Option<String>;
    fn topic(&self) -> Vec<Box<dyn TopicSchema + 'static>>;
}

impl PageSchema for Page {
    fn id(&self) -> &i32 {
        &self.id
    }
    fn name(&self) -> &String {
        &self.name
    }
    fn icon(&self) -> &Option<String> {
        &self.icon
    }
    fn content(&self) -> &Option<String> {
        &self.content
    }
    fn topic(&self) -> Vec<Box<dyn TopicSchema + 'static>> {
        unimplemented!()
    }
}

#[juniper::object(name = "Page")]
impl Box<dyn PageSchema> {
    pub fn id(&self) -> &i32 {
        &self.id()
    }
    pub fn name(&self) -> &String {
        &self.name()
    }
    pub fn icon(&self) -> &Option<String> {
        &self.icon()
    }
    pub fn content(&self) -> &Option<String> {
        &self.content()
    }
}
