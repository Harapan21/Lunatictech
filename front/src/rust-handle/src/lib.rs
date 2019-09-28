use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sub(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn handle_edit(content: String) -> String {
    content
}

