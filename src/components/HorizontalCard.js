import React, {Component} from 'react'
import styled from '@emotion/styled'
import LOPlaceholder from 'components/LOPlaceholder'
import Tag from 'components/Tag'
import subjectsMapping from 'utils/subjectsMapping'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import theme from 'utils/theme'
import toggleFollow from 'utils/follow'
import FollowModal from 'components/modals/Follow'
const responsiveWidth = '700px'
const CardWrapper = styled(Link)`
  all:unset;
  width:100%;
  border: 3px solid #eee;
  display:grid;
  grid-template-columns: 1fr 4fr 1fr;
  margin:1em;
  cursor:pointer;
  transition: .4s all;
  &:hover{
    box-shadow: 0 20px 70px -20px rgba(0,0,0,0.3);
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
const Actions = styled('div')`
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  & > div{
    @media (max-width: ${responsiveWidth}) {
      width:100%;
    }
  }

  a{
    all:unset;
    cursor:pointer;
    background: #eee;
    padding:5px;
    margin:10px;
    display:block;
    font-size:0.8em;
    text-align:center;
  }
`
const FollowButton = styled('button')`
cursor:pointer;
padding:5px;
margin:10px;
display:block;
font-size:0.8em;
width: calc(100% - 34px);
background:${props => props.active ? theme.colors.primary : 'transparent'};
color: ${props => props.active ? 'white' : 'black'};
text-align:center;
border: 2px solid ${theme.colors.primary};
outline:none;
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

export default class extends Component{
  constructor(props){
    super(props)
    console.log(props.school)
    this.state = {
      openModal: false,
      following: typeof window !== 'undefined' && localStorage.following && JSON.parse(localStorage.following).includes(props.school.meta.regon)
    }
  }
  toggleFollow = (e) => {
    e.preventDefault()
    if(typeof window !== 'undefined' && localStorage.followConsent !== 'true'){
      this.openModal()
      return
    }
    console.log(this.props)
    toggleFollow(this.props.school.meta.regon)
    this.setState(state => ({
      following: !state.following
    }))
    if(this.props.onToggleFollow){
      this.props.onToggleFollow(this.props.school.meta.regon)
    }
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
    let { school, filters } = this.props
    return (
      <>
        <CardWrapper to={`/school/${school.meta.regon}`}>
        {
          school.media && school.media[0] ? <SchoolImage src={school.media[0]} /> : <LOPlaceholder />
        }
        <Info>
        <h3>{school.name.full}</h3>
        <h5>{school.location && school.location.address.District}</h5>
        {
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
        }
        </Info>
        <Actions>
        <div>
          {school.contact.website && <a href={`http://${school.contact.website}`}
          target="_blank"
          rel="noopener norefferer"
          onClick={e => e.stopPropagation()}
          >Odwiedź stronę</a>}
          <a href={`https://google.com/search?q=${school.name.full.split(' ').join('+')}`}
          target="_blank"
          rel="noopener norefferer"
          onClick={e => e.stopPropagation()}
          >Szukaj w Google</a>
          <FollowButton className="action follow" active={this.state.following} onClick={this.toggleFollow}>
          <FontAwesomeIcon icon={faStar} /> {this.state.following ? 'Nie obserwuj' : 'Obserwuj'}
          </FollowButton>
          </div>

        </Actions>

        </CardWrapper>
        <FollowModal open={this.state.openModal} onAgree={this.handleAgree} onCancel={this.handleCancel}/>
        </>
      )
  }
}
