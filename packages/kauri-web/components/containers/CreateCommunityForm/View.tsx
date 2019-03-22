import * as React from "react";
import styled from "../../../lib/styled-components";
import Actions from "./CreateCommunityFormActions";
import Header from "./CreateCommunityFormHeader";
import Content from "./CreateCommunityFormContent";
import setImageUploader from "../../common/ImageUploader";
import {
  routeChangeAction,
  IUser,
  showNotificationAction,
} from "../../../lib/Module";
import { createCommunityAction, updateCommunityAction } from "./Module";
import { InjectedFormikProps } from "formik";
import Helmet from "react-helmet";
import { IFormValues } from "./index";
import { getCommunity } from "../../../queries/__generated__/getCommunity";
import {
  openModalAction,
  closeModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import AddMemberModal from "./AddMemberModal";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export interface IProps {
  id: string | undefined;
  openModalAction: typeof openModalAction;
  closeModalAction: typeof closeModalAction;
  routeChangeAction: typeof routeChangeAction;
  createCommunityAction: typeof createCommunityAction;
  updateCommunityAction: typeof updateCommunityAction;
  showNotificationAction: typeof showNotificationAction;
  data: getCommunity | null;
  userId: string;
  userAvatar: string | null;
  username: string | null;
}

const handleBackgroundSetFormField = (setFieldValue: any) => () =>
  setImageUploader((payload: any) => {
    setFieldValue("attributes.background", payload.background.background);
  }, "background");

const handleAvatarSetFormField = (setFieldValue: any) => () =>
  setImageUploader((payload: any) => {
    setFieldValue("avatar", payload.avatar.background);
  }, "avatar");

interface IAddMemberModalProps {
  openModalAction: typeof openModalAction;
  closeModalAction: () => void;
  confirmButtonAction: (emailAddress: string, callback: any) => void;
}

const openAddMemberModal = (props: IAddMemberModalProps) => () => {
  props.openModalAction({
    children: (
      <AddMemberModal
        closeModalAction={props.closeModalAction}
        confirmButtonAction={props.confirmButtonAction}
      />
    ),
  });
};

interface IAddMemberModalConfirmProps {
  setFieldValue: any;
  showNotification: typeof showNotificationAction;
  members: string[];
}

const handleConfirmButton = ({
  setFieldValue,
  members,
  showNotification,
}: IAddMemberModalConfirmProps) => (emailAddress: string, callback: any) => {
  if (emailAddress.length <= 1) {
    showNotification({
      description: "Please fill out an email address",
      message: "Email address required",
      notificationType: "error",
    });
    return;
  }
  setFieldValue("memberInvites", members.concat(emailAddress));
  callback();
};

const CreateCommunityForm: React.SFC<
  InjectedFormikProps<IProps, IFormValues>
> = props => {
  return (
    <FormContainer onSubmit={props.handleSubmit}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://transloadit.edgly.net/releases/uppy/v0.24.3/dist/uppy.min.css"
        />
      </Helmet>

      <Actions
        id={props.id}
        goBack={() => props.routeChangeAction(`back`)}
        setupImageUploader={handleBackgroundSetFormField(props.setFieldValue)}
        isSubmitting={props.isSubmitting}
      />

      <Header
        {...props.values}
        userId={props.userId}
        openAddMemberModal={openAddMemberModal({
          closeModalAction: props.closeModalAction,
          confirmButtonAction: handleConfirmButton({
            members: props.values.members,
            setFieldValue: props.setFieldValue,
            showNotification: props.showNotificationAction,
          }),
          openModalAction: props.openModalAction,
        })}
        userAvatar={props.userAvatar}
        username={props.username}
        tags={props.values.tags || []}
        avatar={props.values.avatar}
        background={
          props.values.attributes && props.values.attributes.background
        }
        uploadLogo={handleAvatarSetFormField(props.setFieldValue)}
        setFieldValue={props.setFieldValue}
      />

      <Content {...props} />
    </FormContainer>
  );
};

export default CreateCommunityForm;
