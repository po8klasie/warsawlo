import React from 'react'
import styled from '@emotion/styled'
export default styled('div')`
background:
  repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    ${props => props.theme.colors.primary} 10px,
    ${props => props.theme.colors.primary} 20px
  );
  width:100%;
  height:20px;
`
