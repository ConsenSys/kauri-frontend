import * as React from "react";
import { InjectedFormikProps } from "formik";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import TabsComponent from "../../../../kauri-components/components/Tabs";
// import { Label } from "../../../../kauri-components/components/Typography";
import ManageCommunity from '../ManageCommunity'
import { IFormValues } from "./index";
import { IProps } from "./View";

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
}

const Component: React.SFC<InjectedFormikProps<IProps, IFormValues>> = props => (
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
          name: "Manage Community",
        },
        // process.env.NODE_ENV !== "production" && {
        //   name: "DEBUG",
        // },
      ]}
      panels={[
        <ContentSection key="home" />,
        <ContentSection key="articles" />,
        <ContentSection key="collections" />,
        <ManageCommunity key="manage-community"
          openAddMemberModal={props.openAddMemberModal}
          members={props.values.members}
        />
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
