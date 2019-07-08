import * as React from "react";
import styled from "../../../lib/styled-components";
import TabsComponent from "../../../../kauri-components/components/Tabs";
import Manage from "../Community/Manage";
import { IInvitation } from "./ManageMembers/FormInviteMembersPanel";
import { getCommunity } from "../../../queries/__generated__/getCommunity";
import HomeContentSectionEmptyState from "./ContentSectionEmptyStates/HomeContentSectionEmptyState";
import ArticlesContentSectionEmptyState from "./ContentSectionEmptyStates/ArticlesContentSectionEmptyState";
import CollectionsContentSectionEmptyState from "./ContentSectionEmptyStates/CollectionsContentSectionEmptyState";
import { IFormValues } from "./index";
import HomepageContentField from "./HomepageTab/HomepageContentField";
import {
  openModalAction,
  closeModalAction,
} from "../../../../kauri-components/components/Modal/Module";

const Container = styled.section``;

// const DisplayFormikState = (props: any) => (
//   <div style={{ margin: "1rem 0", background: "#f6f8fa", padding: ".5rem" }}>
//     <strong>Injected Formik props (the form's state)</strong>
//     <div>
//       <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
//     </div>
//     <div>
//       <code>values:</code> {JSON.stringify(props.values, null, 2)}
//     </div>
//     <div>
//       <code>isSubmitting:</code> {JSON.stringify(props.isSubmitting, null, 2)}
//     </div>
//   </div>
// );
interface IProps {
  openAddMemberModal: () => void;
  id: string | null;
  cancelInvitation: (payload: { index: number }) => void;
  formInvitations: IInvitation[] | null | undefined;
  data: getCommunity | null;
  isCommunityAdmin: boolean;
  setFieldValue: (field: string, value: any) => void;
  values: IFormValues;
  openModalAction: typeof openModalAction;
  closeModalAction: typeof closeModalAction;
}

const Component: React.SFC<IProps> = props => (
  <Container>
    <TabsComponent
      padContent={true}
      dark={true}
      tabs={[
        {
          name: "Home",
        },
        {
          name: "Articles",
        },
        {
          name: "Collections",
        },
        {
          name: "Manage",
        },
        // process.env.NODE_ENV !== "production" && {
        //   name: "DEBUG",
        // },
      ]}
      panels={[
        props.isCommunityAdmin ? (
          <HomepageContentField
            id={String(props.id)}
            openModalAction={props.openModalAction}
            closeModalAction={props.closeModalAction}
            values={props.values}
          />
        ) : (
          <HomeContentSectionEmptyState key="home" />
        ),
        <ArticlesContentSectionEmptyState key="articles" />,
        <CollectionsContentSectionEmptyState key="collections" />,
        <Manage
          isCommunityAdmin={props.isCommunityAdmin}
          pageType={"CreateCommunityForm"}
          openAddMemberModal={props.openAddMemberModal}
          members={
            (props.data &&
              props.data.getCommunity &&
              props.data.getCommunity.members) ||
            null
          }
          pending={null}
          pendingUpdates={null}
          communityId={props.id}
          key="manage"
          formInvitations={props.formInvitations}
          cancelInvitation={props.cancelInvitation}
        />,
        // <ContentSection key="collections">
        //   <DisplayFormikState
        //     touched={props.touched}
        //     errors={props.errors}
        //     values={props.values}
        //     isSubmitting={props.isSubmitting}
        //   />
        // </ContentSection>,
      ]}
    />
  </Container>
);

export default Component;
