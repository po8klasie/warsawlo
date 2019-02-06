import React from 'react'
import styled from 'react-emotion'

const BreakElement = styled('span')`
  width:100px;
  height:.5em;
  display:block;
  border-radius:3px;
  background:${props => props.theme.colors[props.color]};
`;

export default props => <BreakElement {...props} />
