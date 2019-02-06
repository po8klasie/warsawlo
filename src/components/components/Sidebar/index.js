import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import * as selectActions from '../../store/actions/select'
const Schoolname = styled('h1')`
  font-family: ${props => props.theme.fonts.secondary};
`
const Wrapper = styled('div')`
  width:100%;
  position: relative;

  .close{
    position: absolute;
    top: 10px;
    right:10px;
  }
`
class Sidebar extends Component{
 constructor(props){
 super(props)
 }
 render = () => {
 return (
   <Wrapper>
     <span className="close" onClick={() => this.props.selectSchool(null)}>
       <FontAwesomeIcon icon={faTimes} />
     </span>
      <Schoolname>{this.props.select.school && this.props.select.school.name.full}</Schoolname>
   </Wrapper>
 )

 }
 }
 const mapStateToProps = (state, ownProps) => {
   return ({
     style: state.style,
     select: state.select
 })
 }
 const mapDispatchToProps = (dispatch) => ({
     selectSchool: (schoolID) => dispatch(selectActions.selectSchool(schoolID))
 }
 )

 export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
