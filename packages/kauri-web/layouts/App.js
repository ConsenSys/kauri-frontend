import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/containers/Navbar'
import StyledFooter from '../components/containers/StyledFooter'
import Modal from '../../kauri-components/components/Modal'

const { Header, Content } = Layout
export const menuHeaderHeight = 76

const StyledContent = styled(Content)`
  padding-top: 0px;
  min-height: calc(100vh - ${menuHeaderHeight}px);
  background: #F7F7F7;
`

const StyledHeader = styled(Header)`
  padding: 0px ${props => props.theme.padding} !important;
  .ant-layout-header {
    padding: 0px ${props => props.theme.padding} !important;
  }
  line-height: ${menuHeaderHeight}px;
  min-height: ${menuHeaderHeight}px;
  background-color: ${props => props.navcolor};
`

const mapStateToProps = (state, ownProps) => ({ })

export default connect(mapStateToProps)(
  ({ children, url, confirmationPage, navcolor }) => (
    <Layout className='layout'>
      <Modal />
      <StyledHeader navcolor={navcolor}>
        <Navbar confirmationPage={confirmationPage} url={url} navcolor={navcolor} />
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <StyledFooter />
    </Layout>
  )
)
