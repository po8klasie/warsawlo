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
const SearchBar = styled('div')`
  margin-top:calc(70px + ${props => props.center ? '30vh' : '0px'});
  height:10vh;
  background:#eee;
  display:grid;
  grid-template-columns:1fr 2fr 1fr;
  grid-column-gap:20px;
  input{
    width:100%;
    height:100%;
    margin:auto;
    background:transparent;
    outline:none;
    font-size:5vh;
    border:none;
  }
    transition:.2s all;
    overflow:hidden;
`
const SearchButton = styled('button')`
  height:100%;
  // background: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.primary};
  border:none;
  outline:none;
  font-size:5vh;
  position:relative;
  right:${props => props.active ? '0' : '-100%'};
  // transition:.2s all;
`
const Tutorial = styled('div')`
  width:50%;
  margin: 10vh auto 0 auto;
  display: ${props => props.active ? 'block' : 'none'};
  transition:.2s all;
  text-align:center;
  font-size:2em;
  svg{
    display:block;
    margin:auto;
    width:2em;
  }
`
const Filters = styled('div')`
  width:100%;
  display: ${props => props.active ? 'block' : 'none'};

  transition:.2s all;
border-bottom:3px solid #eee;
  .labels{

    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap:2em;
    height:100%;
    margin:0;
    li{
      user-select: none;
      display:flex;
      align-items:center;
      justify-content:center;
      height:100%;
      span{
        cursor:pointer;
      }
    }
  }

`
const FiltersSettings = styled('div')`
  display: ${props => props.active ? 'block' : 'none'};
  padding:20px;
`

export default class extends Component{
  constructor(props){
    super(props)
    this.params = new URLSearchParams(this.props.location.search)
    this.state = {
      query: this.params.has('query') ? this.params.get('query') : '',
      inputDirty: true,
      buttonDirty: false,
      activeFiltersTab: null,
      view: 'horizontal',
      loaded:false,
      filters: {
        profiles: [],
        pointsRange: [0, 200]
      }
    }

  }
  updateURI = () => {
    console.log(`${this.props.location.pathname}?${this.params.toString()}`)
    this.props.navigate(`${this.props.location.pathname}?${this.params.toString()}`)
  }
  setFiltersParams = () => {
    // for(let [name, value] of Object.entries(this.state.filters)) {
    //   if(name !== 'query' && value && !isEqual(value, this.defaultFilters[name]))
    //   this.params.set(name, transformParams(name, value))
    // }
  }
  handleQueryChange = (e) => {
        let query = e.target.value
    this.setState({
      query,
      inputDirty:true
    }, () => {
      if(query.trim().length === 0)
        this.params.delete('query')
      else
        this.params.set('query', query)
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
      loaded: true
    })
  }
  showAll = () => {
    this.setState({
      query: '',
      inputDirty: true
    })
  }
  render = () => {
    let isQueryEmpty = this.state.query.trim().length === 0 && !this.state.inputDirty
    return (
      <Layout>
      <SearchBar center={!this.state.inputDirty}>
      <div></div>
      <input placeholder="Szukaj szkoły" onChange={this.handleQueryChange} value={this.state.query}/>
      <SearchButton active={!isQueryEmpty}><FontAwesomeIcon icon={faSearch} /></SearchButton>
      </SearchBar>
      <Filters active={this.state.inputDirty}>
      <ul className="labels">
        <li><span {...this.createListenerFor('extensions')}>
        Rozszerzenia <FontAwesomeIcon icon={this.state.activeFiltersTab == 'extensions' ? faCaretUp : faCaretDown} />
        </span></li>
        <li><span {...this.createListenerFor('pointsNumber')}>
        Liczba punktów <FontAwesomeIcon icon={this.state.activeFiltersTab == 'pointsNumber' ? faCaretUp : faCaretDown} />
        </span></li>
        <li><span {...this.createListenerFor('location')}>
        Lokalizacja <FontAwesomeIcon icon={this.state.activeFiltersTab == 'location' ? faCaretUp : faCaretDown} />
        </span></li>
      </ul>
      <FiltersSettings active={this.state.activeFiltersTab !== null}>
      {(() => {
        switch(this.state.activeFiltersTab){
          case 'extensions':
            return <ExtensionsFilter onToggle={this.handleProfilesToggle} profiles={this.state.filters.profiles}/>
          case 'pointsNumber':
            return <PointsRangeFilter onChange={this.state.handlePointsRangeChange} />
          case 'location':
            return 'beka'
          default:
            return null
        }
      })()}
      </FiltersSettings>
      </Filters>
      {this.state.inputDirty ? <Results view={this.state.view} query={this.state.query} filters={this.state.filters} onLoad={this.handleLoad}/> : null}

      <Tutorial active={!this.state.inputDirty}>
      <FontAwesomeIcon icon={faArrowUp} />
      <span>Wpisz nazwę szkoły powyżej <br /> lub</span>
      <Button onClick={this.showAll}>przeglądaj szkoły</Button>
      </Tutorial>
      </Layout>
    )
  }
}
