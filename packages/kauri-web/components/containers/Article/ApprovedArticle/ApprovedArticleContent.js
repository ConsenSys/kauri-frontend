// @flow
import React from "react";
import { Helmet } from "react-helmet";
import { EditorState, convertFromRaw } from "draft-js";
import { Link } from "../../../../routes";
import slugify from "slugify";
import {
  CreateRequestContent as SubmitArticleFormContent,
  CreateRequestContainer as SubmitArticleFormContainer,
  CreateRequestDetails,
} from "../../CreateRequestForm/CreateRequestContent";
import DescriptionRow from "../../Requests/DescriptionRow";
import {
  contentStateFromHTML,
  getHTMLFromMarkdown,
} from "../../../../lib/markdown-converter-helper";
import ShareArticle from "../../../../../kauri-components/components/Tooltip/ShareArticle";
import Outline from "../../../../../kauri-components/components/Outline";
import TertiaryButton from "../../../../../kauri-components/components/Button/TertiaryButton";
import userIdTrim from "../../../../lib/userid-trim";

export const ApprovedArticleDetails = styled(CreateRequestDetails)`
  align-items: inherit;
  > :last-child {
    margin-top: 0px;
  }
  > :not(:first-child) {
    margin-bottom: 20px;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const UpdateArticleSvgIcon = () => (
  <svg
    aria-hidden="true"
    data-prefix="fas"
    data-icon="file"
    role="img"
    viewBox="0 0 384 512"
  >
    <path
      fill="#0BA986"
      d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
    />
  </svg>
);

const ApprovedArticleHelmet = ({ blocks, contentState }) => {
  if (!blocks) return;

  let description = blocks.filter(({ text }) => text.length >= 40);
  description = description.length
    ? description.find(block => block.type.includes("unstyled")) &&
      description.find(block => block.type.includes("unstyled")).text
    : blocks.find(block => block.type.includes("unstyled")) &&
      blocks.find(block => block.type.includes("unstyled")).text;
  description =
    description && description.length > 120
      ? description.substring(0, 117) + "..."
      : description;
  let imageEntityKey = contentState && contentState.getLastCreatedEntityKey();
  let image =
    parseInt(imageEntityKey) && contentState.getEntity(imageEntityKey).toJS();
  if (image) image = image.data.src;

  return (
    <Helmet>
      <meta name="description" content={description} />
      {image && <meta name="image" content={image} />}
    </Helmet>
  );
};

export default ({
  text,
  username,
  userId,
  ownerId,
  authorId,
  userAvatar,
  routeChangeAction,
  article_id,
  article_version,
  subject,
  address,
  hostName,
  resourceType,
}: {
  text?: string,
  username?: ?string,
  userAvatar?: ?string,
  ownerId?: ?string,
  authorId: string,
  routeChangeAction: string => void,
  article_id: string,
  subject?: string,
  article_version: number,
  address?: string,
  hostName: string,
  resourceType: "user" | "community",
}) => {
  let editorState =
    typeof text === "string" && text[0] === "{" && JSON.parse(text);
  if (!editorState) {
    return (
      <SubmitArticleFormContent>
        <p>
          <span>{text}</span>
        </p>
      </SubmitArticleFormContent>
    );
  }
  editorState =
    editorState && typeof editorState.markdown === "string"
      ? editorState
      : EditorState.createWithContent(convertFromRaw(JSON.parse(text)));
  const contentState = editorState.markdown
    ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
    : editorState.getCurrentContent();

  const blocks =
    typeof editorState === "object" &&
    (editorState.markdown
      ? contentState.getBlocksAsArray().map(block => block.toJS())
      : editorState
          .getCurrentContent()
          .getBlocksAsArray()
          .map(block => block.toJS()));

  const outlineHeadings = blocks
    .filter(({ type }) => type.includes("header-one"))
    .map(({ text }) => text);

  return (
    <SubmitArticleFormContent>
      <ApprovedArticleHelmet contentState={contentState} blocks={blocks} />
      <SubmitArticleFormContainer type="approved article">
        <DescriptionRow fullText record={{ text }} />
      </SubmitArticleFormContainer>
      <ApprovedArticleDetails type="outline">
        <Outline
          linkComponent={children => (
            <Link
              useAnchorTag
              href={
                resourceType === "community"
                  ? `/community/${ownerId}`
                  : `/public-profile/${ownerId || authorId}`
              }
            >
              {children}
            </Link>
          )}
          headings={outlineHeadings || []}
          username={username}
          userId={
            (ownerId && userIdTrim(ownerId)) ||
            (authorId && userIdTrim(authorId))
          }
          userAvatar={userAvatar}
          text={ownerId ? "OWNER" : "AUTHOR"}
          routeChangeAction={routeChangeAction}
        />
        <TertiaryButton
          color={"textPrimary"}
          icon={<UpdateArticleSvgIcon />}
          handleClick={() =>
            userId
              ? routeChangeAction(
                  `/article/${article_id}/v${article_version}/update-article`
                )
              : routeChangeAction(
                  `/login?r=article/${article_id}/v${article_version}/update-article`
                )
          }
        >
          Update article
        </TertiaryButton>
        <ShareArticle
          color="textPrimary"
          url={`${hostName.replace(
            /api\./g,
            ""
          )}/article/${article_id}/${slugify(subject, {
            lower: true,
          })}`}
          title={subject}
        />
      </ApprovedArticleDetails>
    </SubmitArticleFormContent>
  );
};
