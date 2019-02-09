import React from 'react'
import styled from '@emotion/styled'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import {Link} from 'gatsby'
import wrongWayImage from 'images/wrong-way.jpg'
import Article from 'components/Article'
import Header from 'components/Header'
import TextLink from 'components/TextLink'
const ArticleWrapper = styled('div')`
margin-top:5vh;
`
export default props => {
  return (
    <Layout>
    <SEO title="404 Nie znaleziono" />
    <Header bg={wrongWayImage} title="Nie znaleziono strony" />
    <ArticleWrapper>
    <Article>
    <TextLink to="/">Do strony głównej</TextLink>
    </Article>
    </ArticleWrapper>
    </Layout>
  )
}
