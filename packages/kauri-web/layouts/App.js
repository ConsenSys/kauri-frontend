import React from 'react'
import { Layout, Modal } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/containers/Navbar'
import StyledFooter from '../components/containers/StyledFooter'

const { Header, Content } = Layout
export const menuHeaderHeight = 76

const StyledContent = styled(Content)`
  padding-top: 0px;
  min-height: calc(100vh - ${menuHeaderHeight}px);
  background: #f2f2f2;
`

const StyledHeader = styled(Header)`
  padding: 0px ${props => props.theme.padding} !important;
  .ant-layout-header {
    padding: 0px ${props => props.theme.padding} !important;
  }
  line-height: ${menuHeaderHeight}px;
  min-height: ${menuHeaderHeight}px;
  background-color: ${props => props.navcolor}
`

const mapStateToProps = (state, ownProps) => ({
  modalOpen: state.app.modalOpen,
  modalTitle: state.app.modalTitle,
  modalChildren: state.app.modalChildren,
  onOk: state.app.onOk,
  onCancel: state.app.onCancel,
  footer: state.app.footer,
})

export default connect(mapStateToProps)(
  ({ children, modalTitle, modalChildren, modalOpen, onOk, onCancel, footer, url, confirmationPage, navcolor }) => (
    <Layout className='layout'>
      <Modal title={modalTitle} visible={modalOpen} onOk={onOk} onCancel={onCancel} footer={footer}>
        {modalChildren}
      </Modal>
      <StyledHeader navcolor={navcolor}>
        <Navbar confirmationPage={confirmationPage} url={url} navcolor={navcolor}/>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <StyledFooter />
    </Layout>
  )
)
