import { Decimal } from "decimal.js";

export const BYTE_RANGE = {
    min: new Decimal("-128"),
    max: new Decimal("127")
};

export const INT32_RANGE = {
    min: new Decimal("-2147483648"),
    max: new Decimal("2147483647")
};

export const INT64_RANGE = {
    min: new Decimal("-9223372036854775808"),
    max: new Decimal("9223372036854775807")
};

export const FLOAT_RANGE = {
    min: new Decimal("3.4028234663852886e+38").negated(),
    max: new Decimal("3.4028234663852886e+38"),
};

export const DOUBLE_RANGE = {
    min: new Decimal("1.7976931348623157e+308").negated(),
    max: new Decimal("1.7976931348623157e+308")
};
