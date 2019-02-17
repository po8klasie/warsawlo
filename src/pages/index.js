/** @jsx jsx */
import React, { Component } from 'react'
import { jsx } from '@emotion/core'
import css from '@emotion/css'
import { Link } from 'gatsby'
import TextLink from 'components/TextLink'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Button from '../components/Button'
import Break from '../components/Break'
import {withBadge} from 'utils/withBadge'
import { animateScroll} from 'react-scroll'
import theme from 'utils/theme'
import BusIcon from '../images/icons/bus.svg'
import CalendarIcon from '../images/icons/calendar.svg'
import FileEditIcon from '../images/icons/file-edit.svg'
import ChartBarIcon from '../images/icons/chart-bar.svg'
import InfoIcon from '../images/icons/info.svg'
import MapMarkerIcon from '../images/icons/map-marker.svg'
import DatabaseIcon from '../images/icons/database.svg'
import ChartLineIcon from '../images/icons/chart-line.svg'
import MapIcon from '../images/icons/map.svg'
import ServersIcon from '../images/icons/servers.svg'
import CommentExclamationIcon from '../images/icons/comment-exclamation.svg'
import UsersIcon from '../images/icons/users.svg'


import {keyframes} from '@emotion/core'
import Icon from 'components/Icon'
import roadImage from 'images/road.jpg'
const responsiveWidth = '1000px'


const First = styled('div')`

  display:block;
  position:relative;
  overflow:hidden;
  min-height: calc(115vh - 80px);
  width:100%;
  // &:last-child{
  //   margin-top:60vh;
  //   margin-left:-10vw;
  }
  &::before{
    position:absolute;
    content: '';
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-2;
    background: url(${roadImage});
    background-position: center center;
    background-size:cover;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
    @media (max-width: ${responsiveWidth}){
      clip-path:none;
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
  padding-top:15vh;
  margin-left:10vw;
  width:40vw;
  height:auto;
  color:white;
  @media (max-width: ${responsiveWidth}){
  width:calc(100% - 4em);
  margin:0 2em;
  padding-top:2vh;
  }
  h1{
    font-size:5rem;
  }
  p{
    line-height:1.5em;
    font-size:1.1em;
    letter-spacing:2px;

  }
`

const LightButton = styled(Button)`
  color: rgb(230,230,230);
  margin:20px;
  border-color:white;
  font-size:1.5em;
  background: rgba(0,0,0,0.3);
`
const LightButtonWithBadge = styled(withBadge(LightButton, {
  title: 'BETA',
  color: 'secondary'
}))`
  background:${theme.colors.primary};
  border-color:${theme.colors.primary};
`
const Shadow = styled('div')`
  background: #eee;
  border-radius: 5px;
  padding:10px;
`
const FullContainer = styled('div')`
// display: grid;
// grid-template-columns: 1fr 1fr;
padding: 1em 5vh;
width:100%;
box-sizing: border-box;
background:${props => props.background ? theme.colors[props.background] : 'transparent'};
color:${props => props.background ? 'white' : 'black'};
${props => props.shape &&
  `
  @media (min-width: ${responsiveWidth}){
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0% 100%);
     padding-top:5%;
     padding-bottom:10%;`
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
  margin: 0 0 0 2em;
  
}
`

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
    transform: scale(1);
  }
  70%{
    transform: scale(1);
  }
  80%{
    transform: scale(1.1);
  }
  
