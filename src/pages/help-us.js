import React from 'react'
import styled from '@emotion/styled'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import {Link} from 'gatsby'
import helpImage from 'images/help.jpg'
import Article from 'components/Article'
import Header from 'components/Header'
import TextLink from 'components/TextLink'
const ArticleWrapper = styled('div')`
margin-top:5vh;
`
export default props => {
  return (
    <Layout>
    <SEO title="Pomóż nam1" />
    <Header bg={helpImage} title="Pomóż nam!" />
    <ArticleWrapper>
    <Article>
    <p>Hej, doceniamy, że chcesz włączyć się w naszą pracę. To wiele znaczy.
    Możesz pomóc (może nawet wszystkim) warszawskim przyszłym licealistom!
    </p>
    <p>Poniżej przedstawiamy kilka sposobów na twój wkład,
    lecz jeśli masz inny pomysł, jak nam pomóc, daj nam znać na Messengerze albo mailem  - <TextLink wrapper="a" href="mailto:ideas@warsawlo.pl">ideas@warsawlo.pl</TextLink>.
    </p>
    <h3>Spraw, by było o nas głośno!</h3>
    <p>Czy chcesz udostępnić naszą stronę na FB, czy pisać z hashtagiem #WarsawLO - up to you. Po prostu spraw, by social media nas poznały.</p>
    <h3>Wyłapuj błędy!</h3>
    <p>Jak przeglądając nasz serwis tafisz na jakiś błąd, zgłoś go - napisz do nas na Messengerze albo na <TextLink wrapper="a" href="mailto:report@warsawlo.pl">report@warsawlo.pl</TextLink></p>
    <h3>Kręci Cię programowanie?</h3>
    <p>
      To jest coś. Nie pozwól swojemu talentowi się marnować. Zajrzyj na stronę <TextLink to="/for-developers">dla deweloperów</TextLink>,
      sprawdź, czy od strony technicznej odpowiada Ci nasz projekt, a jeśli tak to świetnie! Napisz do nas na Messengerze lub na <TextLink wrapper="a" href="mailto:ideas@warsawlo.pl">ideas@warsawlo.pl</TextLink>
    </p>
    </Article>
    </ArticleWrapper>
    </Layout>
  )
}
