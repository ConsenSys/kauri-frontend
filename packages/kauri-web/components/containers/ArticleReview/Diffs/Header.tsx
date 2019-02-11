import styled from "../../../../lib/styled-components";
import {
  Title1,
  Label,
} from "../../../../../kauri-components/components/Typography";
import Image from "../../../../../kauri-components/components/Image";
import TagList from "../../../../../kauri-components/components/Tags/TagList";
import PrimaryButton from "../../../../../kauri-components/components/Button/PrimaryButton";
import SecondaryButton from "../../../../../kauri-components/components/Button/SecondaryButton";
import moment from "moment";
import theme from "../../../../../kauri-components/lib/theme-config";
import GreenArrow from "../../../common/GreenArrow";

const Container = styled<{ bgUpdated: boolean }, "div">("div")`
  background: ${props => props.theme.bgPrimary};
  height: 250px;
  position: relative;
  z-index: 1;
  ${props => props.bgUpdated && `border: 4px solid ${props.theme.primary};`}
`;

const Content = styled.div`
  display: flex;
  background: ${props => props.theme.bgPrimary};
  padding-top: 0;
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${props => props.theme.space[2]}px ${props => props.theme.padding};
`;

const Left = styled.div`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  flex: 1;
  z-index: 10;
`;

const Right = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 10;
`;

const Actions = styled.div`
  width: 100%;
  padding: ${props => props.theme.space[2]}px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  & > button {
    margin-left: ${props => props.theme.space[3]}px;
  }
`;

const BGNotice = styled.span`
  display: flex;
  flex-direction: row;
`;

const GoBack = styled.div`
  cursor: pointer;
`;

interface IProps {
  routeChangeAction: (route: string) => void;
  title: string;
  attributes?: {
    background: string;
  };
  date: string;
  tags: string[];
  bgUpdated: boolean;
}
const Header = (props: IProps) => (
  <Container bgUpdated={props.bgUpdated}>
    {props.attributes && props.attributes.background && (
      <Image
        asBackground={true}
        height="100%"
        width="100%"
        overlay={{ color: theme.bgPrimary, opacity: 0.7 }}
        image={props.attributes.background}
      />
    )}
    <Content>
      <Actions>
        <GoBack onClick={() => props.routeChangeAction("back")}>
          <GreenArrow direction="left" />
          <Label color="white">Go Back</Label>
        </GoBack>
        <BGNotice>
          {props.bgUpdated ? (
            <Label color="white">The background has been updated</Label>
          ) : null}
        </BGNotice>
        <Buttons>
          <SecondaryButton text="Reject Changes" />
          <PrimaryButton text="Approve Changes" />
        </Buttons>
      </Actions>
      <Left>
        <Label color="white">
          SUBMITTED - {moment(props.date).format("DD MMM YYYY HH:mm")}
        </Label>
        <Title1 color="white">{props.title}</Title1>
        <TagList maxTags={7} color="white" tags={props.tags} />
      </Left>
      <Right>
        <Label color="white">Status - Pending approval</Label>
      </Right>
    </Content>
  </Container>
);

export default Header;
