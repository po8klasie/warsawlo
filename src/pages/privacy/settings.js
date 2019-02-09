import React, {Component} from 'react'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import { Link } from 'gatsby'
import SEO from 'components/SEO'
import privacyImage from 'images/privacy.jpg'
import Article from 'components/Article'
import Header from 'components/Header'
import Button from 'components/Button'
import TextLink from 'components/TextLink'
const ArticleWrapper = styled('div')`
margin-top:5vh;
`
const DeleteButton = styled(Button)`
width:100%;
`
export default class extends Component{
  constructor(props){
    super(props)
    this.state = {
      deleted: false
    }
  }
  delete = () => {
    if (typeof window !== `undefined`) {
      window.localStorage.clear()
      window.sessionStorage.clear()
}
this.setState({
  deleted:true
})
  }
  render = () => {
    return (
      <Layout>
      <SEO title="Ustawienia prywatności" />
      <Header bg={privacyImage} title="Ustawienia prywatności" />
      <ArticleWrapper>
      <Article>
      {
        this.state.deleted ? (
          <>
          <p>Dane zostały usunięte</p>
          <TextLink to="/">Wróć do strony głównej</TextLink>
          </>
        ) : (
          <Button onClick={this.delete}>Wyczyść wszystkie dane</Button>
        )
      }
      </Article>
      </ArticleWrapper>
      </Layout>
    )
  }
}
