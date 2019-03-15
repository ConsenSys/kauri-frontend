import * as React from "react";
// import { Field } from "formik";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import TabsComponent from "../../../../kauri-components/components/Tabs";
import PrimaryButtonComponent from "../../../../kauri-components/components/Button/PrimaryButton";
import { curateResourceAction } from "./CurateResourceModule";
import { ResourceTypeInput } from "../../../__generated__/globalTypes";
import { approveResourceAction } from "./ApproveResourceModule";
// import { Label } from "../../../../kauri-components/components/Typography";

const Container = styled.section``;

interface IProps {
  curateResourceAction: typeof curateResourceAction;
  approveResourceAction: typeof approveResourceAction;
}

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

const HomeContent: React.SFC<{
  curateResourceAction: typeof curateResourceAction;
  approveResourceAction: typeof approveResourceAction;
}> = ({ curateResourceAction, approveResourceAction }) => (
  <ContentSection key="home">
    <PrimaryButtonComponent
      onClick={() => {
        // Community ID
        const id = "fb5bf47255864089a837e9c7212598b1";
        // Article Resource
        const resource = {
          id: "6d40c5992d4a41b58077687c318752f7",
          type: "ARTICLE" as ResourceTypeInput.ARTICLE,
          version: 1,
        };
        // Collection Resource
        // const resource = {
        //   id: "5bf35fcc746a100001602209",
        //   type: "COLLECTION" as ResourceTypeInput.COLLECTION,
        // };
        // curateResourceAction({ id, resource }, () => {});
        approveResourceAction({ id, resource }, () => {});
      }}
    >
      Attempt to add shizzle
    </PrimaryButtonComponent>
  </ContentSection>
);

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
        // process.env.NODE_ENV !== "production" && {
        //   name: "DEBUG",
        // },
      ]}
      panels={[
        <HomeContent
          key="home"
          curateResourceAction={props.curateResourceAction}
          approveResourceAction={props.approveResourceAction}
        />,
        <ContentSection key="articles" />,
        <ContentSection key="collections" />,
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
