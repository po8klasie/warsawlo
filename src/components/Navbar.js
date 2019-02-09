import React, { Component, Fragment} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faAt, faCompass, faInfoCircle, faMapMarkerAlt, faSearch, faCalculator, faEnvelope, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { css} from '@emotion/core'
import styled from '@emotion/styled'
// import {connect} from 'react-redux'
// import * as styleActions from '../store/actions/style'
import Logo from 'components/Logo'
// import SiteLoader from './SiteLoader'
import { Link } from 'gatsby'
import theme from 'utils/theme'
const responsiveWidth = '1100px'

const Brand = styled(Link)`
&, &:visited, &:hover{
  background:initial;
}
all:unset;
cursor:pointer;
margin-right:20px;
font-size: 2em;
color:black !important;
display:flex;
align-items:center;
span:not(.highlight){
  font-family: ${theme.fonts.tertiary};
}
  span.highlight{
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.secondary}
  }
  svg{
    height:2.5em;

      path{
        fill: ${theme.colors.primary};
      }
  }
`
const Navbar = styled('nav')`
  @media (max-width: ${responsiveWidth}) {
    display:flex;
    align-items:center;
    justify-content:center;
  }
  -webkit-transform: translateZ(0);
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:80px;
  display:flex;
  align-items:center;
  padding:0 20px 0 20px;
  background:white;
  z-index:99;
  border-bottom: 2px solid ${theme.colors.light};
`
const SearchInput = styled('input')`
  all:unset;
  display:inline-block;
  height: 1.2em;
  padding:10px;
  margin-right:10%;
  background rgb(230,230,230);
  border: 3px solid rgb(230,230,230);
  border-radius:3px;
  font-size: 1.2em;
  width:40%;
  transition: .2s all;
  &:focus{
    margin-left:-10%;
    width:50%;
    border: 3px solid rgb(210,210,210);
  }
  @media (max-width: ${responsiveWidth}) {
    display:none;
  }
`
const LinksContainer = styled('div')`
@media (max-width: ${responsiveWidth}) {
    display:none;
}
// transition: visibility 2s ease-in 0s, max-height 5s ease-in .2s;

display:flex;
align-items:center;
justify-content:space-between;
width:calc(100% - 20px);
div:not(&:last-child){
  display:flex;
  align-items:center;
  flex-wrap: nowrap;
  @media (max-width: ${responsiveWidth}) {
    display:block;
  }
}
`

