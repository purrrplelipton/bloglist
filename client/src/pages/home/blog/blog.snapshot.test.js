import renderer from "react-test-renderer";
import { Blog, mockBlog } from ".";

test("should render Blog", () => {
  const tree = renderer.create(<Blog blog={mockBlog} />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
