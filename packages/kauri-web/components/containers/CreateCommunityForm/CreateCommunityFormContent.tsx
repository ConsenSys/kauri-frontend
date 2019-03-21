import * as React from "react";
// import { Field } from "formik";
import styled from "../../../lib/styled-components";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";
import TabsComponent from "../../../../kauri-components/components/Tabs";
// import { Label } from "../../../../kauri-components/components/Typography";

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

const Component: React.SFC<{}> = _ => (
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
        <ContentSection key="home" />,
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
