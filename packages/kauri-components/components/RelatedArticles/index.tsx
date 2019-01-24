import { Label , H3} from '../Typography';
import styled from '../../lib/styled-components';
import { TagList } from '../Tags';

interface IProps {
    relatedArticles: Array<{
        resourceIdentifier: {
            id: string;
        }
        tags: string[];
        name: string;
    }>,
    routeChangeAction: (route: string) => void;
}

const RelatedArticlesContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Article = styled.a`
    cursor: pointer;
    margin-top: ${props => props.theme.space[1]}px;
    &:hover > * {
        transition: all 0.3s;
        color: ${props => props.theme.colors.primary};
    }
`

const Related = (props: IProps) => props.relatedArticles ? <RelatedArticlesContainer>
    <Label>Related Articles</Label>
    {props.relatedArticles.map(i =>
        <Article
            href={`/article/${i.resourceIdentifier.id}`}
            onClick={() => props.routeChangeAction(`/article/${i.resourceIdentifier.id}`)}
            key={i.resourceIdentifier.id}
        >
            <H3>{i.name}</H3>
            {i.tags && i.tags.length > 0 && <TagList maxTags={3} color="textPrimary" tags={i.tags} />}
        </Article>)}
</RelatedArticlesContainer> : null;

export default Related;