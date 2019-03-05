import * as React from "react";
import { Field } from "formik";
import styled from "../../../lib/styled-components";
import TabsComponent from "../../../../kauri-components/components/Tabs";
// import { Label } from "../../../../kauri-components/components/Typography";
import ContentSection from "../../../../kauri-components/components/Section/ContentSection";

const Container = styled.section``;

interface IProps {}

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
      ]}
      panels={[
        <ContentSection key="home" />,
        <ContentSection key="articles" />,
        <ContentSection key="collections" />,
      ]}
    />
  </Container>
);

export default Component;
