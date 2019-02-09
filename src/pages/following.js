import React, {Component} from 'react'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import dataImage from 'images/data.jpg'
import Article from 'components/Article'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faFrownOpen } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StaticQuery, graphql } from "gatsby"
import HorizontalCard from 'components/HorizontalCard'
const Wrapper = styled('div')`
width:100%;
margin-top:1em;
`
const Container = styled('div')`
  width:75%;
  margin:auto;
`
const InfoWrapper = styled('div')`
width:100%;
.frown{
  margin:auto;
  display:block;
}
margin-top:10vh;
text-align:center;
`
class Following extends Component{
  constructor(props){
    super(props)
    this.state ={
      following: typeof window !== 'undefined' && localStorage.following ? JSON.parse(localStorage.following) : []
    }
  }
  toggleFollow = (regon) => {
    if(this.state.following.includes(regon)){
      this.setState(state => {
        let following = state.following
        following.splice(following.indexOf(regon), 1)
        return {
          following
        }
      })
    }else{
      this.setState(state => ({
        following: [...state.following, regon]
      }))
    }
  }
  render = () => {
    return (
      <Layout>
      <SEO title="Obserwowane szkoły" />
      <Wrapper>
      <Container>
      <h1>Obswerowane szkoły</h1>
      {
        this.state.following.length === 0 && (
          <InfoWrapper>
          <FontAwesomeIcon icon={faFrownOpen} size="2x" className="frown"/>
          <h3>Nie obserwujesz jeszcze żadnych szkół</h3>
          <p>Aby obserwować szkołę kliknij <i><FontAwesomeIcon icon={faStar} /> Obserwuj</i> przy danej szkole.</p>
          </InfoWrapper>
        )
      }
      {
        this.state.following && this.state.following.map(regon => {
          let school = this.props.data.allSchool.edges.filter(edge => edge.node.meta.regon === regon)[0]
          return <HorizontalCard school={school.node} onToggleFollow={this.toggleFollow} />
        })
      }
      </Container>
      </Wrapper>
      </Layout>
    )
  }
}
export default () => (
  <StaticQuery
    query={graphql`
      query {
        allSchool {
          edges {
            node {
              name{
                full
              }
              contact{
                website
              }
              location{
                address{
                  District
                }
              }
              meta{
                regon
              }
              media,
              thresholds{
                _2018{
                  overview{
                    availableSubjects,
                    pointsRange
                  }
                }
              }
            }
          }
        }
      }`}
    render={data => <Following data={data} />}
  />
)
