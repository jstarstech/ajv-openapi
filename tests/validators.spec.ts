import { byte, double, float, int32, int64 } from "../lib/validators";
import { DOUBLE_RANGE } from "../lib/ranges";

describe("direct validators", () => {

    it("should return false for malformed numeric inputs", () => {
        const invalidValues = [null, undefined, "", " ", "foo", {}, []] as any[];

        for (const value of invalidValues) {
            expect(() => int32(value)).not.toThrow();
            expect(int32(value)).toBe(false);

            expect(() => int64(value)).not.toThrow();
            expect(int64(value)).toBe(false);

            expect(() => float(value)).not.toThrow();
            expect(float(value)).toBe(false);

            expect(() => double(value)).not.toThrow();
            expect(double(value)).toBe(false);
        }
    });

    it("should accept empty byte input and reject malformed byte inputs", () => {
        expect(byte("")).toBe(true);
        expect(byte(null as any)).toBe(false);
        expect(byte(undefined as any)).toBe(false);
    });

    it("should validate exact int64 string boundaries", () => {
        expect(int64("-9223372036854775808")).toBe(true);
        expect(int64("9223372036854775807")).toBe(true);
        expect(int64("-9223372036854775809")).toBe(false);
        expect(int64("9223372036854775808")).toBe(false);
    });

    it("should accept exact integers above the safe range when still in range", () => {
        expect(int64(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(int64(Number.MAX_SAFE_INTEGER + 1)).toBe(true);
        expect(int64(Number.MAX_SAFE_INTEGER + 3)).toBe(true);
        expect(int64(9223372036854776000)).toBe(false);
    });

    it("should accept integer strings with signs and leading zeroes", () => {
        for (const value of ["01", "+1", "-01", "-0"]) {
            expect(int32(value)).toBe(true);
            expect(int64(value)).toBe(true);
        }
    });

    it("should reject malformed integer strings", () => {
        for (const value of ["1.0", "1e3", "foo", "", " "]) {
            expect(int32(value)).toBe(false);
            expect(int64(value)).toBe(false);
        }
    });

    it("should accept numeric strings for float and double", () => {
        for (const value of ["0", "1.0", "01", "1e3", "-3.4e38"]) {
            expect(float(value as any)).toBe(true);
            expect(double(value as any)).toBe(true);
        }
    });

    it("should accept float syntax that Decimal cannot parse", () => {
        for (const value of ["+.", "-.", "e0", "e1", "+e0", ".e0"]) {
            expect(float(value as any)).toBe(true);
            expect(double(value as any)).toBe(true);
        }
    });

    it("should enforce the true float boundary", () => {
        expect(float(3.4028234663852886e38)).toBe(true);
        expect(float(3.4028235e38)).toBe(false);
        expect(float(-3.4028234663852886e38)).toBe(true);
        expect(float(-3.4028235e38)).toBe(false);
    });

    it("should expose the true double boundary", () => {
        expect(DOUBLE_RANGE.max.toString()).toBe("1.7976931348623157e+308");
        expect(DOUBLE_RANGE.min.toString()).toBe("-1.7976931348623157e+308");
    });

});
