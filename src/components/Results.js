import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import isEqual from 'lodash.isequal'
import Engine from 'utils/engine'
import HorizontalCard from 'components/HorizontalCard'


const responsiveWidth = '1000px'
const styles = (props) => ({
  horizontal: `
    width:75%;
    margin:auto;
    @media (max-width: ${responsiveWidth}){
    width:calc(100% - 2em);
    }
  `,
})

const CardsWrapper = styled('div')`
  ${props => styles(props)[props.view]}
`

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: props.data.allSchool.edges.map(({ node }) => node),
    }
    this.engine = new Engine(props.data.allSchool.edges.map(({ node }) => node))
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.query.trim() !== this.props.query.trim() || !isEqual(prevProps.filters, this.props.filters)) {
      this.setState({
        loading: true,
      })
      this.setState({
        results: await this.engine.search(this.props.query, this.props.filters),
        loading: false,
      })
      this.props.onLoad()
    }
  }
  render = () => {
    return (
      <CardsWrapper view={this.props.view}>
        {
          this.state.results && this.state.results.map(school => <HorizontalCard school={school}
                                                                                 filters={this.props.filters}
                                                                                 key={school.meta.regon}/>)
        }
      </CardsWrapper>
    )
  }
}

export default props => (
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
    render={data => <Results data={data} {...props} />}
  />
)
