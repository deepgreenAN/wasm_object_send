/* tslint:disable */
/* eslint-disable */
/**
* @param {SomeObjectSerde} x
* @param {SomeObjectSerde} y
* @returns {SomeObjectSerde}
*/
export function add_serde(x: SomeObjectSerde, y: SomeObjectSerde): SomeObjectSerde;
/**
* @param {SomeObjectClass} x
* @param {SomeObjectClass} y
* @returns {SomeObjectClass}
*/
export function add_class(x: SomeObjectClass, y: SomeObjectClass): SomeObjectClass;
/**
* @param {Map<any, any>} x
* @param {Map<any, any>} y
* @returns {Map<any, any>}
*/
export function add_map(x: Map<any, any>, y: Map<any, any>): Map<any, any>;

import type {SomeObjectSerde, SomeObjectClass} from "./wasm_import";



export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly add_serde: (a: number, b: number) => number;
  readonly add_class: (a: number, b: number) => number;
  readonly add_map: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
