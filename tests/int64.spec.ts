import { createAjv } from "./helpers";
import { int64 as validateInt64 } from "../lib/validators";

describe("int64", () => {

    it("should be true if value is an integer and is in range", () => {
        const ajv = createAjv();
        const validator = ajv.compile({ type: "integer", format: "int64" });

        expect(validator(-9234234)).toBe(true);
        expect(validator(0)).toBe(true);
        expect(validator(1)).toBe(true);
        expect(validator(1.0)).toBe(true);
        expect(validator(999)).toBe(true);
        expect(validator(912312399)).toBe(true);
        expect(validator(Number.MAX_SAFE_INTEGER)).toBe(true);
    });

    it("should be false if value is an integer and out-of-range", () => {
        const ajv = createAjv();
        const validator = ajv.compile({ type: "integer", format: "int64" });

        expect(validator(-9.223372036854776e18)).toBe(false);
        expect(validator(9.223372036854776e18)).toBe(false);
    });

    it("should be false if value is not an integer", () => {
        const ajv = createAjv();
        const validator = ajv.compile({ type: "integer", format: "int64" });

        expect(validator(1.1)).toBe(false);
        expect(validator(-923423.4)).toBe(false);
        expect(validator(-1.1)).toBe(false);
        expect(validator("a")).toBe(false);
        expect(validator(new Date())).toBe(false);
        expect(validator({})).toBe(false);
        expect(validator([])).toBe(false);
    });

    it("should validate exact int64 string boundaries directly", () => {
        expect(validateInt64("-9223372036854775808")).toBe(true);
        expect(validateInt64("9223372036854775807")).toBe(true);
        expect(validateInt64("-9223372036854775809")).toBe(false);
        expect(validateInt64("9223372036854775808")).toBe(false);
    });

});
