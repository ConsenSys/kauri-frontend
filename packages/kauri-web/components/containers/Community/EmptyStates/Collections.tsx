import styled from "../../../../lib/styled-components";
import {
  Title2,
  BodyCard,
} from "../../../../../kauri-components/components/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: ${props => props.theme.space[3]}px;
  height: 100%;
  min-height: 70vh;
  & > svg {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
`;

const SVG = () => (
  <svg
    width="77"
    height="72"
    viewBox="0 0 77 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M75 3H2V70H75V3Z" fill="#EBEDED" />
    <path
      d="M75 2H2V70H75V2Z"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M33 9H9V25H33V9Z"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M67 9H43V25H67V9Z"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 33.5H32"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 42.5H32"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M43 33.5H66"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M43 42.5H66"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 51.5H32"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M43 51.5H66"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default () => (
  <Container>
    <SVG />
    <Title2>No Collections Created</Title2>
    <BodyCard>
      All collections created by a community will appear here. Go ahead and
      create one!
    </BodyCard>
  </Container>
);
