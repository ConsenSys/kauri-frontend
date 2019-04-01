import styled from 'styled-components';
import { Title2, BodyCard } from '../../../../kauri-components/components/Typography';
import PrimaryButton from '../../../../kauri-components/components/Button/PrimaryButton';

const Container = styled.div`
    margin-left: ${props => props.theme.space[3]}px;
    background: white;
    border-radius: 4px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: ${props => props.theme.space[3]}px;
    & > button {
        margin: auto;
    }
`;

const ManageModerators = () => <Container>
    <Title2>Moderators</Title2>
    <BodyCard>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nunc velit, mattis nec orci non, scelerisque interdum libero. Morbi aliquet, massa vitae maximus malesuada</BodyCard>
    <PrimaryButton text="Add moderator" />
</Container>

export default ManageModerators;