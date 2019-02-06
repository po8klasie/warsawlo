import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'

const Wrapper = styled('div')`
  width:100%;
  background: white;
  min-height: calc(100vh - ${props => props.navHeight}px);
`

class SiteWrapper extends Component{
 render = () => (
   <Wrapper {...this.props} navHeight={this.props.style.navHeight ? this.props.style.navHeight : 0}>
   {this.props.children}
   </Wrapper>
 )
 }
 const mapStateToProps = (state, ownProps) => ({
   style: state.style
})

 export default connect(mapStateToProps, null)(SiteWrapper);
