import { Label, H3 } from "../Typography";
import styled from "../../lib/styled-components";
import { TagList } from "../Tags";

interface IProps {
  related: Array<{
    resourceIdentifier: {
      id: string;
      type: string;
    };
    tags: string[];
    name: string;
  }>;
  routeChangeAction: (route: string) => void;
  linkComponent: (
    children: React.ReactElement<any>,
    route: string,
    key: number,
  ) => React.ReactElement<any>;
}

const RelatedArticlesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Article = styled.div`
  cursor: pointer;
  margin-top: ${props => props.theme.space[1]}px;
  margin-bottom ${props => props.theme.space[3]}px;
  &:hover > * {
    transition: all 0.3s;
    color: ${props => props.theme.colors.primary};
  }
`;

const RelatedBadge = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.colors.disabledTextColor};
  border: 1px solid ${props => props.theme.colors.disabledTextColor};
  height: 20px;
  font-size: 9px;
  padding: 3px 6px;
  border-radius: 12px;
  margin-left: ${props => props.theme.space[1]}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Related = (props: IProps) =>
  {
    return props.related ? (
    <RelatedArticlesContainer>
      <Label>Related Items</Label>
      {props.related.map((i, key) =>
        props.linkComponent(
          <Article>
            <HeadingContainer>
              <H3>{i.name}</H3>
              <RelatedBadge>{i.resourceIdentifier.type}</RelatedBadge>
            </HeadingContainer>
            {i.tags && i.tags.length > 0 && (
              <TagList maxTags={3} color="textPrimary" tags={i.tags} />
            )}
          </Article>,
          `/article/${i.resourceIdentifier.id}`,
          key
        )
      )}
    </RelatedArticlesContainer>
  ) : null
};

export default Related;
