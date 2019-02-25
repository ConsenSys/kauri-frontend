import * as React from "react";
import styled from "../../../lib/styled-components";
import TabsComponent from "../../../../kauri-components/components/Tabs";
import { Label } from "../../../../kauri-components/components/Typography";

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
      ]}
      panels={[<Label>HEY</Label>, <Label>2</Label>]}
    />
  </Container>
);

export default Component;
