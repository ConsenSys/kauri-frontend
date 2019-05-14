import * as React from "react";
import styled from "../../../lib/styled-components";
import Actions from "./CreateCommunityFormActions";
import Header from "./CreateCommunityFormHeader";
import Content from "./CreateCommunityFormContent";
import setImageUploader from "../../common/ImageUploader";
import {
  routeChangeAction,
  showNotificationAction as showNotification,
} from "../../../lib/Module";
import {
  createCommunityAction,
  updateCommunityAction,
  IInvitationsPayload,
} from "./Module";
import { Form, InjectedFormikProps } from "formik";
import Helmet from "react-helmet";
import { IFormValues } from "./index";
import { getCommunity } from "../../../queries/__generated__/getCommunity";
import {
  openModalAction,
  closeModalAction,
} from "../../../../kauri-components/components/Modal/Module";
import AddMemberModal from "./AddMemberModal";

export interface IProps {
  id: string | undefined;
  routeChangeAction: typeof routeChangeAction;
  createCommunityAction: typeof createCommunityAction;
  updateCommunityAction: typeof updateCommunityAction;
  openModalAction: typeof openModalAction;
  closeModalAction: typeof closeModalAction;
  data: getCommunity | null;
  userId: string;
  userAvatar: string | null;
  username: string | null;
  validateForm: () => Promise<any>;
  showNotificationAction: typeof showNotification;
}

const handleBackgroundSetFormField = (setFieldValue: any) => () =>
  setImageUploader((payload: any) => {
    setFieldValue("attributes.background", payload.background.background);
  }, "background");

const handleAvatarSetFormField = (setFieldValue: any) => () =>
  setImageUploader((payload: any) => {
    setFieldValue("avatar", payload.avatar.background);
  }, "avatar");

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Component: React.SFC<
  InjectedFormikProps<IProps, IFormValues>
> = props => {
  const openAddMemberModal = () =>
    props.openModalAction({
      children: (
        <AddMemberModal
          confirmButtonAction={(invitation: any) => {
            props.setFieldValue(
              "invitations",
              (props.values as any).invitations.concat(invitation)
            );
            props.closeModalAction();
          }}
          closeModalAction={props.closeModalAction}
        />
      ),
    });
  return (
    <Section>
      <Form>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://transloadit.edgly.net/releases/uppy/v0.24.3/dist/uppy.min.css"
          />
        </Helmet>

        <Actions
          showNotificationAction={props.showNotificationAction}
          validateForm={props.validateForm}
          id={props.id}
          goBack={() => props.routeChangeAction(`back`)}
          setupImageUploader={handleBackgroundSetFormField(props.setFieldValue)}
          isSubmitting={props.isSubmitting}
          background={
            props.values.attributes && props.values.attributes.background
          }
        />

        <Header
          {...props.values}
          userId={props.userId}
          userAvatar={props.userAvatar}
          username={props.username}
          tags={props.values.tags || []}
          avatar={props.values.avatar}
          background={
            props.values.attributes && props.values.attributes.background
          }
          openAddMemberModal={openAddMemberModal}
          uploadLogo={handleAvatarSetFormField(props.setFieldValue)}
          setFieldValue={props.setFieldValue}
        />

        <Content {...props} openAddMemberModal={openAddMemberModal} />
      </Form>
    </Section>
  );
};

export default Component;
