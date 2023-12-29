import {sameKeys} from "./object.utils.ts";

describe("test various object utilities", () => {
    test("should have always same object keys no matter what", () => {
        expect(sameKeys({
            a: 1,
            b: 2,
            c: 3
        }, {
            a: 3231,
            b: 442,
            c: 1233
        })).toBeTruthy()

        expect(sameKeys({
            a: 1,
            b: 2,
            c: {
                d: 1,
                e: 2,
                f: 3,
            }
        }, {
            a: 3231,
            b: 442,
            c: 1233
        })).toBeFalsy()

        expect(sameKeys({
            a: 1,
            b: 2,
            c: {
                d: 1,
                e: 2,
                f: 3,
            }
        }, {
            a: 3231,
            b: 442,
            c: {
                d: 45,
                e: "",
                f: false,
            }
        })).toBeTruthy()
    })

    test("should not have sameKeys due to missing property", () => {
        expect(sameKeys({
            a: 1,
            b: 2,
            c: {
                d: 1,
                e: 2,
                f: 3,
            }
        }, {
            a: 3231,
            b: 442,
            c: {
                e: "",
                f: false,
            }
        })).toBeFalsy()
    })
})