import styled from 'styled-components';

export const Input = styled.input`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #d8d8d8;
    margin-bottom: 8px;
    outline: none;
    transition: all 0.2s;
    color: #526471;
    width: 100%;
    max-width: 400px;
    &:focus {
        border: 1px solid #11856B;
    }
`;

export const InlineInput = styled.input`
    padding: 8px;
    border: transparent;
    border-bottom: 1px solid #efefef;
    margin-bottom: 8px;
    outline: none;
    transition: all 0.2s;
    font-size: ${props => props.size}px;
    color: #526471;
    &:focus {
        border-bottom: 1px solid #11856B;
    }
`;