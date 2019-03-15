import React, { useState } from 'react';

import styled from 'styled-components';
import SearchCategory from '../../../../kauri-components/components/SearchResults/SearchCategory'
import DisplayResources from './DisplayResources';
import ManageModerators from './ManageModerators';
import { getCommunity_getCommunity_pending, getCommunity_getCommunity_members } from '../../../queries/__generated__/getCommunity';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    & > * {
        margin-bottom: ${props => props.theme.space[2]}px
    }
    &:not(:first-child) {
        flex: 1;
    }
`

interface IProps {
    pending: Array<(getCommunity_getCommunity_pending | null)> | null;
    members: Array<(getCommunity_getCommunity_members | null)> | null;
}

const Manage = ({ pending, members }: IProps) => {
    const [tabIndex, setTabIndex] = useState(0);
    const articles = pending && pending.filter(i => i && i.__typename === 'ArticleDTO');
    const collections = pending && pending.filter(i => i && i.__typename === 'CollectionDTO');
return <Container>
    <Column>
        <SearchCategory
            active={tabIndex === 0}
            category="Manage Members"
            amount={members ? members.length: 0}
            onClick={() => setTabIndex(0)} />
        <SearchCategory
            active={tabIndex === 1}
            category="Articles for approval"
            amount={articles ? articles.length : 0}
            onClick={() => setTabIndex(1)}
        />
        <SearchCategory
            active={tabIndex === 2}
            category="Collections for approval"
            amount={collections ? collections.length: 0}
            onClick={() => setTabIndex(2)}
        />
    </Column>
    <Column>
        {tabIndex === 0 && <ManageModerators />}
        {tabIndex === 1 && <DisplayResources resources={articles} />}
        {tabIndex === 2 && <DisplayResources resources={collections} />}
    </Column>
</Container>
}

export default Manage;