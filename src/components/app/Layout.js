import React from 'react'
import theme from 'utils/theme'
import Icon from 'components/Icon'
import Brand from 'components/Brand'
import HomeIcon from '../../images/icons/home.svg'
import SearchIcon from '../../images/icons/search.svg'
import FavoriteIcon from '../../images/icons/favorite.svg'
import CalculatorIcon from '../../images/icons/calculator.svg'
import CogIcon from '../../images/icons/cog.svg'
import SignOutAltIcon from '../../images/icons/sign-out-alt.svg'
import ExternalLinkAltIcon from '../../images/icons/external-link-alt.svg'
import UserIcon from '../../images/icons/user.svg'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { getCurrentUser } from 'utils/manage/users'
import { navigate } from '@reach/router';
const Wrapper = styled.div`
    width:100%;
    min-height:100%;
    background: white;
    display: grid;
    grid-template-columns: 1fr 5fr;

`
const Menu = styled.aside`
    height:100%;
    background: white;
   
    border-right: 1px solid #ddd;
`
const Nav = styled.nav`
    margin:0;
    width:100%;
    min-width:300px;
`
const NavItem = styled(Link)`
    all:unset;
    display: flex;
    align-items: center;
    position: relative;
    margin:${props => props.marginTop ? '2em 0 0 0' : '0'};
    padding: 1em 0em 1em 3em;
    background: transparent;
    color: rgba(0,0,0,0.7);
    font-weight: ${props => props.active ? 'bold' : 'normal'};
    cursor: pointer;
    transition:.2s all;
    svg{
        margin-right:1em;
       path{
        transition:.2s all;
       }
    }
    &:hover{
        ${props => !props.active && 'background: rgba(255,255,255,0.05) !important'};
    }
    &::after{
        content:'';
        top:0;
        left:0;
        height:100%;
        width:5px;
        background: ${props => props.active ? `linear-gradient(#FF0015, ${theme.colors.primary})` : 'transparent'};
        border-radius:5px;
        position: absolute;
    }
`
const Navbar = styled.div`
    position: fixed;
    height:80px;
    width: 100%;
    top:0;
    left:0;
    display: flex;
    align-items:center;
    
`
const GoBack = styled.button`
    border:none;
    margin-left:3em;
    padding: .5em;
    // border-radius:50%;
    background: ${theme.colors.primary.replace('(', 'a(').replace(')', ',.2)')};
`
const BrandWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 1em 0;
`
const InnerWrapper = styled.div`
    width:100%;
    height:100%;
`
const AccountInfo = styled.div`
    .info{ 
     
        
        h4{
            margin:.7em 0;
            text-align:center;
            font-size:1.2em;
        }
        svg{
            
            margin:auto;
            display: block;
            
        }
    }
    
`
const Accounts = styled.div`

`
const authGuard = () => {
    getCurrentUser().catch(err => {
        navigate('/welcome')
    })
}
const gradient = [theme.colors.secondary, theme.colors.primary]
const gray = '#aaa'
export default props => {
    authGuard()
    const is = (path) => props.location.pathname === path || props.location.pathname === path+'/'
    return (
    
    <Wrapper>
     
        <Menu>
            <BrandWrapper>
        <Brand />
        </BrandWrapper>
        <AccountInfo>
            <div className="info">
            <Icon icon={UserIcon} gradient={[theme.colors.primary, theme.colors.secondary]} />
            <h4>{localStorage.currentUser}</h4>
          
            </div>
            <Accounts>

            </Accounts>
        </AccountInfo>
            <Nav>
                <NavItem
                 active={is('/dashboard')}
                 to="/dashboard">
                    <Icon icon={HomeIcon} size="1.5em" gradient={is('/dashboard') && gradient} color={gray}/>
                    Home
                </NavItem>
                <NavItem
                 active={is('/search')}
                 to="/search">
                    <Icon icon={SearchIcon} size="1.5em" gradient={is('/search') && gradient} color={gray} />
                    Szukaj
                </NavItem>
                <NavItem
                 active={is('/choice')}
                 to="/choice">
                    <Icon icon={FavoriteIcon}  size="1.5em" gradient={is('/choice') && gradient} color={gray}/>
                    Mój wybór
                </NavItem>
                <NavItem
                 active={is('/calc')}
                 to="/calc">
                    <Icon icon={CalculatorIcon}  size="1.5em" gradient={is('/calc') && gradient} color={gray}/>
                    Kalkulator punktów
                </NavItem>
                <NavItem
                marginTop
                 active={is('/settings')}
                 to="/settings">
                    <Icon icon={CogIcon}  size="1.5em" gradient={is('/settings') && gradient} color={gray} />
                    Ustawienia
                </NavItem>    
                <NavItem
                marginTop
                 to="/">
                    <Icon icon={SignOutAltIcon}  size="1.5em" color={gray} />
                    Wyloguj
                </NavItem>  
                <NavItem
                 to="https://warsawlo.pl">
                    <Icon icon={ExternalLinkAltIcon} color={gray} size="1.5em" />
                    Powrót do serwisu
                </NavItem>      
            </Nav>
        </Menu>
        <InnerWrapper>
            {props.children}
        </InnerWrapper>
    </Wrapper>
   
)
    return (
    
        <Wrapper>
         
            <Menu>
                <BrandWrapper>
            <Brand />
            </BrandWrapper>
            <AccountInfo>
                <div className="info">
                <img src="https://api.adorable.io/avatars/285/.png" />
                <h4>Jan Kowalski</h4>
              
                </div>
                <Accounts>
    
                </Accounts>
            </AccountInfo>
                <Nav>
                    <NavItem
                     active={props.location.pathname === '/'}
                     to="/">
                        <Icon icon={HomeIcon} size="1.5em" gradient={['#FF0015', theme.colors.primary]}/>
                        Home
                    </NavItem>
                    <NavItem
                     active={props.location.pathname === '/search'}
                     to="/search">
                        <Icon icon={SearchIcon} color="#aaa" size="1.5em"/>
                        Szukaj
                    </NavItem>
                    <NavItem
                     active={props.location.pathname === '/choice'}
                     to="/choice">
                        <Icon icon={FavoriteIcon} color="#aaa" size="1.5em"/>
                        Mój wybór
                    </NavItem>
                    <NavItem
                     active={props.location.pathname === '/calc'}
                     to="/calc">
                        <Icon icon={CalculatorIcon} color="#aaa" size="1.5em"/>
                        Kalkulator punktów
                    </NavItem>
                    <NavItem
                    marginTop
                     active={props.location.pathname === '/settings'}
                     to="/settings">
                        <Icon icon={CogIcon} color="#aaa" size="1.5em"/>
                        Ustawienia
                    </NavItem>    
                    <NavItem
                    marginTop
                     to="/">
                        <Icon icon={SignOutAltIcon} color="#aaa" size="1.5em" />
                        Powrót do serwisu
                    </NavItem>      
                </Nav>
            </Menu>
            <InnerWrapper>
                {props.children}
            </InnerWrapper>
        </Wrapper>
       
    )
}