import { cleanup, render, screen } from "@testing-library/react"
import React from "react"
import { Blog, mockBlog } from "."

test("should render content", () => {
  cleanup()

  render(<Blog blog={mockBlog} />)

  const element = screen.getByText("unravelling enigmatic")
  expect(element).toBeDefined()

  cleanup()
})
