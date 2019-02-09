import React from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'
import Logo from 'components/Logo'
import micorixLogo from 'images/micorix-logo.png'
import {Link} from 'gatsby'
const responsiveWidth = '1100px'
const FooterWrapper = styled('footer')`
  width:100%;
  background: ${theme.colors.secondary};
  margin-top:${props => props.location && props.location.pathname === '/' ? '0' : '5em'};
  display: ${props => props.location && props.location.pathname === '/search' ? 'none' : 'block'};
  .container{
    width:75%;
    margin:auto;
    padding-top:1em;
    @media (max-width: ${responsiveWidth}) {
      padding-bottom:100px;
    }
    .grid{
      display:grid;
      grid-template-columns:3fr 1fr;
      @media (max-width: ${responsiveWidth}) {
        grid-template-columns: 1fr;
      }
    }
    .inner-grid{
      display:grid;
      grid-template-columns:repeat(3, 1fr);
      @media (max-width: ${responsiveWidth}) {
        grid-template-columns: 1fr;
      }
    }
    .data-info{
      color:rgba(255,255,255,0.5);
      text-align:center;
    }
    ul{
      margin:0;
      @media (max-width: ${responsiveWidth}) {
        margin: 1em 0;
      }
      li{
        display:block;
        @media (max-width: ${responsiveWidth}) {
          text-align:center;
        }
        a{
          all:unset;
          cursor:pointer;
          color:rgba(255,255,255,0.8);
          // text-decoration:underline;
        }
      }
    }
  }
`
const Brand = styled(Link)`
&, &:visited, &:hover{
  background:initial;
}
all:unset;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
font-size: 2em;
color:black !important;
div{
  display:flex;
  align-items:center;
}
span:not(.highlight){
  font-family: ${theme.fonts.tertiary};
  color:white;
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
const DeveloperLogo = styled('a')`

all:unset;
cursor:pointer;

  img{
    width:5em;
    height:5em;
    margin:0;
    margin-bottom:1em;
  }
  span{
    text-align:center;
    margin:0.5em 0;
    display:block;
    color:rgba(255,255,255,0.9);
  }
  div{
    display:flex;
    justify-content:center;
  }

`
export default props => (
  <FooterWrapper location={props.location}>

<div className="container">

  <div className="grid">
  <div>
  <p className="data-info">Dokładamy wszelkich starań, aby dane były aktualne, ale nie ponosimy odpwiedzialności za ich prawidłowość.</p>
  <div className="inner-grid">
  <div>
  <ul>
    <li><Link to="/">Strona główna</Link></li>
    <li><Link to="/search">Wyszukiwarka szkół</Link></li>
    <li><Link to="/calculator">Kalkulator punktów</Link></li>
  </ul>
  </div>
  <div>
  <ul>
    <li><Link to="/about-data">O naszych danych</Link></li>
    <li><Link to="/help-us">Pomóż nam!</Link></li>
    <li><Link to="/for-developers">Dla developerów / API</Link></li>
  </ul>
  </div>
  <div>
  <ul>
    <li><Link to="/privacy">Polityka prywatności</Link></li>
    <li><Link to="/privacy/settings">Ustawienia prywatności</Link></li>
  </ul>
  </div>
  </div>
    </div>
  <div>
  <Brand to="/">
  <div>
  <Logo />
  <span>Warsaw<span className="highlight">LO</span></span>
  </div>
  </Brand>
  <DeveloperLogo href="https://micorix.com" target="_blank" rel="noopener noreferrer">
  <span>Projekt i realizacja strony</span>
  <div>
    <img src={micorixLogo} />
    </div>

  </DeveloperLogo>
  </div>
  </div>
  </div>
  </FooterWrapper>
)
