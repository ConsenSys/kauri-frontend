// @flow
import React from "react";
import styled from "styled-components";
import GreenArrow from "../../common/GreenArrow";
import TriggerImageUploader from "../../common/ImageUploader";
import Stack from "stack-styled";
import ActionsSection from "../../../../kauri-components/components/Section/ActionsSection";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import SecondaryButton from "../../../../kauri-components/components/Button/SecondaryButton";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";

const UploadIcon = () => (
  <img src='https://png.icons8.com/color/50/000000/upload.png' />
);

const BackIcon = styled.div`
  width: 10px !important;
  height: 14px !important;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 10px solid ${props => props.theme.colors.primary};
`;

const SubmitArticleFormActions = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${props => props.theme.primaryTextColor};
  & > div {
    z-index: 10;
  }
`;

const ContainerRow = styled.div`
  display: flex;
  align-self: center;
  justify-self: flex-end;
  > :not(:last-child) {
    margin-right: ${props => props.theme.space[2]}px;
  }
  > :last-child {
    margin-right: 0px;
  }
`;

type Props = {
  routeChangeAction: string => void,
  handleSubmit: any => void,
  userId?: string,
  authorId?: string,
};

const setupImageUploader = (setFieldsValue, getFieldDecorator) => {
  getFieldDecorator("attributes");
  TriggerImageUploader(setFieldsValue, "attributes");
};

export default ({
  routeChangeAction,
  handleSubmit,
  userId,
  author,
  owner,
  status,
  setFieldsValue,
  getFieldDecorator,
}: Props) => (
  <SubmitArticleFormActions>
    <ActionsSection
      width={"100%"}
      justifyContent={["", "start"]}
      gridAutoFlow={["", "column"]}
      gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)'
    >
      <TertiaryButton
        icon={<BackIcon />}
        onClick={() => routeChangeAction("back")}
      >
        <span>Cancel Update</span>
      </TertiaryButton>
      <Stack
        alignItems={["", "center"]}
        justifyContent={["", "center"]}
        style={{ alignSelf: "center" }}
      >
        <TertiaryButton
          icon={<UploadIcon />}
          handleClick={() =>
            setupImageUploader(setFieldsValue, getFieldDecorator)
          }
        >
          Upload Background
        </TertiaryButton>
      </Stack>
      <ContainerRow>
        <SecondaryButton onClick={handleSubmit("draft")}>
          Save draft
        </SecondaryButton>
        <PrimaryButton onClick={handleSubmit("submit/update")}>
          {!status || !owner || owner === userId
            ? "Publish Article"
            : "Propose Update"}
        </PrimaryButton>
      </ContainerRow>
    </ActionsSection>
  </SubmitArticleFormActions>
);
