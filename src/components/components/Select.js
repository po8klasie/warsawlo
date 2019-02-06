import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import styled from 'react-emotion'

const SelectWrapper = styled('span')`
  all:inherit;
  position: relative;
  display:inline-block !important;


/*Hiding the select arrow for IE10*/
  select::-ms-expand {
    display: none;
}


select {
background-color: ${props => props.theme.colors.secondLight};
border: 3px solid ${props => props.theme.colors.secondLight};
font-size: inherit;
padding: .5em;
padding-right: 2.5em;
margin: 10px;
border-radius: 3px;
text-indent: 0.01px;
text-overflow: '';
outline:none;
transition: .2s all;
&:focus{
  border-color: ${props => props.theme.colors.grey};
}
}
`
export default props => (
  <SelectWrapper>
  <select {...props}>
    {props.children}
  </select>
  </SelectWrapper>
)
