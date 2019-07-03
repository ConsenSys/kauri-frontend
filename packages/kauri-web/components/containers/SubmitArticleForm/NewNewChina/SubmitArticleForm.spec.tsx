import { render, cleanup, fireEvent } from "../../../../__tests__/lib/render";
import RenderPublishedNotOwnerWithQuery, {
  mockVariables as publishedNotOwnerVariables,
  mockResult as publishedNotOwnerResult,
} from "./mocks/getArticle_PublishedNotOwner";
import RenderPublishedOwnerWithQuery, {
  mockVariables as publishedOwnerVariables,
  mockResult as publishedOwnerResult,
} from "./mocks/getArticle_PublishedOwner";
import RenderFreshWithQuery, {
  mockVariables as freshVariables,
} from "./mocks/getArticle_Fresh";
import RenderPublishedCommunityOwnerWithQuery, {
  mockVariables as publishedCommunityOwnerVariables,
  mockResult as publishedCommunityOwnerResult,
} from "./mocks/getArticle_PublishedOwner";
import mockInitialState from "../../../../__tests__/lib/mock-redux-initial-state";
import SubmitArticleForm, { prefixTestId } from "./index";
import wait from "waait";
import { SELECT_DESTINATION, DRAFT_ARTICLE, EDIT_ARTICLE } from "../Module";
import { OPEN_MODAL } from "../../../../../kauri-components/components/Modal/Module";

afterEach(cleanup);

