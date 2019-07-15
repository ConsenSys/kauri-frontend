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
    width="58"
    height="72"
    viewBox="0 0 58 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 2V70H56V18.8L39.4 2H2Z"
      fill="#EBEDED"
    />
    <path
      d="M39 2V19.5H56.5"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 2V70H56V19.3L38.9 2H2Z"
      stroke="#1E2428"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.6583 35.3887C22.2255 34.9559 21.5241 34.9559 21.0913 35.3887L16.3444 40.1356C15.9119 40.5681 15.9119 41.2698 16.3444 41.7023L21.0913 46.4495C21.3077 46.6659 21.5913 46.7741 21.8747 46.7741C22.1583 46.7741 22.4419 46.6659 22.6583 46.4495C23.0908 46.0167 23.0908 45.3153 22.6583 44.8825L18.6948 40.9189L22.6583 36.9554C23.0908 36.5226 23.0908 35.8212 22.6583 35.3887Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36.8991 35.3887C36.4666 34.9559 35.7652 34.9559 35.3324 35.3887C34.8996 35.8212 34.8996 36.5226 35.3324 36.9554L39.2959 40.9189L35.3324 44.8825C34.8996 45.3153 34.8996 46.0167 35.3324 46.4495C35.5488 46.6659 35.8321 46.7741 36.1158 46.7741C36.3994 46.7741 36.683 46.6659 36.8991 46.4495L41.646 41.7023C42.0788 41.2698 42.0788 40.5684 41.646 40.1356L36.8991 35.3887Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.8642 35.1809C31.3171 34.9074 30.6515 35.1293 30.3777 35.6763L25.6308 45.1704C25.3573 45.7177 25.5792 46.3834 26.1262 46.6569C26.2852 46.7365 26.4543 46.774 26.6207 46.774C27.0273 46.774 27.4185 46.5496 27.6127 46.1615L32.3596 36.6674C32.6334 36.1201 32.4115 35.4544 31.8642 35.1809Z"
      fill="black"
    />
  </svg>
);

export default () => (
  <Container>
    <SVG />
    <Title2>No Article Published</Title2>
    <BodyCard>
      All articles owned by a community will appear here. Go ahead and write
      one!
    </BodyCard>
  </Container>
);
