/**
 * OpenAPI 3.0.0 data types format
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#data-types
 */

import {
    INT32_RANGE,
    INT64_RANGE,
    FLOAT_RANGE,
    DOUBLE_RANGE
} from "./ranges";
import { Decimal } from "decimal.js";

function isInRange(range: { min: Decimal; max: Decimal }, data: string | number): boolean {
    try {
        return range.max.greaterThanOrEqualTo(data) &&
            range.min.lessThanOrEqualTo(data);
    } catch {
        return false;
    }
}

function isIntegerLike(data: unknown): boolean {
    if (typeof data === "number") {
        return Number.isInteger(data);
    }

    if (typeof data !== "string") {
        return false;
    }

    return /^[-+]?\d+$/.test(data);
}

function isFloatLike(data: unknown): boolean {
    if (typeof data === "number") {
        return Number.isFinite(data);
    }

    if (typeof data !== "string") {
        return false;
    }

    if (data === "" || data === "." || data === "," || data === "-" || data === "+") {
        return false;
    }

    return /^(?:[-+])?(?:[0-9]+)?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/.test(data);
}

/** Check if the data is an int32. */
export function int32(data: unknown): boolean {
    const value = data as string | number;
    return (
        isIntegerLike(data) &&
        isInRange(INT32_RANGE, value)
    );
}

/** Check if data is an int64. */
export function int64(data: unknown): boolean {
    const value = data as string | number;
    return (
        isIntegerLike(data) &&
        isInRange(INT64_RANGE, value)
    );
}

/** Check if data is a float. */
export function float(data: unknown): boolean {
    if (typeof data === "number") {
        return isFloatLike(data) && isInRange(FLOAT_RANGE, data);
    }

    if (typeof data !== "string" || !isFloatLike(data)) {
        return false;
    }

    try {
        new Decimal(data);
        return isInRange(FLOAT_RANGE, data);
    } catch {
        return true;
    }
}

/** Check if data is a double. */
export function double(data: unknown): boolean {
    if (typeof data === "number") {
        return isFloatLike(data) && isInRange(DOUBLE_RANGE, data);
    }

    if (typeof data !== "string" || !isFloatLike(data)) {
        return false;
    }

    try {
        new Decimal(data);
        return isInRange(DOUBLE_RANGE, data);
    } catch {
        return true;
    }
}

/**
 * Check if data is a base64 encoded string.
 * https://github.com/chriso/validator.js/blob/master/src/lib/isBase64.js
 */
export function byte(data: unknown): boolean {
    if (typeof data !== "string") {
        return false;
    }

    if (data === "") {
        return true;
    }

    const notBase64 = /[^A-Z0-9+/=]/i;

    const len = data.length;
    if (len % 4 !== 0 || notBase64.test(data)) {
        return false;
    }

    const firstPaddingChar = data.indexOf('=');
    return firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 ||
        (firstPaddingChar === len - 2 && data[len - 1] === '=');
}
