import React from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'
import { Link } from 'gatsby'

export default props => {
  const Element = styled(props.wrapper ? props.wrapper : Link)`
    all:unset;
    cursor:pointer;
    color:${theme.colors.secondary};
    position:relative;
    display:inline-block;
    &::after{
      position:absolute;
      content:'';
      bottom:0;
      left:0;
      width:100%;
      height:2px;
      background:${theme.colors.secondary};
      z-index:-1;
      transition:.1s all;
    }
    &:hover{
      color:white;
      &::after{
        height:100%;
      }
    }
  `
  let attr = { ...props }
  if (props.wrapper === 'a') {
    attr.rel = 'noopener noreferrer'
    attr.target = '_blank'
  }
  return <Element {...attr}>{props.children}</Element>
}
