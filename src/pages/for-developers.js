import React from 'react'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import codeImage from 'images/code.jpg'
import Article from 'components/Article'
import Header from 'components/Header'
import TextLink from 'components/TextLink'
const ArticleWrapper = styled('div')`
margin-top:5vh;
`
export default props => {
  return (
    <Layout>
    <SEO title="Dla deweloperów" />
    <Header bg={codeImage} title="Dla deweloperów" />
    <ArticleWrapper>
    <Article>
    <p>
    Dokumentacje naszego API możesz znaleźć w naszym <TextLink wrapper="a" href="https://github.com/WarsawLO/docs">repo docs na Githubie</TextLink>
    </p>
    <p>
    Zachęcamy też do przyjrzenia się bliżej <TextLink wrapper="a" href="https://github.com/WarsawLO/warsawlo">repozytorium naszego serwisu Githubie</TextLink>
    </p>
    </Article>
    </ArticleWrapper>
    </Layout>
  )
}
