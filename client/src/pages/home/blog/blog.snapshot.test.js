import renderer from "react-test-renderer";
import { Blog } from ".";

test("should render Blog", () => {
  const tree = renderer.create(<Blog />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
