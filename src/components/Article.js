import React from 'react'
import styled from '@emotion/styled'

import theme from 'utils/theme'

const responsiveWidth = '1000px'
const ArticleWrapper = styled('article')`
width:100%;
.container{
  width:40%;
  margin:auto;
  @media (max-width: ${responsiveWidth}) {
    width:calc(100% - 2em);
  }
}
h1{
  font-family:${theme.fonts.secondary};
}
`

export default props => {
  return (
    <ArticleWrapper>
      <div className="container">
        {props.children}
      </div>
    </ArticleWrapper>
  )
}
