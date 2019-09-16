#[macro_use]
extern crate neon;
#[macro_use]
extern crate neon_serde;
extern crate serde_derive;
extern crate num_cpus;

export!{
    fn hello() -> String {
        String::from("hello")
    }

    fn thread_count() -> f64 {
       num_cpus::get() as f64
    }
}
