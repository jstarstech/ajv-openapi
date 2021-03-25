import Ajv from "ajv";
import type { Options as AjvOptions } from "ajv";

import {
    int32,
    int64,
    float,
    double,
    byte
} from "./lib/validators";

export = ajvOpenApi;

function ajvOpenApi(ajv: Ajv, options?: ajvOpenApi.AjvOpenApiOptions): Ajv {
    if (options?.useDraft06 !== false) {
        ajv.addMetaSchema(require("ajv/lib/refs/json-schema-draft-06.json"));
    }

    ajv.addFormat("int32", { type: "number", validate: int32 });
    ajv.addFormat("int64", { type: "number", validate: int64 });
    ajv.addFormat("float", { type: "number", validate: float });
    ajv.addFormat("double", { type: "number", validate: double });
    ajv.addFormat("byte", { type: "string", validate: byte });

    return ajv;
}

namespace ajvOpenApi {
    export interface AjvOpenApiOptions {
        useDraft06?: boolean;
    }

    export function createOptions(options?: AjvOptions): AjvOptions {
        return {
            coerceTypes: true,
            useDefaults: true,
            ...options
        };
    }
}
