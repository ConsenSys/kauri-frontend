import { render } from "../lib/render";

describe("First test", () => {
  it("should not lie", () => {
    const { getByText } = render(<div>hello world</div>);
    expect(getByText("hello world")).toHaveTextContent("hello world");
  });
});
