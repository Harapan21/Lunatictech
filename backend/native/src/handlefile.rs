use crate::*;

pub fn check_garbage_upload(mut cx: FunctionContext) -> JsResult<JsArray> {
    let upload_file = fs::read_dir("./uploads").unwrap();
    let vac_of_file: Vec<String> = upload_file
        .into_iter()
        .filter(|ref x| x.as_ref().unwrap().path().is_dir())
        .map(|entry| entry.unwrap().file_name().to_str().unwrap().into())
        .collect::<Vec<String>>();
    let js_array = JsArray::new(&mut cx, vac_of_file.len() as u32);
    vac_of_file.iter().enumerate().for_each(|e| {
        let (idx, obj) = e;
        let js_string = cx.string(obj);
        let _ = js_array.set(&mut cx, idx as u32, js_string);
    });
    Ok(js_array)
}

pub fn remove_dir(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let arg = cx.argument::<JsString>(0)?.value();
    fs::remove_dir_all(arg.to_owned()).unwrap();
    println!("Removing garbage dir : {}", arg.to_owned());
    Ok(cx.undefined())
}
