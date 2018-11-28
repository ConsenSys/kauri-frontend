import * as React from "react";
import styled, { keyframes } from "styled-components";

const ModalContainer = styled<{ open: boolean }, "div">("div")`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgb(30, 36, 40, 0.5);
  z-index: 9001;
  justify-content: center;
  align-items: center;
  position: fixed;
  display: flex;
  visibility: ${props => (props.open ? "visible" : "hidden")};
  transition: all 0.2s;
  animation: ${props => (props.open ? fadeIn : fadeOut)} 0.2s linear;
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
  background: ${props => props.theme.colors.tertiaryBackgroundColor};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.space[3]}px;
  @media (max-width: 500px) {
    height: 100%;
    width: 100%;
  }
`;

interface IProps {
  children: React.ReactElement<any>;
  isModalOpen: boolean;
  closeModalAction: () => void;
}

const handleModalBoxClick = (e: React.MouseEvent) => e.stopPropagation();

const handleCloseModal = (action: () => void) => () => action();

const ModalComponent: React.FunctionComponent<IProps> = ({
  isModalOpen,
  closeModalAction,
  children,
}) =>
  isModalOpen ? (
    <ModalContainer
      open={isModalOpen}
      onClick={handleCloseModal(closeModalAction)}
    >
      <ModalBox onClick={handleModalBoxClick}>{children}</ModalBox>
    </ModalContainer>
  ) : null;

export default ModalComponent;
