import styled from 'styled-components';
import React from 'react';

const ToggleContainer = styled.div`
    width: 40px;
    height: 20px;
    display: flex;
    align-items: center;
    background: #fafafa;
    border: 1px solid grey;
    border-radius: 10px;
    justify-content: flex-start;
`;

const ToggleBall = styled.div`
    height: 18px;
    width: 18px;
    border-radius: 9px;
    transition: all 0.2s;
    margin-left: ${props => props.checked ? '20px' : 0};
    background: ${ props => props.checked ? '#0BA986' : '#cccccc'};
`;

const Toggle = ({ toggleFn, checked }) => <ToggleContainer onClick={toggleFn}><ToggleBall checked={checked} /></ToggleContainer>;

export default Toggle;