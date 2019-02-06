import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {Link, Redirect} from 'react-router-dom'
import {css} from 'emotion'
import SiteWrapper from '../components/SiteWrapper'
import SchoolData from '../data/data.json'
import Subjects from '../data/subjects.json'
import Tag from './Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ScrollspyNav from "react-scrollspy-nav"
import { faPhone, faGlobe, faAt, faFax, faMapMarkerAlt, faRoad, faCity, faUsers, faSchool, faHandshake, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
const Wrapper = styled('div')`
  width:100%;
  height:100%;
`
const Handler = styled(Link)`
all:unset;
display:block;
left: 50%;
top:10px;
margin-right: -50%;
transform: translate(-50%, 0);
width:10%;
height:10px;
background:white;
position:absolute;
border-radius:20px;
cursor:pointer;
`
const InfoGrid = styled('div')`
a, a:visited{
  color: ${props => props.theme.colors.primary};
  padding: 5px;
  border-radius:3px;
  transition: .1s all;
}
a:hover{
  background: ${props => props.theme.colors.primary};
  color:white;
}
  display: grid;
  visibility: ${props => props.show ? 'visible' : 'hidden'};
grid-template-columns: repeat(3, 1fr);
grid-column-gap: 30px;
grid-row-gap: 30px;

.geo{
  color: rgba(0,0,0,0.5);
}
.profile{
  border-bottom: 3px solid ${props => props.theme.colors.light};
  &:last-of-type{
    border-bottom: none;
  }
}
.threshold{
  text-align:right;
  margin: 0 0 0 10px;
}
`
const Box = styled('div')`
  margin:20px;
  background:white;
  padding:10px;
`
const HeaderBox = styled(Box)`
  position: ${'sticky'};
  top: ${props => props.navHeight-2}px;
  left:0;
  right:0;
  z-index:20;
`
const InnerGrid = styled('div')`
  & > div {
    display: grid;
  grid-template-columns: 1.2em 0.5fr 1fr;
  grid-column-gap: 10px;
  margin: 10px 0 10px 0;

  & *{
    display:flex;
    align-items:center;
  }
  }
`
const AddressGrid = styled('div')`

    display: grid;
  grid-template-columns: 1.2em 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 20px;

`
const ProfilesGrid = styled('div')`
    display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  .profile{
    display:grid;
    grid-template-columns: 8fr 2fr;
    margin: 20px 0 20px 0;
  }
`
const SectionHeader = styled('h1')`
margin-left:20px;
width:calc(100% - 40px);
color:${props => props.theme.colors.primary};
border-bottom: 3px solid ${props => props.theme.colors.primary};
`
const YearHeader = styled('h3')`
  width:calc(100% - 40px);
  color:black;
  border-bottom: 3px solid black;
  margin-bottom:-20px;
  margin-left:20px;
  text-align:center;
`
const noMargin = direction => css`margin-${direction}: 0;`
const contactMapping = [
  {
    name: 'website',
    showName: 'Strona',
    icon: faGlobe,
    linkPrefix: 'http://',
    transform: data => data.replace('www.', '')
  },
  {
    name: 'email',
    showName: 'Email',
    icon: faAt,
    linkPrefix: 'mailto:'
  },
  {
    name: 'phone',
    showName: 'Telefon',
    icon: faPhone,
    linkPrefix: 'tel:'
  },
  {
    name: 'fax',
    showName: 'Faks',
    icon: faFax,
    linkPrefix: 'fax:'
  }
]
class SchoolInfo extends Component{
 constructor(props){
 super(props)
 }
 render = () => {
  if(!this.props.data.data[this.props.select.schoolID]){
    return <Redirect to='/map' />
  }
 return (
   <Wrapper>
   <Handler to={this.props.collapsed ? `/school/${this.props.data.data[this.props.select.schoolID].name.full}` : '/map'} />
   <HeaderBox navHeight={this.props.style.navHeight}>
   <h1>{this.props.data.data[this.props.select.schoolID].name.full}</h1>
   <h4>{this.props.data.data[this.props.select.schoolID].meta.schoolType}</h4>
   <ScrollspyNav
                       scrollTargetIds={["basic-info", "profiles",]}
                       activeNavClass="is-active"
                       scrollDuration="1000"
                       headerBackground={false}
                   >
   <div>
    <a href="#basic-info"><Tag active={true}>Informacje</Tag></a>
    <a href="#profiles"><Tag active={false}>Profile</Tag></a>
   </div>
   </ScrollspyNav>
   </HeaderBox>
   <div id="basic-info">
   <SectionHeader>Informacje</SectionHeader>
   <Box className={noMargin('bottom')}>
    <p>Szkoła o wieloletniej tradycji</p>
   </Box>
   <InfoGrid show={!this.props.collapsed} className={noMargin('top')}>

     <div>
     <Box>
     <h4>Kontakt:</h4>
     <InnerGrid>
       {(() => {
         return contactMapping.map(contact => {
           if(!this.props.data.data[this.props.select.schoolID].contact[contact.name])
              return null

           let value = contact.transform ? contact.transform(this.props.data.data[this.props.select.schoolID].contact[contact.name]) : this.props.data.data[this.props.select.schoolID].contact[contact.name]
           return (
             <div>
               <div>
               <FontAwesomeIcon icon={contact.icon} />
               </div>
               <div>{contact.showName}:</div>
               <div>
                 {(() => {
                   if(contact.linkPrefix !== null)
                    return (
                      <a href={contact.linkPrefix+value} target="_blank">
                        {value}
                      </a>
                    )
                    return value
                 })()}
               </div>
             </div>
           )
         })
       })()}
     </InnerGrid>
   </Box></div><div>
    <Box>
      <h4>Lokalizacja:</h4>
      <span className="geo">
{this.props.data.data[this.props.select.schoolID].location.position.Latitude}, {this.props.data.data[this.props.select.schoolID].location.position.Longitude}
      </span>
        <AddressGrid>
          <span><FontAwesomeIcon icon={faRoad} /></span>
          {this.props.data.data[this.props.select.schoolID].location.address.Street} {this.props.data.data[this.props.select.schoolID].location.address.HouseNumber}<br/>
          <span><FontAwesomeIcon icon={faCity} /></span>
          {this.props.data.data[this.props.select.schoolID].location.address.Subdistrict}<br/>
          <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          {this.props.data.data[this.props.select.schoolID].location.address.District}
        </AddressGrid>
    </Box></div><div>
    <Box>
      <h4>Informacje o szkole:</h4>

        <InnerGrid>
          <div>
            <span><FontAwesomeIcon icon={faUsers} /></span>
            <span>Publiczna:</span>
            <span>{this.props.data.data[this.props.select.schoolID].meta.public === true ? 'TAK' : this.props.data.data[this.props.select.schoolID].meta.public === false ? 'NIE' : this.props.data.data[this.props.select.schoolID].meta.public}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faSchool} /></span>
            <span>Organ prowadzący:</span>
            <span>{this.props.data.data[this.props.select.schoolID].meta.leadingOrgan.type} {this.props.data.data[this.props.select.schoolID].meta.leadingOrgan.name}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faHandshake} /></span>
            <span>Organizacja:</span>
            <span>{this.props.data.data[this.props.select.schoolID].meta.parent}</span>
          </div>
          <div>
            <span><FontAwesomeIcon icon={faMoneyBill} /></span>
            <span>Właściciel kapitału:</span>
            <span>{this.props.data.data[this.props.select.schoolID].meta.capitalOwner}</span>
          </div>
        </InnerGrid>
    </Box></div>
   </InfoGrid>
   </div>
   <div id="profiles">
   <SectionHeader>Profile</SectionHeader>
   <ProfilesGrid>
   <div>
   <YearHeader>2018</YearHeader>
     <Box>
       <h4>Profile:</h4>
       {
         (() => {
           if(!this.props.data.data[this.props.select.schoolID].profiles)
            return null

           return this.props.data.data[this.props.select.schoolID].profiles.detailed.map(profile => {
             return (
               <div className="profile">
               <div>
                 {profile[0].map(subject => {
                   let color = Subjects.filter(arr => arr[2] == subject)[0]
                   if(color)
                    return <Tag color={color[1]}>{subject}</Tag>
                  return <Tag>{subject}</Tag>
                 })}
                 </div>
                 <span className="threshold">{profile[1]} {isNaN(profile[1]) ? null : 'pkt'}</span>
               </div>
             )
           })
         })()
       }

     </Box></div>
   </ProfilesGrid>
   </div>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
   </Wrapper>
 )
 }
 }
 const mapStateToProps = (state, ownProps) => {
   return ({
     select: state.select,
     style: state.style,
     data: state.data
 })
 }


 export default connect(mapStateToProps, null)(SchoolInfo);
