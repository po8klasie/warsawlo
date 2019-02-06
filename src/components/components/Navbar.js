import React, { Component, Fragment} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faAt, faCompass } from '@fortawesome/free-solid-svg-icons'
// import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { css} from 'emotion'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import * as styleActions from '../store/actions/style'
import Logo from './Logo'
import {withRouter, Link} from 'react-router-dom'
import withBadge from '../utils/withBadge'
import PrivacyModal from './modals/Privacy'
import SiteLoader from './SiteLoader'
const responsiveWidth = '1100px'
const dataPages = [
  '/search',
  '/map'
]
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
  font-family: ${props => props.theme.fonts.tertiary};
}
  span.highlight{
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.secondary}
  }
  svg{
    height:2.5em;

      path{
        fill: ${props => props.theme.colors.primary};
      }
  }
`
const Navbar = styled('nav')`
@media (max-width: ${responsiveWidth}) {
  display:block;
}
-webkit-transform: translateZ(0);
position:fixed;
top:0;
left:0;
width:calc(100vw - 20px * 2);
display:flex;
align-items:center;
padding:0 20px 0 20px;
background:white;
z-index:99;
border-bottom: 2px solid ${props => props.theme.colors.light};
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
  display:block;
  ${props => !props.opened && `
    display:none;

    `}
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
  color: ${props => props.theme.colors.primary};
  background:initial;
}
`
const NavLink = withBadge(styled(Link)`
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
`,{
  title: 'BETA',
  color: 'secondary'
})
const MenuSwitch = styled(FontAwesomeIcon)`
path{
  fill:transparent;
  stroke: ${props => props.theme.colors.secondary};
  stroke-width:20;
}
transition: .2s all;
&:hover{
  transform: rotate(30deg);
}
  @media (max-width: ${responsiveWidth}) {
    display:block;
  }
  display:none;
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
 class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      consent: localStorage.consent,
      siteLoading: false
    }
    this.navbarEl = React.createRef()
  }
  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.isOpen !== this.state.isOpen){
      window.dispatchEvent(new Event('resize'));
    }
    let currPage = dataPages.filter(page => this.props.location.pathname.startsWith(page))
    let prevPage = dataPages.filter(page => prevProps.location.pathname.startsWith(page))
    if(!this.props.data.data){
      if((currPage && prevPage && currPage[0] != prevPage[0]) || (currPage && !prevPage)){
        if(this.props.data.fetching === false && this.props.data.error === null){
          console.log('getDATA')
          this.props.getData()
        }
        }
    }
  }
  componentDidMount = () => {
    this.props.updateNavHeight(this.navbarEl.current.querySelector('.navbar').offsetHeight)
    window.addEventListener('resize', e => this.props.updateNavHeight(this.navbarEl.current.querySelector('.navbar').offsetHeight))
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  isLinkActive = (pathname) => this.props.location.pathname == pathname ? 'active' : ''
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
    let openPrivacyModal = this.props.location.pathname !== '/' && !localStorage.consent && !this.state.consent
    return (
      <Fragment>
      <div ref={this.navbarEl}>
        <Navbar className="navbar">

<Top opened={this.state.isOpen}>
          <Brand to="/"  onClick={this.toggle} >
          <Logo />
          <span>Warsaw<span className="highlight">LO</span></span>


        </Brand>
          <MenuSwitch icon={faCompass} size="2x" onClick={this.toggle}/>
  </Top>

        <LinksContainer opened={this.state.isOpen} onClick={this.toggle}>
          <div>

              <NavLink to="/start" className={this.isLinkActive('/start')}>Start</NavLink>

              <NavLink to="/map" className={this.isLinkActive('/map')}>Mapa</NavLink>
              <NavLink to="/calculator" className={this.isLinkActive('/calculator')}>Kalkulator punktów</NavLink>
          </div>
            <div>
              {(() => {
                if(this.props.location.pathname !== '/start' && this.props.location.pathname !== '/search')
                  return  <SearchInput placeholder="Szukaj szkoły" onChange={this.handleSearch}/>
                return null
              })()}
              <ActionsWrapper>
<Action href="http://fb.com/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></Action>
  <Action href="/about" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></Action>
    <Action href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></Action>
</ActionsWrapper>
            </div>
            </LinksContainer>

        </Navbar>
      </div>

      <PrivacyModal onClose={this.handlePrivacyModalClose} open={openPrivacyModal}/>
      {(() => {
        if(this.props.data.data === null && dataPages.filter(page => this.props.location.pathname.startsWith(page))){
          console.log('getting data')
          if(this.props.data.fetching === false && this.props.data.error === null)
            this.props.getData()

          return <SiteLoader />
        }
        return null
      })()}
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

const mapDispatchToProps = (dispatch) => ({
    updateNavHeight: navHeight => dispatch(styleActions.updateNavHeight(navHeight)),
    getData: () => dispatch({ type: 'GET_DATA_REQUEST'})
}
)
const mapStateToProps = (state) => ({
  data: state.data
})
// Use connect to put them together
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppNavbar))
