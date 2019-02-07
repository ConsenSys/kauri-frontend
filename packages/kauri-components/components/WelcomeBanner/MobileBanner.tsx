import styled from '../../lib/styled-components';
import { Label } from '../Typography';
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';

const Container = styled.div`
    background: ${props => props.theme.colors.secondaryColor};
    width: 100%;
    padding: ${props => props.theme.space[2]}px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 700px) {
        display: none;
    }
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    & > button {
        margin: ${props => props.theme.space[1]}px;
    }
`;

interface IProps {
    handleLearnMore: () => void;
    handleClose: () => void;
}

const MobileBanner = (props: IProps) => <Container>
    <Label color="white">WELCOME TO KAURI, THE COMMUNITY’S KNOWLEDGE NETWORK.</Label>
    <Buttons>
        <PrimaryButton onClick={props.handleLearnMore} text="Learn More" />
        <SecondaryButton onClick={props.handleClose}>Close</SecondaryButton>
    </Buttons>
</Container>

export default MobileBanner;