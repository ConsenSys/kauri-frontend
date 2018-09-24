import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: absolute;
  z-index: 10000;
  height: 100%;
  width: 400px;
  right: ${props => props.show ? '0px' : '-400px'};
  top: 0px;
  background: white;
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  transition: all 0.3s;
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9999;
  background: rgba(0,0,0,0.4);
  transition: opacity 0.1s;
  opacity: ${props => props.show ? 1 : 0};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
`;

export const Footer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  background: #fafafa;
  padding: 10px;
  align-self: flex-end;
  width: 100%;
  display: flex;
`;

export const Content = styled.div`
  padding: 20px;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

export const BaseModal = ({ show, closeModal, content, footer, }) =>
  <Overlay show={show} onClick={closeModal}>
    <Modal onClick={(e) => e.stopPropagation()} show={show} onHide={closeModal}>
      {content}
      {footer}
    </Modal>
  </Overlay>;