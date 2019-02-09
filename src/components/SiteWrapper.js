import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled('div')`
  width:100%;
  background: white;
`

export default (props) => (
  <Wrapper {...props}>
  {props.children}
  </Wrapper>
)
