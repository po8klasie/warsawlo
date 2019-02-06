import React, { Component} from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import isEqual from 'lodash.isequal'

import HorizontalCard from 'components/HorizontalCard'
import * as Comlink from 'comlinkjs'

const styles = (props) => ({
  horizontal: `
    width:75%;
    margin:auto;
  `
})

const CardsWrapper = styled('div')`
  ${props => styles(props)[props.view]}
`
class Results extends Component{
  constructor(props){
    super(props)
    this.state = {
      results: props.data.allSchool.edges.map(({node}) => node)
    }
    console.log(props.data)
    this.setupWorker()
  }
  setupWorker = async () => {
    this.workerClass = Comlink.proxy(new Worker('utils/searchWorker.js', { type: 'module' }))
    this.worker = await new this.workerClass(this.props.data.allSchool.edges.map(({node}) => node))
  }
  componentDidUpdate = async (prevProps, prevState) => {
    if(prevProps.query.trim() !== this.props.query.trim() || !isEqual(prevProps.filters, this.props.filters)){
      console.log(this.props.query)
      this.setState({
        loading: true
      })
      this.setState({
        results: await this.worker.search(this.props.query, this.props.filters),
        loading: false
      })
    }
  }
  render = () => {
    console.log(this.state.results)
    return (
      <CardsWrapper view={this.props.view}>
      {
        this.state.results && this.state.results.map(school => <HorizontalCard school={school} filters={this.props.filters} key={school.meta.regon}/>)
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
                  regon,
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
