import React from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'
export default styled('div')`
background:
  repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    ${theme.colors.primary} 10px,
    ${theme.colors.primary} 20px
  );
  width:100%;
  height:20px;
`
