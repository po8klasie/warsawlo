import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckSquare as CheckedIcon} from '@fortawesome/free-solid-svg-icons'

import {faCheckSquare as UncheckedIcon} from '@fortawesome/free-regular-svg-icons'
import styled from 'react-emotion'

const CheckboxElement = styled('div')`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.checked ? props.theme.colors.primary : props.theme.colors.secondLight};
    box-shadow: ${props => props.checked ? `0 0 1px ${props.theme.colors.primary}` : 'none'};
    transition: .4s;
    border-radius: 34px;

    &::before{
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
      ${props => props.checked &&'transform: translateX(26px);'}
    }
  }


`


 export default props =>  (<CheckboxElement checked={props.checked}>
 <input type="checkbox" />
 <span className="slider" {...props} onClick={props.onToggle}></span>
     </CheckboxElement>)
