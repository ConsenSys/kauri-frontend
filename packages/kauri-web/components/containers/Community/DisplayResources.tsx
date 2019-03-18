import styled from '../../../lib/styled-components';
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard'
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard';
import { Link } from "../../../routes";

const Container = styled.div`
    padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
    display: flex;
    flex-direction: row;
    justify-content: center;
    & > * {
      margin: ${props => props.theme.space[1]}px;
    }
`;

interface IProps {
    resources: any;
}

const DisplayResources = ({ resources }: IProps) => <Container>
    {resources.map((i: any) => {
        if (i.__typename === 'ArticleDTO') {
            return <ArticleCard {...i}                 linkComponent={(
                childrenProps: React.ReactElement<any>,
                route: string
                ) => (
                  <Link
                    useAnchorTag={true}
                    href={route}
                  >
                    {childrenProps}
                  </Link>
                )} />
        } else if ( i.__typename === 'CollectionDTO') {
            return <CollectionCard {...i}
                linkComponent={(
                    childrenProps: React.ReactElement<any>,
                    route: string
                    ) => (
                      <Link
                        useAnchorTag={true}
                        href={route}
                      >
                        {childrenProps}
                      </Link>
                    )} />
        } else {
            return null;
        }
    })}
</Container>

export default DisplayResources;