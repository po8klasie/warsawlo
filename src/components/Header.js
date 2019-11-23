import React from 'react'
import theme from 'utils/theme'
import styled from '@emotion/styled'

const responsiveWidth = '1000px'
const HeaderWrapper = styled('header')`
min-height:30vh;
width:100%;
  background: url(${props => props.bg});
background-size:cover;
background-position:center center;
display:flex;
align-items:center;

h1{
  margin:0 0 0 2em;
  padding:.5em;
  background:${theme.colors.primary};
  color:white;
  font-size:3em;
  @media (max-width: ${responsiveWidth}) {
    font-size:2em;
    margin:auto;
    max-height:100%;
    text-align:center;
  }
}
`
export default props => (
  <HeaderWrapper {...props}>
    <h1>{props.title}</h1>
  </HeaderWrapper>
)
