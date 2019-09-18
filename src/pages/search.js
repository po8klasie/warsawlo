import React, {Component} from 'react'
import Layout from 'components/Layout'
import Input from 'components/Input'
import styled from '@emotion/styled'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowUp, faSearch, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import ExtensionsFilter from 'components/ExtensionsFilter'
import PointsRangeFilter from 'components/PointsRangeFilter'
import RadiusFilter from 'components/RadiusFilter'
import Results from 'components/Results'
import Button from 'components/Button'
import Img from 'gatsby-image'
import transformParams from 'utils/engine/transformParams'
import Loader from 'components/Loader'
import theme from 'utils/theme'
import SEO from 'components/SEO'
import mountainRoadImage from 'images/mountain-road.jpg'
import subjects from 'utils/subjects'
import { timingSafeEqual } from 'crypto';
import Tag from 'components/Tag'
const responsiveWidth = '1000px'
const SearchBar = styled('input')`
  margin-top:1em;
    width:100%;
    font-size:2em;
    margin:auto;
    background:white;
    border:none;
    display: block;
    border-radius:5px;
    padding: 10px;
    
    transition:.2s all;
    overflow:hidden;
    outline:none;
    @media (max-width: ${responsiveWidth}){
      font-size:1.5em;
    }
`

const Tab = styled('div')`
transition: .5s all;
  ${props => props.active ? `
  transform: translateX(0); 
  max-height:auto;
  ` : `
  transform: translateX(-10000px); 
  height:0;
  `}
`
const Actions = styled('div')`
  width:100%;
  margin:  ${props => props.full ? '10vh auto 0 auto' : '0'};
  display: flex;
  justify-content: center;
  transition:.2s all;
  text-align:center;
  font-size: ${props => props.full ? '2em' : '1em'};
  @media (max-width: ${responsiveWidth}){
    display: block;
    margin: 20px 0 20px 0;
    font-size:2em;
  
  }
`
const BrowseButton = styled(Button)`
  background: rgba(0,0,0,0.4);
  border-color:rgba(255,255,255,0.4);
  color:white;
  white-space:nowrap;
  display: block;
  margin:20px 0px 20px 10px;
  @media (max-width: ${responsiveWidth}){
    font-size:.5em;
    width: 100%;
    white-space:wrap;
    margin:0;
    padding: 10px 0;
  }
`
const SearchButton = styled(Button)`
  background: ${theme.colors.primary};
  border-color:${theme.colors.primary};
  color:white;
  width:100%;
  margin:20px 10px 20px 0;
  display: block;
  @media (max-width: ${responsiveWidth}){
    font-size:.5em;
    width: 100%;
    margin:0 0 10px 0;
    padding: 10px 0;
  }

`
const ResultsWrapper = styled('div')`
  display: ${props => props.active ? 'block' : 'none'};
`
const ResultsLoader = styled(Loader)`
  display: ${props => props.loading ? 'block' : 'none'};
`

const WelcomeWrapper = styled('div')`
  height: ${props => props.minify ? 'auto' : 'calc(100vh - 80px)'};
  width:100%;
  position: relative;
  padding: ${props => props.minify ? '0 0 10px 0' : '2em 0'};
  transition: .6s all;
  .bg{
    position: absolute !important;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    object-fit: cover;
  z-index:-1;
  }
`
const Heading = styled('h1')`
  font-weight: 700;
  text-align: center;
  font-size:5em;
  @media (max-width: ${responsiveWidth}){
    font-size:2em;
  }
  padding-top:${props => props.active ? '10vh' : '0'};
  transform: translateY(${props => props.active ? '0' : '-10000px'});
  height: ${props => props.active ? 'auto' : '0'};
`
const Container = styled('div')`
  width:50%;
  margin:auto;
  @media (max-width: ${responsiveWidth}){
    width:calc(100% - 2em);
  }
`

