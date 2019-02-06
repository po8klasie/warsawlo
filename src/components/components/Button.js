import React from 'react'
import styled from 'react-emotion'

const ButtonElement = styled('button')`
  all:unset;
  cursor:pointer;
  padding:10px;
  border: 2px solid rgb(210,210,210);
  color:black;
  border-radius: 3px;
  background: ${props => props.theme.colors.light};
  transition: .2s all;
  &:hover:not(&:disabled){
    border-color:${props => props.theme.colors.primary};
  }
  &:disabled{
    color:rgb(100,100,100);
    cursor: not-allowed;
  }
`

export default props => <ButtonElement {...props}>{props.children}</ButtonElement>
