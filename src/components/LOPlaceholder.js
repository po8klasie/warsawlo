import React from 'react'
import styled from '@emotion/styled'
export default styled('div')`
  width:100%;
  height:100%;
  background: ${props => props.theme.colors.primary};
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:3em;
  font-family: ${props => props.theme.fonts.secondary};
  &::before{
    content: 'LO';
  }
`
