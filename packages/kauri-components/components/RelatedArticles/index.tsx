import { Label, H3 } from "../Typography";
import styled from "../../lib/styled-components";
import { TagList } from "../Tags";

interface IProps {
  relatedArticles: Array<{
    resourceIdentifier: {
      id: string;
    };
    tags: string[];
    name: string;
  }>;
  routeChangeAction: (route: string) => void;
  linkComponent: (
    children: React.ReactElement<any>,
    route: string,
    key: number
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

const Related = (props: IProps) =>
  props.relatedArticles ? (
    <RelatedArticlesContainer>
      <Label>Related Articles</Label>
      {props.relatedArticles.map((i, key) =>
        props.linkComponent(
          <Article>
            <H3>{i.name}</H3>
            {i.tags && i.tags.length > 0 && (
              <TagList
                resourceType={"relatedArticles"}
                maxTags={3}
                color="textPrimary"
                tags={i.tags}
              />
            )}
          </Article>,
          `/article/${i.resourceIdentifier.id}`,
          key
        )
      )}
    </RelatedArticlesContainer>
  ) : null;

export default Related;
