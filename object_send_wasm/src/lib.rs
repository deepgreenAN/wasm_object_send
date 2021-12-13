use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use serde::{Deserialize, Serialize};
use js_sys::{Map, Array};

#[wasm_bindgen(typescript_custom_section)]
const IMPORT: &'static str = r#"
import type {SomeObjectSerde, SomeObjectClass} from "./wasm_import";
"#;

#[wasm_bindgen(raw_module = "./wasm_import")]
extern "C" {
    #[wasm_bindgen(typescript_type = "SomeObjectSerde")]
    pub type SomeObjectSerde;

    #[wasm_bindgen(typescript_type = "SomeObjectClass")]
    pub type SomeObjectClass;

    #[wasm_bindgen(constructor)]
    pub fn new(num: f64, str: String, list: Array) -> SomeObjectClass;

    #[wasm_bindgen(method, getter = num)]
    pub fn get_num(this: &SomeObjectClass) -> f64;

    #[wasm_bindgen(method, getter = str)]
    pub fn get_str(this: &SomeObjectClass) -> String;

    #[wasm_bindgen(method, getter = list)]
    pub fn get_list(this: &SomeObjectClass) -> Array;
}

#[derive(Deserialize, Serialize)]
struct RsSomeObject {
    num: f64,
    str: String,
    list: Vec<f64>
}

#[wasm_bindgen]
pub fn add_serde(x: SomeObjectSerde, y: SomeObjectSerde) -> SomeObjectSerde {
    let x = x.into_serde::<RsSomeObject>().unwrap();
    let y = y.into_serde::<RsSomeObject>().unwrap();
    let mut list: Vec<f64> = Vec::new();
    x.list.iter().cloned().for_each(|item: f64|{list.push(item);});
    y.list.iter().cloned().for_each(|item: f64|{list.push(item);});

    let out = RsSomeObject{
        num: x.num + y.num,
        str: x.str + &y.str,
        list
    };

    JsValue::from_serde(&out).unwrap().into()
}

#[wasm_bindgen]
pub fn add_class(x: SomeObjectClass, y: SomeObjectClass) -> SomeObjectClass {
    let list = Array::new();
    x.get_list().iter().for_each(|item: JsValue|{list.push(&item);});
    y.get_list().iter().for_each(|item: JsValue|{list.push(&item);});
    SomeObjectClass::new(
        x.get_num() + y.get_num(),
        x.get_str() + &y.get_str(),
        list
    )
}

#[wasm_bindgen]
pub fn add_map(x: Map, y: Map) -> Map {
    let num = x.get(&JsValue::from_str("num")).as_f64().unwrap() +
        y.get(&JsValue::from_str("num")).as_f64().unwrap();
    
    let str = x.get(&JsValue::from_str("str")).as_string().unwrap() +
        &y.get(&JsValue::from_str("str")).as_string().unwrap();

    let list = Array::new();
    x.get(&JsValue::from_str("list")).dyn_into::<Array>().unwrap()
    .iter().for_each(|item: JsValue|{list.push(&item);});
    y.get(&JsValue::from_str("list")).dyn_into::<Array>().unwrap()
    .iter().for_each(|item: JsValue|{list.push(&item);});

    Map::new()
    .set(&JsValue::from_str("num"), &JsValue::from_f64(num))
    .set(&JsValue::from_str("str"), &JsValue::from_str(&str))
    .set(&JsValue::from_str("list"), &list)
}
