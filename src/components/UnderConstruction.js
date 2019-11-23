import React from 'react'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import { Link } from 'gatsby'
import underConstructionImage from 'images/under-construction.jpg'
import Article from 'components/Article'
import Header from 'components/Header'

const ArticleWrapper = styled('div')`
margin-top:5vh;
`
export default props => {
  return (
    <>
      <Header bg={underConstructionImage} title="Strona w budowie"/>
      <ArticleWrapper>
        <Article>
          <Link to="/">Do strony głównej</Link>
        </Article>
      </ArticleWrapper>
    </>
  )
}
