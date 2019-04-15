import React from "react";
import styled from "../../lib/styled-components";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import { Title1, H1 } from "../Typography";

const DEFAULT_CARD_WIDTH = 305;

const BannerContainer = styled<{}, "div">("div")`
  background: ${props => props.theme.colors.secondaryColor};
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
  color: ${props => props.theme.colors.white};
  align-items: center;
  text-align: center;
  transition: all 0.3s;
  max-height: 1000px;
  @media (max-width: 700px) {
    display: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Box = styled<{}, "div">("div")`
  margin: ${props => props.theme.space[1]}px;
  max-width: ${DEFAULT_CARD_WIDTH} px;
  font-size: ${props => props.theme.fontSizes[3]}px;
`;

const Buttons = styled<{}, "div">("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > button {
    margin: ${props => props.theme.space[1]}px;
  }
`;
const IMG = styled.img`
  height: 50px;
  width: 50px;
  margin-bottom: ${props => props.theme.space[2]}px;
`;

const StyledLink = styled.a`
  margin: 10px;
`;

const Dev = () => (
  <IMG src="data:image/png;base64,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" />
);
const Writer = () => (
  <IMG src="data:image/png;base64,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" />
);
const Communities = () => (
  <IMG src="data:image/png;base64,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" />
);

interface IProps {
  handleLearnMore: () => void;
  handleClose: () => void;
}

const DesktopBanner = (props: IProps) => (
  <BannerContainer>
    <Title1 color="white">Welcome to Kauri</Title1>
    <Info>
      <Box>
        <Dev />
        <H1 color="white">Developers</H1>
        <div>
          Keep up to date with top projects, libraries, and tools with tutorials
          from your favorite Web 3.0 projects and developers
        </div>
      </Box>
      <Box>
        <Writer />
        <H1 color="white">Writers</H1>
        <div>
          Publish your technical content across a distributed environment of
          IPFS nodes, collaborate with others in the community, and receive
          feedback from your readers.
        </div>
      </Box>
      <Box>
        <Communities />
        <H1 color="white">Projects</H1>
        <div>
          Onboard new developers, work with top technical writers to curate
          fresh content, and build a community around your project
        </div>
      </Box>
    </Info>
    <Buttons>
      <PrimaryButton onClick={props.handleLearnMore} text="Learn More" />
      <SecondaryButton onClick={props.handleClose} text="Close" />
      <StyledLink href="http://eepurl.com/dszB7r" target="_blank">
        <SecondaryButton text="Sign up to our newsletter" />
      </StyledLink>
    </Buttons>
  </BannerContainer>
);

export default DesktopBanner;
