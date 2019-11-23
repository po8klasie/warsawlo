import React from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'

export default styled('div')`
  width:100%;
  height:100%;
  background: ${theme.colors.primary};
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:3em;
  font-family: ${theme.fonts.secondary};
  &::before{
    content: 'LO';
  }
`
