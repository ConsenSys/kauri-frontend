// @flow
import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgb(30, 36, 40, 0.5);
  z-index: 100;
  justify-content: center;
  align-items: center;
  position: fixed;
  display: flex;
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  transition: all 0.2s;
  animation: ${props => props.open ? fadeIn : fadeOut} 0.2s linear;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    height: 100%;
  }
  1% {
      opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
0% {
  opacity: 1;
}
99% {
  opacity: 0;
}
100% {
  opacity: 0;
}
`;

const ModalBox = styled.div`
  background: ${props => props.theme.colors['tertiaryBackgroundColor']};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.space[3]}px;
  @media (max-width:500px) {
    height: 100%;
    width: 100%;
  }
`;

type Props = {
  children: React.Node,
  isModalOpen: boolean,
  closeModalAction: () => void
}

export default ({ isModalOpen, closeModalAction, children }: Props) =>
  isModalOpen ? (
    <ModalContainer open={isModalOpen} onClick={() => closeModalAction()}>
      <ModalBox onClick={e => e.stopPropagation()}>
        {children}
      </ModalBox>
    </ModalContainer>
  ) : null
