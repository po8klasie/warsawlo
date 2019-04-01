import React, {Component} from 'react'
import AppLayout from 'components/app/Layout'
import theme from 'utils/theme'
import transparentize from 'utils/transparentize'
import HorizontalCard from 'components/HorizontalCard'
import Icon from 'components/Icon'
import SearchIcon from '../images/icons/search.svg'
import Engine from 'utils/engine'
import styled from '@emotion/styled'
import { Link, StaticQuery, graphql } from 'gatsby'
import Input from 'components/Input'
import Tag from 'components/Tag'
import subjects from 'utils/subjects'
import 'rc-slider/assets/index.css'
import { Range } from 'rc-slider'
import { isInChoices, addToChoices, RemoveFromChoices} from 'utils/manage/choices'
import { removeFromChoices } from '../utils/manage/choices';
const gradient = `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.tertiary})`

const SearchInputWrapper = styled.div`
    width:75%;
    font-size:1.5em;
    margin: 10vh auto 0 auto;
    display: flex;
    position:relative;
    border: none;
    background: white;
   
    outline:none;
    border-radius:10px;
   
    
`
const SearchInput = styled.input`
    width:100%;
    heigth:100%;
    border-radius:inherit;
    margin:0;
    padding:10px;
    border: none;
    outline:none;
    background: transparent;
    transition: box-shadow .2s;
    padding-right: calc(2em + 10px + 10px);
    border: 3px solid #ddd;
    &:focus{
        border-color: #aaa;
    }
`
const InputIcon = styled(Icon)`
    position:absolute;
    top:50%;
    transform: translate(0, -50%);
    right:0;
    height:2em;
    z-index:2;
`
const SearchLayout = styled.div`
    width:100%;
    max-width:100%;
    height:100%;
    ma-height:100%;
    display: grid;
    grid-template-columns:4fr 1fr;
`
const Filters = styled.aside`
    width: 100%;
    height:100%;
    padding: 1em;
    background:white;
    border-left: 1px solid #ddd;
    h2{
        // margin-top:10vh;
    }
`
const ResultsWrapper = styled.div`
    width:75%;
    margin:auto;
`
const ActionsWrapper = styled.div`
    width:75%;
    border-radius:5px;
    padding:10px;
    border: 2px solid #ddd;
    margin:1em auto;
    max-height: ${props => props.active ? '100%' : '0'};
    visibility: ${props => props.active ? 'visible' : 'hidden'};
    transition: .2s all;
`
const Action = styled.button`
background: ${theme.colors.primary};
    color:white;
    padding: .5em 1em;
    border:none;
    border-radius:3px;
`
const Filter = styled.div`
    margin-bottom:2em;
`
const ProfilesWrapper = styled.div`
    max-height:20vh;
    overflow:hidden;
    position: relative;
    transition: max-height 2s;
    &::after{
        content: '';
        position:absolute;
        text-align:center;
        display:block;
        z-index:2;
        bottom:0;
        left:0;
        width:100%;
        height:3em;
        background:linear-gradient(transparent, white);
        transition: background 2s;
    
    }
    &:hover{
        max-height:100vh;
        &::after{
            background: transparent;
        }
    }
    `
const PointsRangeFilter = styled.div`
    .rc-slider-track{
        background: ${gradient};
    }
    .rc-slider-handle{
        border-color: ${theme.colors.primary};
        box-shadow:none;
        &:hover{
           
            box-shadow:none;
        }
    }
    .rc-slider-handle-click-focused{
     
        box-shadow:none;
    }
`
const DistanceFilter = styled.div`
display: flex;
    align-items:center;
    span{
        margin-left:.5em;
        font-size:1.2em;
    }
    input{
        background: white;
        width:3em;
    }
`
const Subject = styled.span`
    padding:10px;
    background: #eee;
    cursor: pointer;
    text-align:center;
    margin:10px;
    display: block;
   border-radius:3px;
    background:${props => props.active ? 'transparent' : '#eee'};
    border: 2px solid ${props => props.active ? props.color : 'transparent'};
  }
`


