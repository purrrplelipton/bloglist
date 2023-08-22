import { render, screen } from "@testing-library/react";
import { Blog, mockBlog } from ".";

describe("Blog", () => {
  afterEach(() => {});

  it("renders Blog component", async () => {
    render(<Blog blog={mockBlog} />);
    const element = await screen.findByText(
      /unraveling the enigmatic symphony/i
    );
    expect(element).toBeInTheDocument();
  });
});
