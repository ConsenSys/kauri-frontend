import React from "react";
import styled from "styled-components";
import TriggerImageUploader from "../../common/ImageUploader";
import Stack from "stack-styled";
import ActionsSection from "../../../../kauri-components/components/Section/ActionsSections";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import SecondaryButton from "../../../../kauri-components/components/Button/SecondaryButton";
import TertiaryButton from "../../../../kauri-components/components/Button/TertiaryButton";
import ProposeUpdateModal from "./ProposeUpdateModal";

const UploadIcon = () => (
  <img src="https://png.icons8.com/color/50/000000/upload.png" />
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

interface IProps {
  routeChangeAction: (route: string) => void;
  handleSubmit: (submissionType: string, updateComment?: string) => void;
  userId: string;
  openModalAction: (children: any) => void;
  closeModalAction: () => void;
  owner: string;
  status: string;
  getFieldDecorator: (field: string, arg1: any) => any;
  setFieldsValue: ({ text }: { text: string }) => void;
}

const setupImageUploader = (setFieldsValue: any, getFieldDecorator: any) => {
  getFieldDecorator("attributes");
  TriggerImageUploader(setFieldsValue, "attributes");
};

const isOwner = (status: string, owner: string, userId: string) =>
  !status || !owner || owner === userId;

export default ({
  routeChangeAction,
  handleSubmit,
  userId,
  owner,
  status,
  setFieldsValue,
  getFieldDecorator,
  closeModalAction,
  openModalAction,
}: IProps) => (
  <SubmitArticleFormActions>
    <ActionsSection
      width={"100%"}
      justifyContent={["", "start"]}
      gridAutoFlow={["", "column"]}
      gridTemplateColumns="minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)"
    >
      <TertiaryButton
        icon={<BackIcon />}
        onClick={() => routeChangeAction("back")}
      >
        <span>Go Back</span>
      </TertiaryButton>
      <Stack
        alignItems={["", "center"]}
        justifyContent={["", "center"]}
        gridAutoFlow={["row"]}
        gap={20}
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
        <SecondaryButton onClick={() => handleSubmit("draft")}>
          Save draft
        </SecondaryButton>
        {isOwner(status, owner, userId) ? (
          <PrimaryButton onClick={() => handleSubmit("submit/update")}>
            Publish Article
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={() =>
              openModalAction({
                children: (
                  <ProposeUpdateModal
                    closeModalAction={() => closeModalAction()}
                    confirmModal={handleSubmit}
                  />
                ),
              })
            }
          >
            Propose Update
          </PrimaryButton>
        )}
      </ContainerRow>
    </ActionsSection>
  </SubmitArticleFormActions>
);
