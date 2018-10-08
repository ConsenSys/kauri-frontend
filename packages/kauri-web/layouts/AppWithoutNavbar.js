import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NetworkBanner from '../components/containers/StyledFooter/NetworkBanner'
import Modal from '../../kauri-components/components/Modal'

const { Content } = Layout
export const menuHeaderHeight = 76

const StyledContent = styled(Content)`
  padding-top: 0px;
  min-height: calc(100vh - ${menuHeaderHeight}px);
`

const mapStateToProps = (state, ownProps) => ({ })

export default connect(mapStateToProps)(
  ({ children }) => (
    <Layout style={{ overflow: 'auto' }} className='layout'>
      <Modal />
      <StyledContent>
        <NetworkBanner />
        {children}
      </StyledContent>
    </Layout>
  )
)
