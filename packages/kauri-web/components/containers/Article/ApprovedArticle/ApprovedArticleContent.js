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
import AlertView from "../../../../../kauri-components/components/Modal/AlertView";
import Outline from "../../../../../kauri-components/components/Outline";
import TertiaryButton from "../../../../../kauri-components/components/Button/TertiaryButton";
import styled from "../../../../lib/styled-components";
import userIdTrim from "../../../../lib/userid-trim";
import { BodyCard } from "../../../../../kauri-components/components/Typography";
import { INFT } from "../../../../../kauri-components/components/Kudos/NFTList";
import AddIcon from "../../../../../kauri-components/components/Icon/AddIcon";
import AddToCollectionConnection from "../../../connections/AddToCollection";
import { Label } from "../../../../../kauri-components/components/Typography";
import RelatedArticles from "../../../../../kauri-components/components/RelatedArticles";
import { Divider } from "../../../../../kauri-components/components/Outline";

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

const DeleteDraftArticleSvgIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="18" height="18" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="scale(0.00833333)" />
      </pattern>
      <image
        id="image0"
        width="120"
        height="120"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAABmJLR0QA/wD/AP+gvaeTAAAFS0lEQVR4nO3cT0ycRRzG8WfeXRYTobsYapvGEC/20miMF6I2EaOE4h3u2CpJT5C2AZUDB9SSgJAYSaBV7rYHvZgigo3/Ug41MRUTPBnioXiQpeKh7+77jgd2G4KUfXffmXc7P57PkW5mNvvtzvuyMwtARERERERERERERGSXqvcTMOHJKxefU1p/AIUOAI/HHO5fAN8iDN/d6J+6E//Z1ZfzgY/OXXreU+H3AJoMD72tPX36r7Mf/WJ43ER59X4CcXkqnID5uADQpEI1YWHcRLkdeHQ0DaDD4gwdpTmcZWWJPj43eEor70NovAKFIzbmEEPjHjzcVB7eufvm5G+mhzce+Njs4LPwvJ9gZ9mUbBth+JLpGzvzS7TnTYJxa9EEZf6abzbw5z0p2L0myqbUq6XX0Bi3b7KoIrOBe68FAG4aHfMQUcBy6TU0xvw7OAwvANg2Pq58/+gwvGR6UOOBN/qn7qgU2gH9JYC86fEFykPjCw9Bu4SPRomIiIiIiIjqyfqRnWNXLmjbc7hs461Jqw242SAcAwvHwMIxsHAMLBwDC8fAwjGwcAwsHAMLx8DCMbBwDCwcAwvHwMIxsHAMLBwDC8fAwjkZWANrCugJwuBEEAYnFNCjgN9dGT9Jzv0FGQ2sPVZoeHH9/OXNXT++npsf+KYxSN2ARnusCRRW/FRwJt83vfubkdfbZoaX/IbCLQ2cjDV+wpx7B3vAyJ64AIB833TeD9JdUFipeXCFFT9Id+2JCwBYP395E0qP1Dx2nTgXOEh7Pzzs3zb7x7f8IN0F4FYNQ99u9Bu6N/vHtx72gFAH39Uwbl05F1j7hQPPEW/2j2/5YfoMqot8u7HQ0LnfyrBb6DUa/QMpSXAucDrlna70mAeRoyzXCit+mH6tUlwASOviyxGf5iPDucDQaiw3P5Cr9LAHy/VBkUvX3IOW5bLc/EAOWo1V+WzrzrnAGjiZKXpLT10dfKLSYytckytec8taZoeyjUHqhmt30ICDgQFAQb3ga7UYOfL/r8mRrrnATtxMqrgQ+9evOnEyMBAr8qGJCzgcGNiJXID3VcvsULbSY8uRo95QSYgLCPn6qIb+OaN055/npv42MV6Scfn10QiqWa4rkfLOLRMRGDATWVpcQFBgIF5kiXEBYYGB2iJLjQs4uF0YhYLSnp+p7uZOQ+TfEhH3DkYVv+eW1bhB4QRpgauOWyY1sqTANcctkxhZSuDYccukRXY/cBX7uS2zQ9lqPtaMdfznEeF64Kq2/DKp4kKDV1g2sNXoDJcD17QrZGCr0SmuBo615XeYIjsXWANr99PB63G3/KrdaryfDrpdPPzuXGAPGNnv3PJekT5+1GjPpIoLUSLn+6bzPBedgIPORZdV9dmyRnvUGy+ei05ApXPRtWwcRL0m81x0Ag46Fx1nVyjKNZnnopOg1VjbzHDL3h/n5gdysbf8Stfk/c5dt80Mt7h4LtrJM1mlu9n3imHwI7DzrtZQ70PjGRfG3832mSwn94NLB9CvpbydS6I2/F/I9vhJcm+JpqowsHAMLBwDC8fAwjGwcAwsHAMLx8DCMbBwDCxcEoG3E5jDTRr3bE9hP7DGuvU5XKXsvzb2A3tYtD6Ho5RSX9ueI4ElWl0FENifxzkBwuAz25NYD7xxbuJXrTBrex4Hzdx9e2rV9iSJ3EUfPdI8CGA5ibkcsdSabb6YxESJBF7tHfVbs83dGvgEh3u5DgB83JptfmO1d9RPYkLrZ7L2Oj43eErDOwuFTgBPA2hK+jkkbBvAH9BYVAg/TWJZJiIiIiIiIiIiIiIiIiIi+f4Dnd1WAMhT8bQAAAAASUVORK5CYII="
      />
    </defs>
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
  id,
  version,
  subject,
  status,
  address,
  hostName,
  resourceType,
  openModalAction,
  closeModalAction,
  deleteDraftArticleAction,
  nfts,
  relatedArticles,
}: {
  text?: string,
  username?: ?string,
  userAvatar?: ?string,
  ownerId?: ?string,
  authorId: string,
  routeChangeAction: string => void,
  id: string,
  version: number,
  status: string,
  subject?: string,
  address?: string,
  hostName: string,
  nfts: INFT[],
  relatedArticles: ArticleDTO[],
  resourceType: "USER" | "COMMUNITY",
  openModalAction: ({ children: React.ReactNode }) => void,
  closeModalAction: () => void,
  deleteDraftArticleAction: ({ id: string, version: number }) => void,
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
          relatedArticles={relatedArticles}
          nfts={nfts}
          linkComponent={children => (
            <Link
              useAnchorTag
              href={
                resourceType === "COMMUNITY"
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
        {status !== "DRAFT" && userId && (
          <TertiaryButton
            color={"textPrimary"}
            icon={<AddIcon />}
            handleClick={() =>
              openModalAction({
                children: (
                  <AddToCollectionConnection articleId={id} version={version} />
                ),
              })
            }
          >
            Add To Collection
          </TertiaryButton>
        )}
        <TertiaryButton
          color={"textPrimary"}
          icon={<UpdateArticleSvgIcon />}
          handleClick={() =>
            userId
              ? routeChangeAction(`/article/${id}/v${version}/update-article`)
              : routeChangeAction(
                  `/login?r=article/${id}/v${version}/update-article`
                )
          }
        >
          {`Update ${status === "DRAFT" ? "draft" : "article"}`}
        </TertiaryButton>
        {status === "DRAFT" && userId === authorId && (
          <TertiaryButton
            color={"textPrimary"}
            icon={<DeleteDraftArticleSvgIcon />}
            handleClick={() =>
              openModalAction({
                children: (
                  <AlertView
                    closeModalAction={() => closeModalAction()}
                    confirmButtonAction={() =>
                      deleteDraftArticleAction(
                        { id, version },
                        closeModalAction
                      )
                    }
                    content={
                      <div>
                        <BodyCard>
                          You won't be able to retrieve the draft article after
                          deleting.
                        </BodyCard>
                      </div>
                    }
                    title={"Are you sure?"}
                  />
                ),
              })
            }
          >
            Delete Draft Article
          </TertiaryButton>
        )}
        <ShareArticle
          color="textPrimary"
          url={`${hostName.replace(/api\./g, "")}/article/${id}/${slugify(
            subject,
            {
              lower: true,
            }
          )}?utm_campaign=read`}
          title={subject}
        />
        <Divider />
        <RelatedArticles
          routeChangeAction={routeChangeAction}
          relatedArticles={relatedArticles}
        />
      </ApprovedArticleDetails>
    </SubmitArticleFormContent>
  );
};
