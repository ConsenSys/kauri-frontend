import React from "react";
import { getCommunity_getCommunity_members } from "../../../queries/__generated__/getCommunity";
import styled from "../../../lib/styled-components";
import {
  Title2,
  BodyCard,
  Label,
} from "../../../../kauri-components/components/Typography";
import PrimaryButtonComponent from "../../../../kauri-components/components/Button/PrimaryButton";

const Header = styled.div`
  padding-top: ${props => props.theme.space[2]}px;
  padding-bottom: ${props => props.theme.space[4]}px;
  padding-left: ${props => props.theme.space[2]}px;
  padding-right: ${props => props.theme.space[2]}px;
  border-bottom: 2px solid ${props => props.theme.divider};
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.space[3]}px;
`;

const Content = styled.div``;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const RemoveMemberIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="20" height="20" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0" transform="scale(0.01)" />
      </pattern>
      <image
        id="image0"
        width="100"
        height="100"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEyUlEQVR4nO2dTUxcVRTH/+dCWRXSUIYZP7qzG+OiJHVhYoyLuhKj8YO9ZaQrTDow0bLQ2Sglzgwm1MTgUO3WLxbGpLHUr2hqojE1xoWx7iTMDAux1jbFco8LMoQamPdm3nlwXjm/7bv8OY8f3Hn3nvsCYBiGYRiGYRiGYRiGHmi3CwiEQf1zuREwnSTgPgAdLSasMXAFxNP14fIsCBxHmVK0enM7TvqesVECvUVAHwDXRoQjoI9Ag90/PrR87ZNL30vXKEk7N7izEMakohiUl8qKC7EpK10ZfwLsnwRcj1Qmg4mAZ6Xy1jPxIYEEpy1/lcjNV7PFTyXSRISkK7nTYHpJIiuxME/WRsoTUWMiC0m9nT/sOvyvElkJh9m7w/UTb/weJSTyZ4jr8EdhMgCAyK0djRoSXQhhMWrGnYL3FPlnEVnI0h/d3wD4LmrOHcCl5ZHSt1FDoj/2Fgq+s6trkIFzAFYi5yWPFSa8t4/8oPZFp2EYhmEYxt5FfIWdqeSek87UTDVb/kAyr1MyDACY6X3pTOWI/lLr74fsMUyIMkyIMkyIMkyIMkyIMkyIMkyIMkyIMkyIMkyIMkyIMkyIMkyIMkyIMsT7IYJ8CcbHAADC0wAejZTG+ALAvFheTKgUQkTl6nBxfOPgGeNMem78ZTC/3mbgRC1bPL05LzM3XmTmnFjRQmicsqoHe/afuu0UIIFr2eIkE7f8wg0T52vZ4uT/8/ZfvzkBoCZSsSDqhBDo8i9DhdWtrtWz5WIrUpg4X8+Wi1tdu/LizE0CLrdbZ1yoE8Lge5tdDyulmYyNMYxDrdYXN+qEAHigvzL2VLMB9Wy5CML28z/RRJCMTGX8cRDub7PG2NAoBMR4NzM79mCzMbVsaXpLKesf4JPNvjY1mz/CzOcilhkLKoUAOMCEz1qWElKGI78A4KBMqbJoFQKsSzmfquQGmg2qZUvTTJzfeJpqQqqSG3DkL0KpDCCGk4vpd8akX1pZcc4/tjQ8/UOUkLj+MmovlPbcQbkD3rsLd82dbPuFSu3T1GaSIASIICVJMoDkCAHakJI0GUCyhADrUs5nzo6mggZmzo6mkiYDSJ4QgKhUPT6zHDSsenxmGYTXdqIkSZIlJMQ6YzPbLh4VkxwhLcpokDQpyRDSpowGSZKiXkjYFXjYFb1sdfLoFhJi1zY1mz/imC44ps+D9r4Cd4kVoFdI6xuF7W1IKkOnEOKpNjcKQ29IgnhKolRpNAqp9vX0vNJsQKqSG3BMCwB6t7jc65gWgqR0X//3VVhPPZhmPXUgUEaDQCnWUw9Js556SBkNAqVYTz0cW/bUG09TCCejQe92T19ae+paG1R/E9HErbVbHwFAZ0fnM7x+SK5bSd4G0g0qrUISw17sGO4pTIgyTIgyTIgyTIgyTIgyTIgyTIgyTIgy4hByLYZMnTCuSkeKCyHgN+lMtZD8vYoL8eB56Uy9yN+ruJDVTj8DoC6dq5Daqt93RjpUXMjK82+uEPshADeksxVxwxGG/jwx9Zd0cCxPWdWR6a+c848A+DmO/F2F8VOHdw8vZUtfxxEf739XKxRc/6F/jsH7YwTcDVBXrN8vNniVGYsgLNQXuy+iUPC7XZFhGIZhGIZhGIZhGIZhGMZt/AcMCr2r87Nh6AAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

const MemberContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: ${props => props.theme.space[3]}px ${props => props.theme.space[2]}px;
  > :first-child {
    margin-right: ${props => props.theme.space[4]}px;
  }
  > :nth-child(2) {
    margin-right: auto;
  }
  > :last-child {
    margin-left: ${props => props.theme.space[3]}px;
  }
`;

const Divider = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.divider};
  height: 2px;
`;

const MemberRow: React.FunctionComponent<{ member: any }> = ({ member }) => (
  <MemberContainer>
    <Label>{String(member.status).replace("_", " ")}</Label>
    <BodyCard>{String(member.emailAddress)}</BodyCard>
    {member.status === "CREATED" && (
      <Label color="primary" hoverColor="hoverTextColor">
        RESEND
      </Label>
    )}
    <RemoveMemberIcon />
    <Divider />
  </MemberContainer>
);

interface IProps {
  members: Array<getCommunity_getCommunity_members | null> | null;
  openAddMemberModal: () => void;
}

const MembersPanel: React.SFC<IProps> = props => {
  return (
    <Section>
      <Header>
        <Title2>Moderators</Title2>
        <BodyCard>
          The moderators of this community are displayed below. Those listed as
          "Pending" have yet to accept the request to moderate.
        </BodyCard>
      </Header>
      <Content>
        {props.members &&
          Array.isArray(props.members) &&
          props.members.map(member => member && <MemberRow member={member} />)}
      </Content>
      <Footer>
        <PrimaryButtonComponent onClick={() => props.openAddMemberModal()}>
          Add Moderator
        </PrimaryButtonComponent>
      </Footer>
    </Section>
  );
};

export default MembersPanel;
