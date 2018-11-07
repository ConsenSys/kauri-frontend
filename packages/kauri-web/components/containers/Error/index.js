import styled from 'styled-components';
import { PrimaryButton } from '../../../../kauri-components/components/Button';
import { Link } from '../../../routes';

const ErrorContainer = styled.div`
    background: ${props => props.theme.bgPrimary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: calc(100vh - 133px);
    flex-direction: column;
`;

const Code = styled.div`
    font-size: ${props => props.theme.fontSizes[7]}px;
`;

const Copy = styled.div`
    font-size: ${props => props.theme.fontSizes[3]}px;
    margin: ${props => props.theme.space[3]}px;
`;

const Error = () => <ErrorContainer>
    <Code>404</Code>
    <Copy>Sorry, something went wrong :(</Copy>
    <Link href="/"><PrimaryButton>Go to homepage</PrimaryButton></Link>
</ErrorContainer>

export default Error