import styled from 'styled-components';
import theme from '../../../lib/theme-config';

const Header = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    color: white;
    margin-right: 15px;
    align-items: flex-start;
    text-align: left;
`;

const ListTitle = styled.h2`
    font-weight: 300;
    font-size: 22px;
    text-transform: capitalize;
    margin-top: 0px;
    color: white;
    margin-top: 20px;
`;

const CommunityHeading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CommunityLogo = styled.img`
    background: white;
    border-radius: 4px;
    height: 70px;
    width: 70px;
    padding: 10px;
    margin: 10px 20px 20px 0;
`;

const CommunityName = styled.h3`
    color: white;
    text-transform: capitalize;
    font-weight: bold;
    font-size: 30px;
`;

const CuratedHeader = ({ header, name } = props) => {
    const topic = theme[header.id];
    const imageURL = `/static/images/${header.id}/avatar.png`;

    return(
        <Header>
            <ListTitle>{name}</ListTitle>
            <CommunityHeading>
                <CommunityLogo src={imageURL} />
                <CommunityName>{header.id}</CommunityName>
            </CommunityHeading>
            <div>{topic.description}</div>
        </Header>
    );
}

export default CuratedHeader;