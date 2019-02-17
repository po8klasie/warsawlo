import React, {Component} from 'react'
import Layout from 'components/Layout'
import Input from 'components/Input'
import styled from '@emotion/styled'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowUp, faSearch, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import ExtensionsFilter from 'components/ExtensionsFilter'
import Results from 'components/Results'
import Button from 'components/Button'
import PointsRangeFilter from 'components/PointsRangeFilter'
import transformParams from 'utils/engine/transformParams'
import Loader from 'components/Loader'
import theme from 'utils/theme'
import SEO from 'components/SEO'
import mountainRoadImage from 'images/mountain-road.jpg'
import subjects from 'utils/subjects'
import { timingSafeEqual } from 'crypto';
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
  
`
const BrowseButton = styled(Button)`
  background: transparent;
  border-color:white;
  color:white;
  white-space:nowrap;
  display: block;
  margin:20px 0px 20px 10px;
`
const SearchButton = styled(Button)`
  background: ${theme.colors.primary};
  border-color:${theme.colors.primary};
  color:white;
  width:100%;
  margin:20px 10px 20px 0;
  display: block;
  
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
  background: linear-gradient(transparent 0%, ${theme.colors.primary});
  padding: ${props => props.minify ? '0' : '2em 0'};
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    background: url(${mountainRoadImage});
  background-size:cover;
  background-position:center center;
  z-index:-1;
  }
`
const Heading = styled('h1')`
  font-weight: 700;
  text-align: center;
  font-size:5em;
  padding-top:${props => props.active ? '10vh' : '0'};
  transform: translateY(${props => props.active ? '0' : '-10000px'});
  height: ${props => props.active ? 'auto' : '0'};
`
const Subjects = styled('div')`
  display:flex;
  flex-wrap:wrap;
  justify-content: center;
`
const SubjectTag = styled('span')`
  margin:10px;
  padding:10px;
  border:2px solid ${props => props.color};
  height:auto;
  border-radius:3px;
  color:black;
  background:rgba(0,0,0,0.5);
  color:white;
  
`
const Container = styled('div')`
  width:50%;
  margin:auto;
`

const TabsNav = styled('div')`
  display:flex;
  margin:${props => props.full ? '10vh 0 0 0' : '0'};
  color:white;
  margin-bottom:1em;
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
        pointsRange: [0, 200]
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
            >Profile i progi</TabLink>
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
      <Subjects>
        {
          subjects.map(subject => (
            <SubjectTag color={subject.color}>{subject.full}</SubjectTag>
          ))
        }
      </Subjects>
      </Tab>
      <Tab active={this.state.activeTab === 'location'}>
      <span>W promieniu</span>
      <input /><span> km</span>
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
