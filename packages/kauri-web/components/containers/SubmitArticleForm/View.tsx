import React from "react";
import Form from "antd/lib/form";
import SubmitArticleFormActions from "./SubmitArticleFormActions";
import SubmitArticleFormHeader from "./SubmitArticleFormHeader";
import SubmitArticleFormContent from "./SubmitArticleFormContent";
import { IShowNotificationPayload } from "../../../lib/Module";
import AlertView from "../../../../kauri-components/components/Modal/AlertView";
import PublishingSelector, { IOption } from "./PublishingSelector";
import analytics from "../../../lib/analytics";

import {
  IAttributesPayload,
  IEditArticlePayload,
  ISubmitArticlePayload,
  ISubmitArticleVersionPayload,
  IDraftArticleActionPayload,
} from "./Module";

import { IPublishArticlePayload } from "./PublishArticleModule";
import Loading from "../../common/Loading";

interface IOwner {
  id: string;
  name: string;
}

interface IProps {
  router: any;
  draftArticleAction: (payload: IDraftArticleActionPayload) => void;
  submitArticleAction: (payload: ISubmitArticlePayload) => void;
  submitArticleVersionAction: (payload: ISubmitArticleVersionPayload) => void;
  editArticleAction: (payload: IEditArticlePayload) => void;
  publishArticleAction: (payload: IPublishArticlePayload) => void;
  id?: string;
  data?: any;
  article?: any;
  form: any;
  handleFormChange: any;
  routeChangeAction: any;
  showNotificationAction: (payload: IShowNotificationPayload) => void;
  username: string;
  userId: string;
  userAvatar: string;
  openModalAction: (children?: any) => void;
  closeModalAction: () => void;
  communities: IOption[];
}

interface ISubmitArticleVariables {
  subject: string;
  text: string;
  tags: string[];
  owner: IOwner;
  version?: string;
  attributes?: IAttributesPayload;
}

class SubmitArticleForm extends React.Component<IProps> {
  static Header = SubmitArticleFormHeader;
  static Actions = SubmitArticleFormActions;
  static Content = SubmitArticleFormContent;

  componentDidMount() {
    const {
      userId,
      router,
      routeChangeAction,
      communities,
      openModalAction,
      closeModalAction,
    } = this.props;
    if (!userId) {
      routeChangeAction(`/login?r=${router.asPath}&redirected=true`);
    } else {
      analytics.track("Write Article Start", {
        category: "generic",
      });
      if (
        communities &&
        communities.length > 0 &&
        !window.localStorage.getItem("community-publishing-modal")
      ) {
        openModalAction({
          children: (
            <AlertView
              title="Publish to Community"
              content={
                <div>
                  You can publish articles to your personal and also communities
                  when selecting Publish
                </div>
              }
              confirmButtonAction={() => {
                window.localStorage.setItem(
                  "community-publishing-modal",
                  Date.now().toString()
                );
                closeModalAction();
              }}
              closeModalAction={() => {
                window.localStorage.setItem(
                  "community-publishing-modal",
                  Date.now().toString()
                );
                closeModalAction();
              }}
              closeButtonText="Understood"
              confirmButtonText="Learn More"
            />
          ),
        });
      }
    }
    analytics.track("Write Article Start", {
      category: "generic",
    });
  }

  selectDestination() {
    const {
      openModalAction,
      closeModalAction,
      communities,
      userId,
    } = this.props;
    if (communities && communities.length > 0) {
      openModalAction({
        children: (
          <PublishingSelector
            userId={userId}
            closeModalAction={closeModalAction}
            communities={communities.map(i => {
              i.type = "COMMUNITY";
              return i;
            })}
            handleSubmit={this.handleSubmit}
          />
        ),
      });
    } else {
      this.handleSubmit("submit/update");
    }
  }

  validateForm(next: any) {
    this.props.form.validateFieldsAndScroll(async (formErr: any) => {
      if (formErr) {
        return this.showFormError(formErr);
      } else {
        next();
      }
    });
  }

  showFormError = (formErr: any) => {
    Object.keys(formErr).map(errKey =>
      formErr[errKey].errors.map((err: { message: string }) =>
        this.props.showNotificationAction({
          description: err.message,
          message: "Validation error!",
          notificationType: "error",
        })
      )
    );
    return console.error(formErr);
  };

  showGenericError = () => {
    return this.props.showNotificationAction({
      description:
        "Something went wrong with the article creation, please refresh the page and try again.",
      message: "Editor Error",
      notificationType: "error",
    });
  };

