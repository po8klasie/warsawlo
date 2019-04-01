import React, {Component} from 'react'
import styled from '@emotion/styled'
import Tag from 'components/Tag'
import subjectsMapping from 'utils/subjectsMapping'
import { Link } from 'gatsby'
import Icon from 'components/Icon'
import PlusIcon from '../images/icons/plus.svg'
import CheckIcon from '../images/icons/check.svg'
import theme from 'utils/theme'
import toggleFollow from 'utils/follow'
import FollowModal from 'components/modals/Follow'
const responsiveWidth = '700px'
const gradient = `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.tertiary})`
const CardWrapper = styled(Link)`
  all:unset;
  width:100%;
  border-radius:5px;
  display:grid;
  grid-template-columns: 2fr 8fr 1fr;
  margin:1em 0;
  cursor:pointer;
  transition: .4s all;
  background: white;
  border: 3px solid ${props => props.selected ? `${theme.colors.primary} !important` : '#ddd'};
  &:hover{
    border-color:#aaa;
  }
  @media (max-width: ${responsiveWidth}) {
    margin: 1em 0;
    grid-template-columns: 1fr;
  }
`
const Info = styled('div')`
  padding:1em;
  h3{
    margin-bottom:20px;
  }
`
const SchoolImage = styled('img')`
  object-fit:cover;
  margin:0;
  height:100%;
  width:100%;
  &::after{
    content: 'Info';
  }
  @media (max-width: ${responsiveWidth}) {
    height:200px;
  }
`
const Select = styled.div`
  height:100%;
  background:transparent;
  display: flex;
  align-items:center;
  justify-content:center;
  transition: .2s all;
  svg{
    transition: .2s all;
  }
`
const LOPlaceholder = styled.div`
  width:100%;
  height: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  font-family:'Playfair Display';
  text-align:center;
  font-size:5em;
  background: ${gradient};
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
  color:${theme.colors.primary};
`
export default class extends Component{
  constructor(props){
    super(props)
    console.log(props.school)
    this.state = {
      openModal: false,
      selected: false,
      following: typeof window !== 'undefined' && localStorage.following && JSON.parse(localStorage.following).includes(props.school.meta.regon)
    }
  }
  toggleSelect = (e) => {
    console.log('xd')
    e.preventDefault()
    this.props.onToggleSelect(this.props.school.meta.regon)
  }
  openModal = () => this.setState({
    openModal:true
  })
  handleAgree = () => {
    if(typeof window !== 'undefined'){
      localStorage.followConsent = 'true'
    }
    this.setState({
      openModal:false
    })
  }
  handleCancel = () => {
    this.setState({
      openModal:false
    })
  }
  render = () => {
    let { school, filters, selected } = this.props
    console.log(selected == true)
    return (
      <>
        <CardWrapper to={`/school/${school.meta.regon}`} selected={selected}>
        {
           <LOPlaceholder>LO</LOPlaceholder>
        }
        <Info>
        <h3>{school.name.full}</h3>
        <h5>{school.location.address.District}</h5>
        {/* {
          school.thresholds && school.thresholds._2018.overview.availableSubjects.map(subject => {
            let subArr = subjectsMapping.filter(s => s[2] == subject)
            let color = subArr[0] ? subArr[0][1] : 'black'
            return (
                <Tag
                small
                color={color}
                key={subject}
                active={filters && filters.profiles.includes(subArr[0] ? subArr[0][0] : 0)}
                >
                {subject}
              </Tag>
            )
          })
        } */}
        </Info>
        <Select onClick={this.toggleSelect} selected={selected}>
         <Icon icon={selected ? CheckIcon : PlusIcon} color={theme.colors.primary} /> 
       
          </Select>

        </CardWrapper>
      
        </>
      )
  }
}
