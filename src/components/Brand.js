import React from 'react'
import styled from '@emotion/styled'

import Logo from 'components/Logo'
import { Link } from 'gatsby'
import theme from 'utils/theme'

const Brand = styled(Link)`
&, &:visited, &:hover{
  background:initial;
}
all:unset;
cursor:pointer;
margin-right:20px;
font-size: 2em;
color:black !important;
display:flex;
align-items:center;
span:not(.highlight){
  font-family: ${theme.fonts.tertiary};
}
  span.highlight{
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.secondary}
  }
  svg{
    height:2.5em;

      path{
        fill: ${theme.colors.primary};
      }
  }
`
export default (props) => (
    <Brand to="/" {...props} >
          <Logo />
          <span>Warsaw<span className="highlight">LO</span></span>


        </Brand>
)