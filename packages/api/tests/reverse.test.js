import { reverse } from "../utils/for_testing.js";

test("reverse of a", function () {
  const result = reverse("a");
  expect(result).toBe("a");
});

test("reverse of react", function () {
  const result = reverse("react");
  expect(result).toBe("tcaer");
});

test("reverse of saippuakauppias", function () {
  const result = reverse("saippuakauppias");
  expect(result).toBe("saippuakauppias");
});
