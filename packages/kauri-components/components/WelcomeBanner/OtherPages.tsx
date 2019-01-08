import styled from '../../lib/styled-components';
import { Label } from '../Typography';
import PrimaryButton from '../Button/PrimaryButton';
import TertiaryButton from '../Button/TertiaryButton';

const Container = styled.div`
    background: ${props => props.theme.colors.secondaryColor};
    width: 100%;
    padding: 0 ${props => props.theme.padding};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    & > button {
        margin: ${props => props.theme.space[1]}px;
    }
`;

const OtherPages = () => <Container>
    <Label color="white">WELCOME TO KAURI, THE COMMUNITY’S KNOWLEDGE NETWORK.</Label>
    <Buttons>
        <PrimaryButton text="Learn More" />
        <TertiaryButton>Close</TertiaryButton>
    </Buttons>
</Container>

export default OtherPages;