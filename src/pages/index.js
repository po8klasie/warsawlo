/** @jsx jsx */
import React, { Component } from 'react'
import { jsx } from '@emotion/core'
import css from '@emotion/css'
import { Link } from 'gatsby'

import Layout from 'components/Layout'
import Image from 'components/Image'
import SEO from 'components/SEO'
import styled from '@emotion/styled'
import SiteWrapper from 'components/SiteWrapper'
import Logo from 'components/Logo'
import logo from '../../logo.svg'
import Button from '../components/Button'
import Break from '../components/Break'
import {withBadge} from 'utils/withBadge'
import { animateScroll} from 'react-scroll'
import theme from 'utils/theme'
import {
  faMapMarkerAlt,
  faChartBar,
  faBus,
  faInfoCircle,
  faFileAlt,
  faAmbulance,
  faServer,
  faUniversity,
  faChartLine,
  faMapMarkedAlt,
  faCog,
  faDesktop,
  faExclamation,
  faQuestion,
  faUsers,
  faStar
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {keyframes} from '@emotion/core'
const responsiveWidth = '1000px'
const First = styled('div')`

  display:block;
  position:relative;
  min-height: calc(100vh - 70px);
  width:100%;
  overflow:hidden;
  background:transparent;
  &:last-child{
    margin-top:60vh;
    margin-left:-10vw;
  }
  &::before{
    position:absolute;
    content: '';
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-2;
    background: ${theme.colors.primary};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 60%);
    @media (max-width: 1000px) {
      clip-path:none;
    }
  }
  &::after{
    position:absolute;
    // content: '';
    top:10%;
    right:25vh;
    width:100vh;
    height:100vh;
    z-index:-1;
    background: url(${logo});
    filter: invert(100%);
    opacity:.6;
    background-repeat:no-repeat;
    transform: rotate(30deg) scale(1.2);
    @media (max-width: ${responsiveWidth}){
      top:30%;
    }


  }
  @media (max-width: ${responsiveWidth}){
    overflow-x:hidden;
    &::before{
    transform:none;
    top:0;
  }
  &::after{
    background-position: 90% bottom;
    top:0;left:40%;
    opacity:.4;
  }
`
const Header = styled('div')`
  padding-top:10vh;
  margin-left:10vw;
  width:40vw;
  height:50vh;
  color:white;
  position:absolute;
  z-index:1;
  @media (max-width: ${responsiveWidth}){
  width:calc(100% - 4em);
  margin:0 2em;
  padding-top:2vh;
  }
  h1{
    font-size:3rem;
  }
  p{
    line-height:1.5em;
    font-size:1.1em;
    letter-spacing:2px;

  }
`
const HeaderLogo = styled(Logo)`
  position:absolute;
  top:-10%;
  right:-10%;
  width:70%;
  z-index:-1;
  overflow:hidden;
  transform: rotate(30deg);
  path{
    fill: rgba(255,255,255,0.6);
    @media (max-width: ${responsiveWidth}){
    fill: rgba(255,255,255,0.4);
    }
  }
  @media (max-width: ${responsiveWidth}){
  top:5%;
  width:100%;
  }

`
const PageWrapper = styled(SiteWrapper)`
background:transparent;
`
const LightButton = styled(Button)`
  color:${theme.colors.primary};
  margin:20px;
  border-color:white;
  font-size:1.5em;
`
const LightButtonWithBadge = withBadge(LightButton, {
  title: 'BETA',
  color: 'secondary'
})
const HalfContainer = styled('div')`
  padding:0 5% 5% 5%;
  background:transparent;
  color:black;
  width:50vw;
  p{
    line-height:1.5em;
    font-size:1.1em;
    letter-spacing:2px;

  }
  h1{
    font-size:3rem;
  }
  @media (max-width: ${responsiveWidth}){
    width:calc(100vw - 10%);
    display:block;
  }
`
const FullContainer = styled('div')`
padding: 0 5vw 0 5vw;
width:100%;
box-sizing: border-box;
background:${props => props.background ? theme.colors[props.background] : 'transparent'};
color:${props => props.background ? 'white' : 'black'};
${props => props.shape &&
  `
  @media (min-width: ${responsiveWidth}){
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
     padding-top:5%;
     padding-bottom:5%;`
  }

}
h1{
  font-size:3rem;
}
p{
  line-height:1.5em;
  font-size:1.1em;
  letter-spacing:2px;
}
@media (max-width: ${responsiveWidth}){
  display:block;
}
`
const Inline = styled('div')`
display:grid;
grid-template-columns: .2fr 1fr;
grid-column-gap:10px;
color: ${props => props.soon ? theme.colors.secondLight: 'black'};
position:relative;
h2{
  letter-spacing:2px;
  margin-left:2em;
}
`
const InlineSoon = withBadge(Inline, {
  title: 'Coming soon',
  color: 'primary'
})
const InlineWrapper = styled('div')`
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap:20px;
  grid-row-gap:3em;
  @media (max-width: ${responsiveWidth}){
    grid-template-columns: 1fr;
  }
`
const Centered = styled('div')`
  display:flex;
  align-items:${props => props.notVertical ? 'flex-start' : 'center'};
  justify-content:${props => props.notHorizontal ? 'flex-start' : 'center'};;
`
const Line = styled('div')`
background:
  /* On "top" */
  repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    ${theme.colors.primary} 10px,
    ${theme.colors.primary} 20px
  );
  width:100%;
  height:20px;
`
const spin = keyframes`
from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`
const blink = keyframes`
  0%, 100%{
    opacity:1;
  }
  10%{
    opacity: .2;
  }
`
const SourcesAnimation = styled('div')`
  width: 50%;
  @media (max-width: ${responsiveWidth}){
    width:100%;
    padding-top:2vh;
  }
  .sources{
    margin-top:10vh;
    display:flex;
    justify-content:space-around;
    animation: ${blink} 1s ease 0s infinite;
  }
  .process{
    margin:2em 0 2em 0;
    width:100%;
    display:flex;
    justify-content: center;
    transform: scale(1.2);
    svg{
      stroke-width:20;
      stroke: ${theme.colors.primary};
      path{
        fill:transparent;
      }

    }
    animation: ${spin} 5s infinite linear;
  }
  .dest{
    animation: ${blink} 1s ease 1.2s infinite;
    width:100%;
    display:flex;
    justify-content: center;
    align-items:center;
    font-weight:normal;
    svg{
      width:50%;
    }
  }


`
const Box = styled('div')`
  width:80%;

  padding:10px;

  h1{
    margin-top:0;
  }

    @media (max-width: ${responsiveWidth}){
      width:100%;
      padding:0;
    }

`
const BoxWrapper = styled('div')`
  width:50%;
  display:flex;
  justify-content:center;
  @media (max-width: ${responsiveWidth}){
    width:100%;
  }
`
const StartButton = styled(Button)`
  font-size: 3em;
  background: ${theme.colors.secondary};
  color:white;
  border-color: ${theme.colors.secondary};
  &:hover{
    background:transparent;
    color:${theme.colors.secondary};
  }
`
 export default class About extends Component{
 constructor(props){
 super(props)
 }
 scrollToContent = () => {
   animateScroll.scrollTo(window.innerHeight*0.8);
 }
 render = () => {
 return (
   <Layout location={this.props.location}>
     <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
   <PageWrapper>
     <First>
     <HeaderLogo />
     <Header>
<h1>Wiesz, że zostało mało czasu, <br/>a nie wiesz gdzie chcesz iść?</h1>
<p>Nie tylko, ty masz ten problem! Będziemy zmierzać się z tym razem w tym roku, ale
  po co utrudniać, coś, co może być prostsze!
  Możesz odwiedzić każdy licealny zakątek internetu
  albo znaleźć swoją szkołę marzeń w trzy klinknięcia!
</p>
<LightButton onClick={this.scrollToContent}>Czytaj dalej</LightButton>
<Link to='/search' css={css`all:unset;margin: 20px 0 0 0;`}>
<LightButtonWithBadge>Znajdź mi szkołę</LightButtonWithBadge>
</Link>
</Header>
</First>


     <HalfContainer css={css`
       margin-top:-20vh;
       @media (max-width: 1350px) {
         margin-top:0;
       }
       `}>
       <h1>To prostsze!</h1>
       <Break color="secondary" />
       <p>Nadal nie mówimy, że najławiejsze. <br />To twój wybór, ale cieszymy się, że możemy Ci go ułatwić.</p>
       <h2 css={css`margin: 2em 0 2em 0;`}>Filtruj na podstawie kryteriów:</h2>
       <InlineWrapper>
         <Inline>
           <Centered>
           <FontAwesomeIcon icon={faInfoCircle} size="3x" />
           </Centered>
           <Centered notHorizontal>
           <h2>Podstawowe informacje</h2>
           </Centered>
         </Inline>
       <InlineSoon>
         <Centered>
         <FontAwesomeIcon icon={faBus} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Dojazd komunikacją</h2>
              </Centered>
       </InlineSoon>

       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
         </Centered>
         <Centered notHorizontal>
         <h2>Lokalizacja</h2>
              </Centered>
       </Inline>

       <InlineSoon>
         <Centered>
         <FontAwesomeIcon icon={faFileAlt} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Zdawalność matur</h2>
              </Centered>
       </InlineSoon>
       <Inline>
         <Centered>
         <FontAwesomeIcon icon={faChartBar} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Progi punktowe</h2>
              </Centered>
       </Inline>
       <InlineSoon>
         <Centered>
         <FontAwesomeIcon icon={faStar} size="3x" />
              </Centered>
         <Centered notHorizontal>
         <h2>Oceny innych</h2>
              </Centered>
       </InlineSoon>


       </InlineWrapper>
     </HalfContainer>

     <FullContainer background="secondary" shape  css={css`
              display:flex;
              align-items:center;
              margin-top:7vh;
              background: #eee;
              color:black;
           `}>

       <SourcesAnimation>
         <div className="sources">
           <FontAwesomeIcon icon={faUniversity} size="3x"/>
           <FontAwesomeIcon icon={faMapMarkedAlt} size="3x"/>
           <FontAwesomeIcon icon={faChartLine} size="3x"/>
           <FontAwesomeIcon icon={faServer} size="3x"/>

         </div>
         <div className="process">
           <FontAwesomeIcon icon={faCog} size="3x"/>
         </div>
       <div className="dest">
         <Logo />
       </div>
       </SourcesAnimation>
       <BoxWrapper>
         <Box>

           <h1>Jak to działa?</h1>
           <Break color="primary" />
           <h2>Pobieramy dane z różnych źródeł, aby móc przedstawić Ci je w jak najlepszej postaci.</h2>
           <p>
             Korzystamy z danych Urzędu Miasta Warszawy, aby pobrać listę szkół oraz średnie liczby punktów,
             na bierząco łączymy się z wieloma serwisami lokalizacyjnymi, aby dostarczyć Ci
             informacje o
             jak najlepszym połączeniu komunikacyjnym z twoją wymarzoną szkołą.
             <br />
             A to wszystko zebrane tylko w jednym miejscu...
           </p>
           <Link to="/dev" css={css`
             color:white;
             &:visited{
               color:white;
             }
             `}>Dowiedz się o tym więcej na naszym blogu</Link>
         </Box>
       </BoxWrapper>
     </FullContainer>

     <FullContainer css={css`
              display:flex;
              align-items:center;
           `}>

           <div css={css`
             width:50%;
             @media (max-width: ${responsiveWidth}){
               width:100%;
             }
             `}>
             <h1>Nieaktualne dane?</h1>
             <Break color="secondary" />
             <h2>Nobody's perfect...</h2>
               <p css={css`width:100%`}>
               Przetwarzając ogromne ilości informacji może wkraść się do danych jakiś błąd.
               Jeżeli natkniesz się na niego, zgłoś go.
               Nasi moderatorzy zajmą się tym tak szybko, jak tylko będę mogli.
               </p>
             </div>

     <div css={css`
       width:50%;
       display:flex;
       align-items:center;
       justify-content:center;
       `}>
       <div css={css`
         @media (max-width: ${responsiveWidth}){
           display:none;
         }
         `}>
     <FontAwesomeIcon icon={faExclamation} size="10x"/>
     <FontAwesomeIcon icon={faQuestion} size="10x"/>
     </div>
     </div>

     </FullContainer>
     <FullContainer css={css`
              display:flex;
              align-items:center;
              margin-top:7vh;
           `}>
     <div css={css`
       width:50%;
       display:flex;
       align-items:center;
       justify-content:center;
       `}>
     <FontAwesomeIcon icon={faUsers} size="10x" css={css`
       @media (max-width: ${responsiveWidth}){
         display:none;
       }
       `}/>
     </div>
     <BoxWrapper>
       <Box>
       <h1>Społeczność</h1>
       <Break color="secondary" />
       <h2>Ten portal tworzy każdy z nas</h2>
         <p css={css`width:100%`}>
        Idziesz dopiero do liceum i zrobiłeś ogromny research, czy może masz już rekrutacje za sobą i wiesz jak to działa?
        Podziel się swoimi spostrzeżeniami tutaj.
        Każdego ucznia ostatniej klasy gimnazjum czy podtawówki co roku czeka to samo.
        Pomagajmy sobie nawzajem.  WarsawLO to portal tworzony przez uczniów dla uczniów.
       <br />
         <br />
         <Break color="secondary" />
          <br />

         Masz jakiś pomysł? Myślisz, że fajnie byłoby coś tutaj dodać? To świetnie!
         Napisz do nas na Messengerze albo mailem na ideas@warsawlo.pl
         </p>
       </Box>
     </BoxWrapper>
   </FullContainer>
   <FullContainer css={css`
     padding-top:2em;
     display:flex;
     align-items:center;
     justify-content:center;
     margin: 5em 0 5em 0;
     `}>

     <StartButton>Znajdź swoją szkołę już teraz</StartButton>
   </FullContainer>
   <Line/>
     <FullContainer  background="primary" css={css`padding-top:2em`}>

       <h1 css={css`margin-top:0`}>Kto za tym stoi?</h1>
       <Break color="light" />
       <h2>Hej!</h2>
         <p css={css`width:100%`}>

         Jesteśmy grupą uczniów z warszawskich gimnazjów a zarazem pasjonatów informatyki.
         Rekrutacja spotka lub spotkała każdego z nas. Wszyscy mówią, że chcą się dostać do jak najlepszej szkoły,
         ale przecież to, czy dana szkoła jest najlepsza to kwestia subiektywna.
         Chcieliśmy choć trochę uprościć ten trudny wybór szkoły średniej.
         Nasunęło się nam na myśl, że czemu nie rozwiązać tego problemu właśnie za pomocą aplikacji lub strony internetowej?
         Tak zrodziło się WarsawLO. Całkowicie pozaszkolny, niekomercyjny projekt open-source.
         Wiemy, że nasza strona jest niedoskonała, ale liczymy, że z Waszą pomocą damy radę ;)


       </p>
         <Break color="light" />
         <h2>Kontakt</h2>
          info@warsawlo.pl
         <br /><br />
     </FullContainer>
   </PageWrapper>
   </Layout>
 )
 }
 }
