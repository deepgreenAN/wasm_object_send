import type {SomeObjectSerde} from "./object_send_wasm/wasm_import";
import {SomeObjectClass} from "./object_send_wasm/wasm_import";
import init, {add_serde, add_class, add_map} from "./object_send_wasm/object_send_wasm";
import wasm_path from "./object_send_wasm/object_send_wasm_bg.wasm?url";

await init(wasm_path);

const x_serde: SomeObjectSerde = {
  num: 10,
  str: "Hello, ",
  list: [1,2,3]
};

const y_serde: SomeObjectSerde = {
  num: 20,
  str: "world!",
  list: [4,5]
}

const out_serde = add_serde(x_serde, y_serde);
console.log(`out_serde: ${JSON.stringify(out_serde)}`);

const x_class = new SomeObjectClass(
  10,
  "Hello, ",
  [1,2,3]
);

const y_class = new SomeObjectClass(
  20,
  "world!",
  [4,5]
);

const out_class = add_class(x_class, y_class);
console.log(`out_class: ${JSON.stringify(out_class)}`);

const x_map = new Map(Object.entries(x_serde));
const y_map = new Map(Object.entries(y_serde));

const out_map = add_map(x_map, y_map);
console.log(`out_map: ${JSON.stringify(Object.fromEntries(out_map))}`);