const Action = styled('a')`
margin:10px;
&, &:visited, &:hover{
  color: ${theme.colors.primary};
  background:initial;
}
`
const NavLink = styled(Link)`
@media (max-width: ${responsiveWidth}) {
  display:block;
}
all:unset;
cursor:pointer;
margin:20px;
color: rgb(100, 100,100);
transition: .2s all;
&:visited{
  color: rgb(100, 100,100);
}
&:hover, &.active{
  background:initial;
  color:black;
}
`
const Top = styled('div')`
@media (max-width: ${responsiveWidth}) {
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
}
`
const ActionsWrapper = styled('div')`
@media (max-width: ${responsiveWidth}) {
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
}
display:inline-block;
`
const MobileNav  = styled('nav')`
@media (max-width: ${responsiveWidth}) {
  display:grid;
}
  position:fixed;
  bottom: 0;
  border-top: 3px solid #eee;
  left:0;
  z-index:99;
  width:100vw;
  height:90px;
  background:white;
  display:none;
  grid-template-columns:repeat(5, 1fr);
  grid-column-gap:1em;
  padding:10px;
  // @media (max-width: 650px) {
  //     height:70px;
  //     padding:0 10px;
  //   }
`
const MobileNavItem = styled(Link)`
  all:unset;
  cursor:pointer;
  user-select:none;
  display:block;
  .icon-wrapper{

    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    svg{
      path{
        fill:${props => props.active ? theme.colors.primary : '#aaa'};
      }
    }
  }
  span{
    margin-top:10px;
    text-align:center;
    width:100%;
    display:block;
    color:${props => props.active ? 'black' : '#aaa'};
    font-size:.8em;
  }
`
const Banner = styled('div')`

  width:100%;

  background: ${theme.colors.secondary};
  color:white;
  z-index:90;
  .wrapper{
    height:100%;
    width:75%;
    margin:10px auto;
    display:flex;
    align-items:center;
    font-size:1.2em;
    position:relative;
  }
  svg:first-child{
    margin-right:1em;
    path{
      fill: white;
    }
  }
  .close{
    position:absolute;
    right:0;
    top: 50%;
    transform: translate(0, -50%);
    path{
      fill:rgba(255,255,255,0.7);
    }
    cursor:pointer;
  }
`
 class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      consent: false,
      siteLoading: false,
      banner: true
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.isOpen !== this.state.isOpen){
      window.dispatchEvent(new Event('resize'));
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  hideBanner = () => {
    this.setState({
      banner:false
    })
  }
  isLinkActive = (pathname) => false
  handleSearch = (e) => {
    this.props.history.replace({
      pathname: '/search',
      search: `?query=${e.target.value.trim().split(' ').join('+')}`,
      state: {
        focus: true
      }
    })
    e.nativeEvent.target.value = ""
    e.nativeEvent.target.blur()
  }
  handlePrivacyModalClose = () => {
    this.setState({
      consent: true
    })
    localStorage.consent = true;
  }
  render() {
    console.log(this.props)
    // let openPrivacyModal = this.props.location.pathname !== '/' && !localStorage.consent && !this.state.consent
    return (
      <Fragment>
      <div>
        <Navbar className="navbar">

<Top opened={this.state.isOpen}>
          <Brand to="/"  onClick={this.toggle} >
          <Logo />
          <span>Warsaw<span className="highlight">LO</span></span>


        </Brand>
  </Top>

        <LinksContainer opened={this.state.isOpen} onClick={this.toggle}>
          <div>

              <NavLink to="/search" className={this.isLinkActive('/search')}>Szukaj</NavLink>


              <NavLink to="/calculator" className={this.isLinkActive('/calculator')}>Kalkulator punktów</NavLink>
              <NavLink to="/following" className={this.isLinkActive('/following')}>Obserwowane szkoły</NavLink>
          </div>
            <div>

              <ActionsWrapper>
<Action href="http://fb.com/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></Action>
  <Action href="https://m.me/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></Action>
    <Action href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></Action>
</ActionsWrapper>
            </div>
            </LinksContainer>

        </Navbar>
      </div>
      {
        this.state.banner && (
          <Banner>
          <div className="wrapper">
          <FontAwesomeIcon icon={faExclamationTriangle} size={"2x"} />
            <span>Strona jest obecnie w fazie alpha. Niektóre funkcje mogą nie działać poprawnie.</span>
          <FontAwesomeIcon icon={faTimes} className="close" onClick={this.hideBanner} />
            </div>
          </Banner>
        )
      }
      <MobileNav to="/">
      <MobileNavItem active={this.props.location && this.props.location.pathname === '/'}>
      <div className="icon-wrapper">
        <FontAwesomeIcon icon={faInfoCircle} size="2x" />
      </div>
      <span>O nas</span>
      </MobileNavItem>

        <MobileNavItem to="/map">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/>
        </div>
        <span>Mapa</span>
        </MobileNavItem>

        <MobileNavItem search={true} to="/search">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faSearch} size="2x"/>
        </div>
        <span>Szukaj</span>
        </MobileNavItem>
        <MobileNavItem to="/calculator">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCalculator} size="2x"/>
        </div>
        <span>Kalkulator</span>
        </MobileNavItem>
        <MobileNavItem to="/contactus">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </div>
        <span>Kontakt</span>
        </MobileNavItem>
      </MobileNav>
      </Fragment>
    );
  }
}
// <NavItem>
//
// </NavItem>
// <NavItem>
//   <NavLink href="/about" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></NavLink>
// </NavItem>
// <NavItem>
//   <NavLink href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></NavLink>
// </NavItem>

// Use connect to put them together
export default AppNavbar
