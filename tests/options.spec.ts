import Ajv from "ajv";
import * as openapi from "../";
import { createAjv } from "./helpers";

describe("float", () => {

    describe(".useDraft06", () => {
        let ajv: Ajv;
        let spy: jest.SpyInstance;
        beforeEach(() => {
            ajv = createAjv(false);
            spy = jest.spyOn(ajv, "addMetaSchema");
        });
        afterEach(() => {
            spy.mockRestore();
        });

        it("should add draft06 to ajv metaschemas by default", () => {
            openapi(ajv);

            expect(spy).toBeCalledTimes(1);
            expect(spy).toBeCalledWith(
                expect.objectContaining({
                    $schema: "http://json-schema.org/draft-06/schema#"
                })
            );
        });

        it("should not add draft06 to ajv metaschemas if useDraft04 = false", () => {
            openapi(ajv, { useDraft06: false });

            expect(spy).not.toBeCalled();
        });

    });

});
