import test, { expect } from "@playwright/test"

const test_data = [
    {first: 2, second: 2, result: 4},
    {first: 1, second: 1, result: 2},
    {first: 987, second: 13, result: 1000}
]

for(const test_case of test_data) {
    test(`${test_case.first} + ${test_case.second} equals ${test_case.result}`, () => {
        expect(test_case.first + test_case.second).toBe(test_case.result);
    })
}

