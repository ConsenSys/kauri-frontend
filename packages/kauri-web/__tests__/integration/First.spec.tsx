import { render } from "../lib/render";
import RenderWithQuery, {
  mockVariables,
  mockResult,
} from "../mocks/SubmitArticleForm/getArticlePublished";
import { Query } from "react-apollo";
import { getArticle } from "../../queries/Article";
import wait from "waait";
import mockInitialState from "../lib/mock-redux-initial-state";

const Dog = () => (
  <Query<typeof mockResult["data"], typeof mockVariables>
    query={getArticle}
    variables={mockVariables}
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error!</p>;
      }

      return <p data-testid={"hello world"}>{data.getArticle.author.id}</p>;
    }}
  </Query>
);

describe("First test", () => {
  it("should not lie", async () => {
    const { getByTestId, store } = render(
      <RenderWithQuery>
        <Dog />
      </RenderWithQuery>,
      { initialState: mockInitialState }
    );

    await wait(0);

    const state = store.getState();
    expect(state.app.hostName).toBe("api.dev.kauri.io");
    expect(getByTestId("hello world")).toHaveTextContent(
      mockResult.data.getArticle.author.id
    );
  });
});
