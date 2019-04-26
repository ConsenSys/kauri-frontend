import * as React from "react";
import Stack from "stack-styled";
import { Field, FieldProps } from "formik";
import { space } from "styled-system";
import styled from "../../../lib/styled-components";
import PrimaryHeaderSection from "../../../../kauri-components/components/Section/PrimaryHeaderSection";
import { Label } from "../../../../kauri-components/components/Typography";
import UploadLogoButtonComponent from "../../../../kauri-components/components/Button/UploadLogoButton";
import AddMemberButtonComponent from "../../../../kauri-components/components/Button/AddMemberButton";
import { Input } from "../../../../kauri-components/components/Input";
import UserAvatarComponent from "../../../../kauri-components/components/UserAvatar";
import StatisticsContainer from "../../../../kauri-components/components/PublicProfile/StatisticsContainer";
import SocialWebsiteIcon from "../../../../kauri-components/components/PublicProfile/SocialWebsiteIcon";
import { IFormValues } from "./index";
import TagSelector from "../../common/TagSelector";

const LeftSide = styled.section`
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > *:nth-last-child(2) {
    margin-top: ${props => props.theme.space[2]}px;
  }
`;

const CreateCommunityDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${space};
  > :first-child {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const CreateCommunityMembersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > *:not(:last-child) {
    margin-right: ${props => props.theme.space[1]}px;
  }
  > *:nth-last-child(2) {
    width: unset;
  }
`;

const MainDetails = styled.div`
  display: flex;
  align-items: flex-end;
  > :first-child {
    margin-right: ${props => props.theme.space[3]}px;
  }
`;

const MainFields = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

const SocialFieldContainer = styled.div`
  display: flex;
  > :first-child {
    margin-right: ${props => props.theme.space[2]}px;
  }
`;

interface IProps {
  avatar: null | undefined | string;
  uploadLogo: () => void;
  background: undefined | string;
  tags: Array<string | null> | null;
  setFieldValue: (field: string, value: any) => void;
  userId: string;
  userAvatar: string | null;
  openAddMemberModal: () => void;
  username: string | null;
}

const Component: React.SFC<IProps> = props => (
  <PrimaryHeaderSection backgroundURL={props.background}>
    <LeftSide>
      <MainDetails>
        <UploadLogoButtonComponent
          bg={String(props.avatar)}
          handleClick={() => props.uploadLogo()}
          text="Logo"
          color="white"
        />

        <MainFields>
          <Field
            type="text"
            name="name"
            render={({ field }: FieldProps<IFormValues>) => (
              <Input
                {...field}
                fontSize={7}
                fontWeight={500}
                placeHolder={"Community Name"}
              />
            )}
          />

          <Field
            type="text"
            name="website"
            render={({ field }: FieldProps<IFormValues>) => (
              <Input {...field} fontSize={2} placeHolder={"Website"} />
            )}
          />
        </MainFields>
      </MainDetails>
      <Field
        type="text"
        name="description"
        render={({ field }: FieldProps<IFormValues>) => (
          <Input
            {...field}
            fontSize={3}
            fontWeight={500}
            placeHolder={"Add description"}
          />
        )}
      />

      <TagSelector
        maxTags={7}
        tags={props.tags || []}
        updateTags={(tags: string[]) => props.setFieldValue("tags", tags)}
      />

      <SocialFieldContainer>
        <SocialWebsiteIcon brand={"twitter"} />
        <Field
          type="text"
          name="social.twitter"
          render={({ field }: FieldProps<IFormValues>) => (
            <Input {...field} fontSize={2} placeHolder={"Twitter"} />
          )}
        />
      </SocialFieldContainer>

      <SocialFieldContainer>
        <SocialWebsiteIcon brand={"github"} />
        <Field
          type="text"
          name="social.github"
          render={({ field }: FieldProps<IFormValues>) => (
            <Input {...field} fontSize={2} placeHolder={"Github"} />
          )}
        />
      </SocialFieldContainer>
    </LeftSide>
    <Stack
      gridAutoflow={["row"]}
      alignItems={["", "center"]}
      justifyContent={["", "end"]}
    >
      <CreateCommunityDetails mr={4}>
        <StatisticsContainer
          pageType={"CreateCommunityPage"}
          statistics={[
            { name: "Articles", count: 0 },
            { name: "Collections", count: 0 },
          ]}
        />
        <Label textAlign="center" color="white">
          Moderators
        </Label>
        <CreateCommunityMembersContainer>
          <UserAvatarComponent
            fullWidth={true}
            variant="white"
            username={props.username}
            userId={props.userId}
            avatar={props.userAvatar}
          />
          <AddMemberButtonComponent
            onClick={() => props.openAddMemberModal()}
          />
        </CreateCommunityMembersContainer>
      </CreateCommunityDetails>
    </Stack>
  </PrimaryHeaderSection>
);

export default Component;