describe("SubmitArticleForm", () => {
  it("fresh", async () => {
    const mockHandleSubmit = jest.fn();

    const { getByTestId } = render(
      <RenderFreshWithQuery>
        <SubmitArticleForm
          id={freshVariables.id}
          version={freshVariables.version}
          onSubmit={mockHandleSubmit}
        />
      </RenderFreshWithQuery>,
      { initialState: mockInitialState }
    );

    await wait(0);

    const inputTitle = getByTestId(prefixTestId("title"));
    const publishButton = getByTestId(prefixTestId("publish"));
    const tagInput = getByTestId(prefixTestId("tag-input"));
    const uploadBackgroundButton = getByTestId(
      prefixTestId("upload-background")
    );

    expect(uploadBackgroundButton).toHaveTextContent("Upload Background");
    expect(inputTitle).toHaveValue("");
    expect(tagInput).toHaveValue("");
    expect(publishButton).toHaveTextContent("Publish Article");
  });

  it("fresh -> published, personal", async () => {
    const mockHandleSubmit = jest.fn();

    const { getByTestId, store } = render(
      <RenderFreshWithQuery>
        <SubmitArticleForm
          id={freshVariables.id}
          version={freshVariables.version}
          onSubmit={mockHandleSubmit}
        />
      </RenderFreshWithQuery>,
      { initialState: mockInitialState }
    );

    await wait(0);

    const state = store.getState();
    expect(state.app.hostName).toBe("api.dev.kauri.io");

    const inputTitle = getByTestId(prefixTestId("title"));
    const publishButton = getByTestId(prefixTestId("publish"));

    expect(inputTitle).toHaveValue("");

    const newTitle = "new title";
    fireEvent.change(inputTitle, {
      target: { value: newTitle },
    });

    expect(inputTitle).toHaveValue(newTitle);
    expect(publishButton).toHaveTextContent("Publish Article");

    fireEvent.click(publishButton);

    await wait(0);

    expect(
      store.getActions().find(({ type }) => type === SELECT_DESTINATION)
    ).toBeTruthy();
  });

  it("published, not owner -> propose", async () => {
    const mockHandleSubmit = jest.fn();

    const { getByTestId, store } = render(
      <RenderPublishedNotOwnerWithQuery>
        <SubmitArticleForm
          id={publishedNotOwnerVariables.id}
          version={publishedNotOwnerVariables.version}
          onSubmit={mockHandleSubmit}
        />
      </RenderPublishedNotOwnerWithQuery>,
      { initialState: mockInitialState }
    );

    await wait(0);

    const state = store.getState();
    expect(state.app.hostName).toBe("api.dev.kauri.io");

    const inputTitle = getByTestId(prefixTestId("title"));
    const proposeButton = getByTestId(prefixTestId("propose"));

    const newTitle = "new title";

    expect(inputTitle).toHaveValue(
      publishedNotOwnerResult.data.getArticle.title
    );

    fireEvent.change(inputTitle, {
      target: { value: newTitle },
    });

    expect(inputTitle).toHaveValue(newTitle);
    expect(proposeButton).toHaveTextContent("Propose Update");

    fireEvent.click(proposeButton);

    await wait(0);

    expect(
      store.getActions().find(({ type }) => type === OPEN_MODAL)
    ).toBeTruthy();
  });

  it("published, owner -> update", async () => {
    const mockHandleSubmit = jest.fn();

    const { getByTestId, store } = render(
      <RenderPublishedOwnerWithQuery>
        <SubmitArticleForm
          id={publishedOwnerVariables.id}
          version={publishedOwnerVariables.version}
          onSubmit={mockHandleSubmit}
        />
      </RenderPublishedOwnerWithQuery>,
      { initialState: mockInitialState }
    );

    await wait(0);

    const state = store.getState();
    expect(state.app.hostName).toBe("api.dev.kauri.io");

    const inputTitle = getByTestId(prefixTestId("title"));
    const updateButton = getByTestId(prefixTestId("update"));

    const newTitle = "new title";

    expect(inputTitle).toHaveValue(publishedOwnerResult.data.getArticle.title);

    fireEvent.change(inputTitle, {
      target: { value: newTitle },
    });

    expect(inputTitle).toHaveValue(newTitle);
    expect(updateButton).toHaveTextContent("Update Article");

    fireEvent.click(updateButton);

    await wait(0);

    expect(
      store.getActions().find(({ type }) => type === EDIT_ARTICLE)
    ).toBeTruthy();
  });

  it("published, owner -> draft", async () => {
    const mockHandleSubmit = jest.fn();

    const { getByTestId, store } = render(
      <RenderPublishedOwnerWithQuery>
        <SubmitArticleForm
          id={publishedOwnerVariables.id}
          version={publishedOwnerVariables.version}
          onSubmit={mockHandleSubmit}
        />
      </RenderPublishedOwnerWithQuery>,
      { initialState: mockInitialState }
    );

    await wait(0);

    const state = store.getState();
    expect(state.app.hostName).toBe("api.dev.kauri.io");

    const inputTitle = getByTestId(prefixTestId("title"));
    const draftButton = getByTestId(prefixTestId("draft"));

    const newTitle = "new title";

    expect(inputTitle).toHaveValue(publishedOwnerResult.data.getArticle.title);

    fireEvent.change(inputTitle, {
      target: { value: newTitle },
    });

    expect(inputTitle).toHaveValue(newTitle);
    expect(draftButton).toHaveTextContent("Save Draft");

    fireEvent.click(draftButton);

    await wait(0);

    expect(
      store.getActions().find(({ type }) => type === DRAFT_ARTICLE)
    ).toBeTruthy();
  });

  it.only("published, community owner, is in community", async () => {
    const mockHandleSubmit = jest.fn();

    const { getByTestId, store } = render(
      <RenderPublishedCommunityOwnerWithQuery>
        <SubmitArticleForm
          id={publishedNotOwnerVariables.id}
          version={publishedNotOwnerVariables.version}
          onSubmit={mockHandleSubmit}
        />
      </RenderPublishedCommunityOwnerWithQuery>,
      { initialState: mockInitialState }
    );

    await wait(0);

    const state = store.getState();
    expect(state.app.hostName).toBe("api.dev.kauri.io");

    const inputTitle = getByTestId(prefixTestId("title"));
    const updateButton = getByTestId(prefixTestId("update"));

    const newTitle = "new title";

    expect(inputTitle).toHaveValue(
      publishedNotOwnerResult.data.getArticle.title
    );

    fireEvent.change(inputTitle, {
      target: { value: newTitle },
    });

    expect(inputTitle).toHaveValue(newTitle);
    expect(updateButton).toHaveTextContent("Update Article");

    fireEvent.click(updateButton);

    await wait(0);

    expect(
      store.getActions().find(({ type }) => type === EDIT_ARTICLE)
    ).toBeTruthy();
  });
});
