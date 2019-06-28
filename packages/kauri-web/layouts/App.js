import React from "react";
import Head from "next/head";
import { connect } from "react-redux";
import styled from "../lib/styled-components";
import Navbar from "../components/containers/Navbar";
import StyledFooter from "../components/containers/StyledFooter";
import Modal from "../../kauri-components/components/Modal";
import { menuHeaderHeight } from "../components/containers/Navbar/View";
import { footerHeight } from "../components/containers/StyledFooter/View";

const Layout = styled.div``;

const StyledContent = styled.div`
  padding-top: 0px;
  min-height: calc(
    100vh -
      ${props =>
        props.headerOffset ? footerHeight : menuHeaderHeight + footerHeight}px
  );
  background: #f7f7f7;
`;

const StyledHeader = styled.div`
  padding: 0px !important;
  .ant-layout-header {
    padding: 0px !important;
  }
  line-height: ${menuHeaderHeight}px;
  min-height: ${menuHeaderHeight}px;
  background-color: ${props =>
    props.navcolorOverride || props.theme.colors.bgPrimary};
  z-index: 10;
`;

const mapStateToProps = (state, ownProps) => ({
  isModalOpen: state.modal.isModalOpen,
  navcolorOverride: state.app.navcolorOverride,
});

export default connect(mapStateToProps)(
  ({
    children,
    url,
    confirmationPage,
    navcolor,
    navcolorOverride,
    isModalOpen,
    headerOffset,
  }) => (
    <Layout className="layout">
      <Head>
        <body className={isModalOpen ? "overflow-hidden" : null} />
      </Head>
      <Modal />
      <StyledHeader navcolor={navcolorOverride || navcolor}>
        <Navbar
          confirmationPage={confirmationPage}
          url={url}
          navcolor={navcolor}
        />
      </StyledHeader>
      <StyledContent headerOffset={headerOffset}>{children}</StyledContent>
      <StyledFooter />
    </Layout>
  )
);
