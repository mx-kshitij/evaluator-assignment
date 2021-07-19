import { Evaluator } from "../src/evaluator";

let evaluator;

describe("Evaluator", () => {

    it("evaluates a literal expression", function() {
        var r = evaluator.evaluate({ type: "literal", value: "true" });
        expect(r).toBeTruthy();
    });

    // todo: fix
    xit("evaluates a function expression", () => {
        expect(evaluator.evaluate({ type: "function", name: "add", parameters: [{ type: "literal", value: 0.3 }, { type: "literal", value: 0.6 }] })).toEqual(0.9);
    });

    test("throws an error for an invalid expression", () => {
        expect(() => evaluator.evaluate({ type: "" })).toThrow();
    });

    it("throws an error for an invalid function expression", () => {
        expect(() => evaluator.evaluate({ type: "function", name: "toString", parameters: [] })).toThrow();
    });

    afterAll(() => {
        evaluator = null;
    });

    beforeEach(() => {
        evaluator = new Evaluator();
    });
});