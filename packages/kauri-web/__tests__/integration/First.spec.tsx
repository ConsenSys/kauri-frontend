import { render } from "../lib/render";

describe("First test", () => {
  it("should not lie", () => {
    const { getByTestId, store } = render(
      <div data-testid="hello world">hello world</div>
    );

    const state = store.getState();
    expect(getByTestId("hello world")).toHaveTextContent("hello world");
  });
});
