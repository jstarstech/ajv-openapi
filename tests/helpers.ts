import Ajv from "ajv";
import * as openapi from "../";

export function createAjv(extend = true): Ajv {
    const ajv = new Ajv(openapi.createOptions());
    return extend ? openapi(ajv) : ajv;
}