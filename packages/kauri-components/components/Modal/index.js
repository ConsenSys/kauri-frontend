// @flow
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { closeModalAction } from './Module'
import Modal from './View'

const mapStateToProps = ({ app: { modal: { isModalOpen, children } } }) => ({
  isModalOpen,
  children,
})

export default connect(mapStateToProps, { closeModalAction })(Modal)
