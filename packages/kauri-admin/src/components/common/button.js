import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 4px;
    background-color: ${props => props.primary ? '#0BA986' : '#f2f2f2'};
    border: 1px solid #0BA986;
    color: ${props => props.primary ? '#FFFFFF' : '#526471'};
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    margin: 5px;
    text-transform: uppercase;
    outline: none;
    flex: 1;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.primary ? '#11856B' : 'white'};
        color: ${ props => props.primary ? 'white' : '#1E2428'}
    }
`;
