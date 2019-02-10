import React from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'
const ButtonElement = styled('button')`
  all:unset;
  cursor:pointer;
  padding:10px;
  border: 2px solid rgb(210,210,210);
  color:black;
  border-radius: 3px;
  background: ${theme.colors.light};
  transition: .2s all;
  margin:10px;
  &:hover:not(&:disabled){
    border-color:${theme.colors.primary};
  }
  &:disabled{
    color:rgb(100,100,100);
    cursor: not-allowed;
  }
`

export default props => <ButtonElement {...props}>{props.children}</ButtonElement>