class Search extends Component{
    constructor(props){
        super(props)
        let schoolsData = props.data.allSchool.edges.map(({node}) => node)
        this.state = {
            results : [...schoolsData],
            query: '',
            selected: [],
            subjects: [],
            pointsRange: [0, 200]
        }
        this.engine = new Engine(schoolsData)
    }
    search = async () => {
        this.setState({
            results: await this.engine.search(this.state.query, {
                profiles: this.state.subjects,
                // distance: this.state.distance,
                pointsRange: this.state.pointsRange
            })
        })
    }
    handleQueryChange = (e) => {
        this.setState({
            query: e.target.value
        }, () => this.search())
    }
    handleToggleSelect = (regon) =>{
        if(this.state.selected.includes(regon)){
            let { selected } = this.state
            selected.splice(selected.indexOf(regon), 1)
            this.setState({
                selected
            }, this.getChoicesButtonLabel)
        }else{
            this.setState(state => ({
                selected: [...state.selected, regon]
            }), this.getChoicesButtonLabel)
        }
    }
    handleToggleSubject = (subject) => {
        if(this.state.subjects.includes(subject)){
            this.setState(state => {
                let { subjects } = state
                subjects.splice(subjects.indexOf(subject), 1)
                return { subjects }
            }, this.search)
        }else{
            this.setState(state => ({
                subjects: [
                    ...state.subjects,
                    subject
                ]
            }), this.search)
        }
        
    }
    handleDistanceChange = e => {
        // this.setState({
        //     distance: parseInt(e.target.value)
        // }, this.search)
    }
    handlePointsRangeChange = pointsRange => {
        this.setState({
            pointsRange
        }, this.search)
    }
    getChoicesButtonLabel = async () => {
        let inChoices = await Promise.all(this.state.selected.map(regon => isInChoices(regon)))
        console.log(inChoices, 'inChoices')
        if(inChoices.includes(false)){
            this.setState({
                choices: 'add'
            })
        }else{
            this.setState({
                choices: 'remove'
            })
        } 
    }
    handleToggleChoices = async () => {
        return Promise.all(
        this.state.selected
        .map(selected => this.state.choices === 'add' ? addToChoices(selected) : removeFromChoices(selected))
        )
    }
    render(){
        console.log(this.state.selected, this.state.selected.includes)
        return (
            <AppLayout location={this.props.location}>
                <SearchLayout>
                <div>

               
                <SearchInputWrapper>
                    <SearchInput placeholder="Szukaj szkoły" onChange={this.handleQueryChange}/>
                    <InputIcon icon={SearchIcon} color="#aaa"/>
                </SearchInputWrapper>
                <ActionsWrapper active={this.state.selected.length > 0}>
                    <Action onClick={this.handleToggleSelect}>
                        {this.state.choices === 'add' ? 'Dodaj do swoich wyborów' : 'Usuń ze swoich wyborów'}
                    </Action>
                </ActionsWrapper>
                <ResultsWrapper>
                {
                    this.state.results.map((school, i) => (
                        <HorizontalCard
                        school={school}
                        selected={this.state.selected.includes(school.meta.regon)}
                        onToggleSelect={this.handleToggleSelect} />
                    ))
                }

                </ResultsWrapper>
                
                </div>
                <Filters>
                    <h2>Filtruj</h2>
                    <Filter>
                        <h3>Rozszerzenia</h3>
                        <ProfilesWrapper>
                            {
                                subjects.map(subject => (
                                    <Subject 
                                    active={this.state.subjects.includes(subject.short)}
                                    color={subject.color}
                                    onClick={() => this.handleToggleSubject(subject.short)}>{subject.full}</Subject>
                                ))
                            }
                        </ProfilesWrapper>
                    </Filter>
                    <Filter>
                        <h3>Liczba punktów</h3>
                        <PointsRangeFilter>
                        <Range defaultValue={[0, 200]} min={0} max={200} onChange={this.handlePointsRangeChange} height="2px"/>
                        </PointsRangeFilter>
                    </Filter>
                    <Filter>
                        <h3>W promieniu</h3>
                        <DistanceFilter>
                            <Input type="number" min="0" placeholder="" onChange={this.handleDistanceChange} />
                            <span>km</span>
                        </DistanceFilter>
                    </Filter>
                </Filters>
            
                </SearchLayout>
                
                
            </AppLayout>
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
      render={data => <Search data={data} {...props} />}
    />
  )