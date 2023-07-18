import { average } from "../utils/for_testing.js";

describe("average", function () {
  test("of one value is the value itself", function () {
    expect(average([1])).toBe(1);
  });

  test("of many is calculated right", function () {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test("of empty array is zero", function () {
    expect(average([])).toBe(0);
  });
});