  handleSubmit = (
    submissionType: string,
    updateComment?: string,
    destination?: IOption
  ) => (e: React.SyntheticEvent<HTMLButtonElement>) => {
    console.log("*** SUBMITTING ***", updateComment);
    if (e) {
      e.preventDefault();
    }
    this.props.closeModalAction();
    this.props.form.validateFieldsAndScroll(
      async (
        formErr: any,
        { text, subject, attributes, tags }: ISubmitArticleVariables
      ) => {
        const {
          submitArticleAction,
          submitArticleVersionAction,
          editArticleAction,
          draftArticleAction,
          userId,
        } = this.props;

        if (formErr) {
          return this.showFormError(formErr);
        }

        const articleData: any = this.props.data && this.props.data.getArticle;
        text = JSON.stringify({ markdown: text });

        // NEW DRAFT
        if (!articleData && submissionType === "draft") {
          return draftArticleAction({
            attributes: attributes || {},
            subject,
            tags: tags || [],
            text,
          });
        }
        // NEW ARTICLE
        if (!articleData && submissionType === "submit/update") {
          return submitArticleAction({
            attributes,
            destination,
            selfPublish: true,
            subject,
            tags,
            text,
          });
        }

        const { id, version, status, author, owner } = articleData;

        if (!articleData.attributes) {
          articleData.attributes = {};
        }

        switch (status) {
          case "PUBLISHED":
            // OWNER'S DRAFT
            if (owner && userId === owner.id && submissionType === "draft") {
              return submitArticleVersionAction({
                attributes:
                  (articleData.attributes && {
                    ...articleData.attributes,
                    ...attributes,
                  }) ||
                  articleData.attributes,
                id,
                subject,
                tags: tags || articleData.tags,
                text,
              });
              // OWNER'S UPDATE
            } else if (
              owner &&
              userId === owner.id &&
              submissionType === "submit/update"
            ) {
              return submitArticleVersionAction({
                attributes:
                  (attributes && {
                    ...articleData.attributes,
                    ...attributes,
                  }) ||
                  articleData.attributes,
                id,
                owner,
                selfPublish: true,
                subject,
                tags: tags || articleData.tags,
                text,
              });
              // CONTRIBUTORS' DRAFT
            } else if (
              owner &&
              userId !== owner.id &&
              submissionType === "draft"
            ) {
              return submitArticleVersionAction({
                attributes:
                  (attributes && {
                    ...articleData.attributes,
                    ...attributes,
                  }) ||
                  articleData.attributes,
                id,
                owner,
                subject,
                tags: tags || articleData.tags,
                text,
              });
              // CONTRIBUTORS' UPDATE
            } else if (
              owner &&
              userId !== owner.id &&
              submissionType === "submit/update"
            ) {
              return submitArticleVersionAction({
                attributes:
                  (attributes && {
                    ...articleData.attributes,
                    ...attributes,
                  }) ||
                  articleData.attributes,
                id,
                owner,
                selfPublish: false,
                subject,
                tags: tags || articleData.tags,
                text,
                updateComment,
              });
            } else {
              return this.showGenericError();
            }
          case "DRAFT":
            if (author && userId === author.id && submissionType === "draft") {
              return editArticleAction({
                attributes:
                  (attributes && {
                    ...articleData.attributes,
                    ...attributes,
                  }) ||
                  articleData.attributes,
                id,
                subject,
                tags: tags || articleData.tags,
                text,
                version,
              });
            } else if (
              author &&
              userId === author.id &&
              submissionType === "submit/update"
            ) {
              return editArticleAction({
                attributes:
                  (attributes && {
                    ...articleData.attributes,
                    ...attributes,
                  }) ||
                  articleData.attributes,
                id,
                selfPublish: true,
                subject,
                tags: tags || articleData.tags,
                text,
                version,
              });
            } else {
              return this.showGenericError();
            }
          case "PENDING":
          // pending articles should not be shown in the editor
          default:
            return this.showGenericError();
        }
      }
    );
  };

  render() {
    const { routeChangeAction, userId } = this.props;

    if (!userId) {
      return <Loading />;
    }

    const articleData = this.props.data && this.props.data.getArticle;

    return (
      <Form>
        <SubmitArticleForm.Actions
          {...this.props.form}
          handleSubmit={this.handleSubmit}
          selectDestination={() =>
            this.validateForm(() => this.selectDestination())
          }
          routeChangeAction={routeChangeAction}
          text={articleData && articleData.content}
          status={articleData && articleData.status}
          userId={this.props.userId}
          author={articleData && articleData.author && articleData.author.id}
          owner={articleData && articleData.owner && articleData.owner.id}
          openModalAction={this.props.openModalAction}
          closeModalAction={this.props.closeModalAction}
          showNotificationAction={this.props.showNotificationAction}
        />
        <SubmitArticleForm.Header
          {...this.props.form}
          status={articleData && articleData.status}
          subject={articleData && articleData.title}
          attributes={articleData && articleData.attributes}
          tags={articleData && articleData.tags}
        />
        <SubmitArticleForm.Content
          {...this.props.form}
          id={articleData && articleData.id}
          text={articleData && articleData.content}
          ownerId={articleData && articleData.owner && articleData.owner.id}
          username={
            articleData && articleData.owner && articleData.owner.id
              ? articleData && articleData.owner && articleData.owner.username
              : (articleData &&
                  articleData.author &&
                  articleData.author.username) ||
                this.props.username
          }
          userId={
            (articleData && articleData.owner && articleData.owner.id) ||
            this.props.userId
          }
          userAvatar={
            articleData && articleData.owner && articleData.owner.id
              ? articleData && articleData.owner && articleData.owner.avatar
              : (articleData &&
                  articleData.author &&
                  articleData.author.avatar) ||
                this.props.userAvatar
          }
        />
      </Form>
    );
  }
}

const WrappedSubmitArticleForm = Form.create()(SubmitArticleForm);

export default WrappedSubmitArticleForm;
