interface Type {
  isNull: (data: any) => boolean;
  isArray: (data: any) => boolean;
  isString: (data: any) => boolean;
  isObject: (data: any) => boolean;
  isNumber: (data: any) => boolean;
  isBoolean: (data: any) => boolean;
  isFunction: (data: any) => boolean;
  isUndefined: (data: any) => boolean;
  [key: string]: any;
}
// @ts-ignore
let typeAssert: Type = {};

let types: Array<String> = [
  "Null",
  "Array",
  "String",
  "Object",
  "Number",
  "Boolean",
  "Function",
  "Undefined"
];

types.map(
  type =>
    (typeAssert[`is${type}`] = (target: any) =>
      toString.call(target) === `[object ${type}]`)
);
export default typeAssert;
