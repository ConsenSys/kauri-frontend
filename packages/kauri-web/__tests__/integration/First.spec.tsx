import { render } from "../lib/render";

describe("First test", () => {
  it("should not lie", () => {
    const { getByTestId } = render(
      <div data-test-id="hello world">hello world</div>
    );
    expect(getByTestId("hello world")).toHaveTextContent("hello world");
  });
});
