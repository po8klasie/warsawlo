import React from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'
const BreakElement = styled('span')`
  width:100px;
  height:.5em;
  display:block;
  border-radius:3px;
  background:${props => theme.colors[props.color]};
`;

export default props => <BreakElement {...props} />