const TabsNav = styled('div')`
  display:flex;
  margin:${props => props.full ? '10vh 0 0 0' : '0'};
  color:white;
  margin-bottom:1em;
  flex-wrap:wrap;
  @media (max-width: ${responsiveWidth}){
    margin-top:20px;
  }
`
const TabLink = styled('span')`
cursor: pointer;
  display: block;
  margin:0 10px;
  padding:7px;
  border-bottom: 3px solid ${theme.colors.secondary};
  background: ${props => props.active ? theme.colors.secondary : 'transparent'};
  border-radius: ${props => props.active ? '3px' : 'none'};
  &:first-child{
   margin-left:0;
  }
  @media (max-width: ${responsiveWidth}) {
    font-size:.9em;
  }
`
export default class extends Component{
  constructor(props){
    super(props)
    if (typeof window !== `undefined`) {
      this.params = new URLSearchParams(this.props.location.search)
    }
    this.state = {
      query: this.params && this.params.has('query') ? this.params.get('query') : '',
      formDirty: false,
      buttonDirty: false,
      activeTab: 'name',
      view: 'horizontal',
      loading:false,
      loaded:false,
      preservedQuery: '',
      filters: {
        profiles: this.params && this.params.has('subjects') ? transformParams('subjects', this.params.get('subjects'), true): [] ,
        pointsRange: [0, 200],
        distance: null
      }
    }
  }
  updateURI = () => {
    console.log(`${this.props.location.pathname}?${this.params ? this.params.toString() : ''}`)
    this.params.forEach((value, key) => {
      if(!value)
        this.params.delete(key)
    })
    this.props.navigate(`${this.props.location.pathname}?${this.params ? this.params.toString() : ''}`)
  }
  setFiltersParams = () => {
    // for(let [name, value] of Object.entries(this.state.filters)) {
    //   if(name !== 'query' && value && !isEqual(value, this.defaultFilters[name]))
    //   this.params.set(name, transformParams(name, value))
    // }
  }
  handleQueryChange = (e) => {
    this.setState({
      query: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()


      this.setState({
        formDirty: true,
        preservedQuery: this.state.query,
      }, () => {
        this.params.set('query', this.state.query)
        this.updateURI()
      })
    

  }
  handleProfilesToggle = (profile) => {
    this.setState(state => {
      if(state.filters.profiles.includes(profile))
        return {
          filters: {
            ...state.filters,
            profiles: state.filters.profiles.filter(p => p !== profile)
          }
        }
      else
        return {
          filters: {
            ...state.filters,
            profiles: [...state.filters.profiles, profile]
          }
        }
    }, () => {
      this.params.set('subjects', transformParams('subjects', this.state.filters.profiles))
      this.updateURI()
    })
  }
  handlePointsRangeChange = (value) => {
    console.log(value)
    this.setState({
      filters: {
        pointsRange: value
      }
    }, () => {

    })
  }
  createListenerFor = (key) => ({
    onClick: () => this.setState({
      activeFiltersTab: this.state.activeFiltersTab === key ? null : key
    })

  })
  syncQueries = (e) => {
    this.setState(state => ({
      query: state.query,
      buttonDirty: true
    }))
  }
  handleLoad = () => {
    this.setState({
      loading:false
    })
  }
  handleRadiusChange = (radius) => {
    this.setState({
      loading:false
    })
  }
  showAll = () => {
    this.setState({
      query: '',
      preservedQuery: '',
      formDirty: true
    })
  }
  render = () => {
    let isQueryEmpty = this.state.query.trim().length === 0 && !this.state.inputDirty
    return (
      <Layout location={this.props.location}>
      <SEO title="Wyszukiwarka" keywords={[`liceum`, `szukaj`, `wyszukiwarka`]} />
      
      <WelcomeWrapper minify={this.state.formDirty}>
        <Img className="bg" fluid={this.props.data.file.childImageSharp.fluid} />
        <Heading active={!this.state.formDirty}>A jaki jest Twój cel podróży?</Heading>
        <Container>
          <TabsNav full={!this.state.formDirty}>
          <TabLink
            active={this.state.activeTab === 'name'}
            onClick={() => this.setState({
              activeTab: 'name'
            })}>Nazwa szkoły</TabLink>
            <TabLink
            active={this.state.activeTab === 'profiles'}
            onClick={() => this.setState({
              activeTab: 'profiles'
            })}
            >Profile</TabLink>
            <TabLink
            active={this.state.activeTab === 'points'}
            onClick={() => this.setState({
              activeTab: 'points'
            })}
            >Punkty</TabLink>
          <TabLink
            active={this.state.activeTab === 'location'}
            onClick={() => this.setState({
              activeTab: 'location'
            })}
            >Lokalizacja</TabLink>
          </TabsNav>
          <form onSubmit={this.handleSubmit} >
          <Tab active={this.state.activeTab === 'name'}>
      <SearchBar placeholder="Szukaj szkoły" id="search-input" value={this.state.query} onChange={this.handleQueryChange}/>
      </Tab>
      <Tab active={this.state.activeTab === 'profiles'}>
      <ExtensionsFilter profiles={this.state.filters.profiles} onToggle={this.handleProfilesToggle}/>
      </Tab>
      <Tab active={this.state.activeTab === 'points'}>
      <PointsRangeFilter range={this.state.filters.pointsRange} onToggle={this.handlePointsRangeChange}/>
      </Tab>
      <Tab active={this.state.activeTab === 'location'}>
      <RadiusFilter radius={this.state.filters.radius} onChange={this.handleRadiusChange}/>
      </Tab>
      
      <ResultsLoader active={this.state.loading} />
      <Actions full={!this.state.formDirty}>
      <SearchButton type="submit">Szukaj</SearchButton>
      <BrowseButton type="reset" onClick={this.showAll}>przeglądaj wszystkie szkoły</BrowseButton>
      </Actions>
      </form>
      </Container>
      </WelcomeWrapper>
      <ResultsWrapper  active={this.state.formDirty}>
      <Results view={this.state.view} query={this.state.preservedQuery} filters={this.state.filters} onLoad={this.handleLoad}/>
      </ResultsWrapper>
      </Layout>
    )
  }
}
export const query = graphql`
  query {
    file(relativePath: { eq: "mountain-road.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`