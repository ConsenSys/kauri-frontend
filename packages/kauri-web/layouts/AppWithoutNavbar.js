import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import NetworkBanner from "../components/containers/StyledFooter/NetworkBanner";
import Modal from "../../kauri-components/components/Modal";

export const menuHeaderHeight = 76;

const Layout = styled.div``;

const StyledContent = styled.div`
  padding-top: 0px;
  min-height: calc(100vh - ${menuHeaderHeight}px);
  background: #f7f7f7;
`;

const mapStateToProps = (state, ownProps) => ({
  isModalOpen: state.modal.isModalOpen,
});

export default connect(mapStateToProps)(({ children, isModalOpen }) => (
  <Layout
    style={{ overflow: isModalOpen ? "hidden" : "auto" }}
    className="layout"
  >
    <Helmet>
      <body className={isModalOpen ? "overflow-hidden" : null} />
    </Helmet>
    <Modal />
    <StyledContent style={{ overflow: isModalOpen ? "hidden" : "auto" }}>
      {children}
    </StyledContent>
  </Layout>
));
