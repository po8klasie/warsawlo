import React, { Component } from 'react'
import Loader from './Loader'
import styled from 'react-emotion'
import {connect} from 'react-redux'

const SiteLoaderWrapper = styled('div')`
  width:100vw;
  height: calc(100vw - ${props => props.navHeight}px);
  top: ${props => props.navHeight}px);
  left:0;
  position: fixed;
  z-index:99;
  display:flex;
  justify-content:center;
  padding-top:20%;
  background: rgb(242,242,242);
`

const SiteLoader =  (props) => (
  <SiteLoaderWrapper navHeight={props.navHeight}>
  <Loader />
  </SiteLoaderWrapper>
)
const mapStateToProps = (state) => ({
  navHeight: state.style.navHeight
})
export default connect(mapStateToProps, null)(SiteLoader)
