import styled from "styled-components";
import Close from "./Close";
import TagName from "./TagName";

const Container = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    cursor: pointer;
  }
  margin-right: ${props => props.theme.space[1]}px;
`;

interface IProps {
  tag: string;
  removeTag: (tag: string) => void;
  color: string;
}

const handleClick = (removeTag: (tag: string) => void, tag: string) => () =>
  removeTag(tag);

const Tag = (props: IProps) => (
  <Container>
    <Close onClick={handleClick(props.removeTag, props.tag)} />
    <TagName color={props.color}>{props.tag}</TagName>
  </Container>
);

export default Tag;
