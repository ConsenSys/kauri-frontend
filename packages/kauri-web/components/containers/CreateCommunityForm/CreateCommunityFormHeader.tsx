import * as React from "react";
import { Field, FieldProps } from "formik";
import styled from "../../../lib/styled-components";
import PrimaryHeaderSection from "../../../../kauri-components/components/Section/PrimaryHeaderSection";
import { Label } from "../../../../kauri-components/components/Typography";
import UploadLogoButtonComponent from "../../../../kauri-components/components/Button/UploadLogoButton";
import AddMemberButtonComponent from "../../../../kauri-components/components/Button/AddMemberButton";
import { Input } from "../../../../kauri-components/components/Input";
import UserAvatarComponent from "../../../../kauri-components/components/UserAvatar";
import { IFormValues } from ".";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > *:nth-last-child(2) {
    margin-top: ${props => props.theme.space[3]}px;
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
  avatar: undefined | string;
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
        bg={props.avatar}
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
            fontSize={24}
            fontWeight={500}
            value={"Add community title"}
          />
        )}
      />
      <Field
        type="text"
        name="description"
        render={({ field }: FieldProps<IFormValues>) => (
          <Input {...field} fontSize={16} value={"Add description"} />
        )}
      />
      <Field
        type="text"
        name="website"
        render={({ field }: FieldProps<IFormValues>) => (
          <Input {...field} fontSize={12} value={"Add website"} />
        )}
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
