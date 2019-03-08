import * as React from "react";
import { Field, FieldProps } from "formik";
import styled from "../../../lib/styled-components";
import PrimaryHeaderSection from "../../../../kauri-components/components/Section/PrimaryHeaderSection";
import { Label } from "../../../../kauri-components/components/Typography";
import UploadLogoButtonComponent from "../../../../kauri-components/components/Button/UploadLogoButton";
import AddMemberButtonComponent from "../../../../kauri-components/components/Button/AddMemberButton";
import { Input } from "../../../../kauri-components/components/Input";
import UserAvatarComponent from "../../../../kauri-components/components/UserAvatar";
import StatisticsContainer from "../../../../kauri-components/components/PublicProfile/StatisticsContainer";
import { IFormValues } from "./index";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > *:nth-last-child(2) {
    margin-top: ${props => props.theme.space[2]}px;
  }
  padding: ${props => props.theme.space[3]}px 0px;
`;

const CreateCommunityMembersContainer = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

interface IProps {
  avatar: null | undefined | string;
  uploadLogo: () => void;
  background: undefined | string;
}

const Component: React.SFC<IProps> = props => (
  <PrimaryHeaderSection
    justifyContent={["", "center"]}
    gridTemplateColumns={""}
    backgroundURL={props.background}
  >
    <Container>
      <UploadLogoButtonComponent
        bg={String(props.avatar)}
        handleClick={() => props.uploadLogo()}
        text="Logo"
        color="white"
      />
      <Field
        type="text"
        name="name"
        render={({ field }: FieldProps<IFormValues>) => (
          <Input
            {...field}
            textAlign="center"
            fontSize={24}
            fontWeight={500}
            placeHolder={"Add community title"}
          />
        )}
      />
      <Field
        type="text"
        name="description"
        render={({ field }: FieldProps<IFormValues>) => (
          <Input
            {...field}
            textAlign="center"
            fontSize={16}
            placeHolder={"Add description"}
          />
        )}
      />
      <Field
        type="text"
        name="website"
        render={({ field }: FieldProps<IFormValues>) => (
          <Input
            {...field}
            textAlign="center"
            fontSize={12}
            placeHolder={"Add website"}
          />
        )}
      />
      <StatisticsContainer
        pageType={"CreateCommunityPage"}
        statistics={[
          { name: "Articles", count: 0 },
          { name: "Collections", count: 0 },
        ]}
      />
      <Label color="white">Moderators</Label>
      <CreateCommunityMembersContainer>
        <UserAvatarComponent
          variant="white"
          fullWidth={true}
          username={"rej156"}
          userId={"1234567890"}
          avatar={null}
        />
        <AddMemberButtonComponent onClick={() => {}} />
      </CreateCommunityMembersContainer>
    </Container>
  </PrimaryHeaderSection>
);

export default Component;