`
const slideAndFade = (x) => keyframes`
  0%{
    transform: translateY(0) translateX(0);
    opacity:1;
  }
  
  15%{
    transform: translateY(50%) translateX(${x}%);
    opacity:1;
  }
  25%{
    opacity:0;
    transform: translateY(50%) translateX(${x}%);
  }
  36%{
    opacity:0;
    transform: translateY(0) translateX(0);
  }
  100%{
    opacity:0;
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
    svg{
      opacity: 0;
    }
    #max-left{
      animation: ${slideAndFade(70)} 12s ease 0s infinite;
    }
    #left{
      animation: ${slideAndFade(40)} 12s ease 3s infinite;
    }
    #right{
      animation: ${slideAndFade(-40)} 12s ease 6s infinite;
    }
    #max-right{
      animation: ${slideAndFade(-70)} 12s ease 9s infinite;
    }
    
  }
  .dest{
    animation: ${blink} 3s ease 0s infinite;
    width:100%;
    display:flex;
    justify-content: center;
    align-items:center;
    font-weight:normal;
    svg{
      width:50%;
      fill: white;
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
 
  @media (max-width: ${responsiveWidth}){
    width:100%;
  }
`
const StartButton = styled(Button)`
  font-size: 3em;
  border: none;
  color:white;
  color: white;
  font-weight:700;
  background: ${theme.colors.primary};
 
  transition: transform .2s;
  &:hover{
    transform: scale(1.1);
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
     <SEO title="Home" keywords={[`WarsawLO`, `licea`, `wyszukiwarka`]} />
     <First>
   
     <Header>
<h1>Wybierz swoją drogę z nami!</h1>
<p>Nie wiesz jakie szkoły wybrać? Rekrutacja do szkół średnich to poważny krok. W tym roku jednak będzie to znacznie prostszy.
  Możesz odwiedzić każdy licealny zakątek w Internecie
  albo znaleźć swoją szkołę marzeń za trzecim kliknięciem!
</p>
<LightButton onClick={this.scrollToContent}>Czytaj dalej</LightButton>
<Link to='/search' css={css`all:unset;margin: 20px 0 0 0;`}>
<LightButtonWithBadge>Znajdź mi szkołę</LightButtonWithBadge>
</Link>
</Header>
</First>


     <FullContainer>
       <h1>To prostsze!</h1>
       <Break color="secondary" />
       <p>Nadal nie mówimy, że najławiejsze. <br />To twój wybór, ale cieszymy się, że możemy Ci go ułatwić.</p>
       <h2 css={css`margin: 2em 0 2em 0;`}>Dzięki nam szybko sprawdzisz:</h2>
       <InlineWrapper>
         {
           [
             {
               icon: InfoIcon,
               title: 'Podstawowe informacje'
             },
             {
              icon: BusIcon,
              title: 'Dojazd komunikacjąe'
            },
            {
              icon: MapMarkerIcon,
              title: 'Lokalizacje'
            },
            {
              icon: FileEditIcon,
              title: 'Zdawalność matur'
            },
            {
              icon: ChartBarIcon,
              title: 'Średnie ilości punktów'
            },
            {
              icon: CalendarIcon,
              title: 'Dni otwarte'
            }
           ].map(feature => (
            <Inline>
            <Centered>
            <Icon color="primary" icon={feature.icon} />
                 </Centered>
            <Centered notHorizontal>
            <h2>{feature.title}</h2>
                 </Centered>
          </Inline>
           ))
         }
       </InlineWrapper>
     </FullContainer>


     <FullContainer background="secondary" shape={true}  css={css`
              display:flex;
              align-items:center;
              margin-top:7vh;

              background: ${theme.colors.primary};
              color:white;
           `}>

       <SourcesAnimation>
         <div className="sources">
          <Icon id="max-left" color="secondary" size="4em" icon={DatabaseIcon} />
          <Icon id="left" color="secondary" size="4em" icon={MapIcon} />
          <Icon id="right" color="secondary" size="4em" icon={ChartLineIcon} />
          <Icon id="max-right" color="secondary" size="4em" icon={ServersIcon} />

         </div>
     
       <div className="dest">
         <Logo />
       </div>
       </SourcesAnimation>
       <BoxWrapper css={css`width:50%;`}>
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
           <TextLink to="/about-data">Dowiedz się o tym więcej</TextLink>
         </Box>
       </BoxWrapper>
     </FullContainer>

     <FullContainer css={css`
              display:flex;
              align-items:center;
           `}>

         
             <Shadow css={css`
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
               </Shadow>

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
     <Icon icon={CommentExclamationIcon} size="10em"/>
   
     </div>
     </div>

     </FullContainer>
     <FullContainer css={css`
              display:grid;
              grid-template-columns: 1fr 1fr;
              margin-top:7vh;
           `}>
     <div css={css`
       width:50%;
       display:flex;
       align-items:center;
       justify-content:center;
       `}>
      <Icon icon={UsersIcon} size="10em"/>
     </div>
     <BoxWrapper>
       <Shadow>
       <Box>
       <h1>Społeczność</h1>
       <Break color="secondary" />
       <h2>Ten portal tworzy każdy z nas</h2>
         <p css={css`width:100%`}>
        Idziesz dopiero do liceum i robisz ogromny research, czy może masz już rekrutację za sobą i wiesz jak to działa?
        Podziel się swoimi spostrzeżeniami tutaj.
        Każdego ucznia ostatniej klasy gimnazjum czy podstawówki co roku czeka to samo.
        Pomagajmy sobie nawzajem.  WarsawLO to portal tworzony przez uczniów dla uczniów.
       </p>
       </Box>
       </Shadow>
       <Shadow css={css`margin-top:2em;`}>
         <p>
         Masz jakiś pomysł? Myślisz, że fajnie byłoby coś tutaj dodać? To świetnie!
         Napisz do nas na Messengerze albo mailem na ideas@warsawlo.pl

         <TextLink to="/help-us">Dowiedz się, jak możesz nam pomóc</TextLink>
         </p>
       </Shadow>
     </BoxWrapper>
   </FullContainer>
   <FullContainer css={css`
     display:flex;
     align-items:center;
     justify-content:center;
     margin: 1em 0;
     `}>
       <Link to="/search" css={css`all:unset;`}>
     <StartButton>Znajdź swoją szkołę już teraz</StartButton>
     </Link>
   </FullContainer>
   <Line/>
     <FullContainer  css={css`padding-top:2em`}>
  <div css={css`width:50%;margin:auto;`} >
       <h1 css={css`margin-top:0`}>Kto za tym stoi?</h1>
       <Break color="primary" />
       <h2>Hej!</h2>
         <p>

         Jesteśmy grupą uczniów z warszawskich gimnazjów a zarazem pasjonatów informatyki.
         Rekrutacja spotka lub spotkała każdego z nas. Wszyscy mówią, że chcą się dostać do jak najlepszej szkoły,
         ale przecież to, czy dana szkoła jest najlepsza to kwestia subiektywna.
         Chcieliśmy choć trochę uprościć ten trudny wybór szkoły średniej.
         Nasunęło się nam na myśl, że czemu nie rozwiązać tego problemu właśnie za pomocą aplikacji lub strony internetowej?
         Tak zrodziło się WarsawLO. Całkowicie pozaszkolny, niekomercyjny projekt open-source.
         Wiemy, że nasza strona jest niedoskonała, ale liczymy, że z Waszą pomocą damy radę ;)


       </p>
         <Break color="primary" />
         <h2>Kontakt</h2>
          <p>info@warsawlo.pl</p>
      
         </div>
     </FullContainer>

   </Layout>
 )
 }
 }
