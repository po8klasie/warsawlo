/** @jsx jsx */
import React, { Component } from 'react'
import Layout from 'components/Layout'
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'
import { graphql, Link } from 'gatsby'
import LOPlaceholder from 'components/LOPlaceholder'
import Scrollspy from 'react-scrollspy'
import DocumentEvents from 'react-document-events'
import SEO from 'components/SEO'
import { faPhone, faGlobe, faAt, faFax, faMapMarkerAlt, faRoad, faCity, faUsers, faSchool, faHandshake, faMoneyBill, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AwardIcon from '../images/icons/award.svg'
import GlobeIcon from '../images/icons/globe.svg'
import PrintIcon from '../images/icons/print.svg'
import GraduationHatIcon from '../images/icons/graduation-hat.svg'
import Icon from 'components/Icon'
import Tag from 'components/Tag'
import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom'
import theme from 'utils/theme'
import TextLink from 'components/TextLink'
import subjects from 'utils/subjects'
const responsiveWidth = '1500px'
const Header = styled('header')`
  width: 100%;
  min-height:50vh;
  overflow: hidden;
  background: ${props => props.bg ? 'rgba(0,0,0,.6)' : theme.colors.secondary};
  position:relative;
  padding: 3em 0;
  color:white;
  h1{
    font-weight:700;
    font-family: 'Playfair Display';
    @media (max-width: ${responsiveWidth}) {
      font-size:1.4em;
    }
  }
  .name h2{
    @media (max-width: ${responsiveWidth}) {
     font-size:1.2em;
    }
  }
  .thresholds{
    @media (max-width: ${responsiveWidth}) {
      display: none;
     }
  }
  .bg{
    position: absolute;
    top:0;
    left:0;
    width:calc(100% + 40px);
    height:calc(100% + 20px);
    filter: blur(10px);
    z-index:-1;
    margin: -20px -20px 0 0;
  }

  display:flex;
    align-items:center;
    justify-content: center;


    & > div{
      display: block;
      width:75%;
      .top-info{
        display:grid;
        grid-template-columns: 1fr 4fr;
        grid-column-gap: 1em;
        margin-bottom:2em;
        @media (max-width: ${responsiveWidth}) {
          grid-template-columns:1fr;
        }
      }
      
      .ranking{
        margin:1em 0;
        display: flex;
        align-items:center;
        @media (max-width: ${responsiveWidth}) {
         margin:0;
        
        }

        h2{
          padding: 0;
          margin: 0 1em 0 0;
          @media (max-width: ${responsiveWidth}) {
            font-size:1.2em;
          }
        }
      }
      
     
  
    }

`
const SchoolWrapper = styled('div')`
  width:100%;
  margin:calc(70px + 2em) auto auto auto;
  @media (max-width: ${responsiveWidth}) {
    width: calc(100% - 2em);
    margin: 1em auto auto auto;
  }
  @media print {
    width:100%;
    margin:0;
  }
`
const Main = styled('div')`
  width:75%;
  margin:auto;
  @media (max-width: ${responsiveWidth}) {
    width: calc(100% - 2em);
  }
`
const LinksWrapper = styled('div')`
display: none;
  height:100%;
  @media (max-width: ${responsiveWidth}) {
    display: none;
  }
`
const Links = styled(Scrollspy)`
  position: fixed;
  top: 25vh;
  left:5em;
  max-width: 20%;
  margin:0;
  font-size:1.2em;
  li{
    display: block;
    border-left: 3px solid ${theme.colors.primary};
    padding: 10px 1em 10px 10px;
    margin:0;
    transition:.2s all;
    border-top-right-radius:3px;
    border-bottom-right-radius:3px;
    &.is-current{
      background:${theme.colors.primary};
      color:white;
    }
    a{
      all:unset;
      cursor:pointer;
    }
  }
`

const FixedHeader = styled('header')`
@media (max-width: ${responsiveWidth}) {
  display:none;
}
  position: fixed;
  background:${theme.colors.secondary};
  top:${props => props.active ? '70px' : '-100%'};
  left:0;
  width:100%;
  padding: 0;
  z-index:20;
color:white;
  transition:.4s all;
  .container{
    width:75%;
    margin:auto;
    height:100%;
  }
  .top{
    height:10vh;
    margin: 1em 0;
    display:grid;
    grid-template-columns:1fr 5fr;

    img{
      max-height:100%;
    }
    h2{
      margin:0;
      display:flex;
      align-items:center;
    }
  }
`
const InfoGrid = styled('div')`
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  grid-column-gap:3em;
  @media (max-width: ${responsiveWidth}) {
    grid-template-columns:1fr;
  }
  @media print { 
    grid-template-columns:repeat(2, 1fr);
   }
`
const InfoBox = styled('div')`
  border: 3px solid #eee;
  @media (max-width: ${responsiveWidth}) {
    margin: .5em 0;
  }
  .icon-wrapper{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .info-wrapper{
    text-align:center;
  }
  .icon-wrapper, h3{
    background: #eee;
  }
  h3, h4{
    margin:0;
  }
  h4{
    min-height:3em;
    display:flex;
    align-items:center;
    justify-content:center;
  }


`
const Section = styled('section')`
  margin-top:2em;
  #ranking{
    td{
      text-align:center;
    }
  }
`
const BarTag = styled(Tag)`
  background:white;
`
const ForeignObject = styled('foreignObject')`
position:relative;
z-index:5;
margin-left:3em;
`
const BarTagsWrapper = styled('div')`
position: absolute;               /* 2 */
 top: 50%;                         /* 3 */
 transform: translate(0, -50%);
 z-index:2;
`
const Tick = props => {
  console.log(props)
  // return props.payload.value
  return (<ForeignObject x={props.x+10} y={props.y-props.payload.offset} width={500} height={props.payload.offset*2}>
    <BarTagsWrapper>
    {
      props.payload.value.split('-').map(sub => {
        let subject = subjects.filter(s => s.short === sub)
        return (
          <BarTag
          key={sub}
          active
          color={subject[0] ? subject[0].color : false}
          >{sub}</BarTag>
        )
      })
    }
    </BarTagsWrapper>
    </ForeignObject>)
}
const CustomShape =  (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={`
    M ${x+width}, ${y}
    L ${x+width}, ${y+height}
    z
  `} stroke="none" fill={fill} />;
}
const MoovitWrapper = styled('div')`
  width:100%;
  height:80vh;
  iframe{
    border:none;
    outline:none;
    margin-bottom:0;
  }
  @media print {
    display: none;
  }
`
const ContactGrid = styled('div')`
  display:flex;
  justify-content:space-between;
  min-height:20vh;
  @media (max-width: ${responsiveWidth}) {
    display:block;
  }
  .left{
    width:${props => props.full ? '0' : 'calc(50% - 1em)'};
    visibility:${props => props.full ? 'hidden' : 'visible'};
    transition.3s all;
    @media (max-width: ${responsiveWidth}) {
      width:100%;
    }
    @media print {
      width:50%;
    }

  }
  .right{
    width:${props => props.full ? '100%' : 'calc(50% - 1em)'};
    transition.3s all;
    @media (max-width: ${responsiveWidth}) {
      width:100%;
      height:30vh;
    }
    @media print {
      width:50%;
    }
  }
`
const ContactBox = styled('div')`
display:flex;
  border: 3px solid #eee;
  margin: 1em 0;
  .icon-wrapper{
    background: #eee;
    padding:10px;
    height:100%;
    display:flex;
    align-items:Center;
    justify-content:center;
  }
  .info{
    width:100%;
    padding:10px;
    display:flex;
    align-items:Center;
    justify-content:center;
  }
`
const MapWrapper = styled('div')`
height:100%;`
const MarkerWrapper = styled('div')`
background:white;
padding:5px;
border-radius:5px;
  }
`
const Anchor = styled('a')`
  display: block;
 position: relative;
 top: -${props => props.offset}px;
 visibility: hidden;
 @media (max-width: ${responsiveWidth}) {
   top:-80px;
 }
`
const RankingTableWrapper = styled('div')`
overflow-x:auto;
`
mapboxgl.accessToken = 'pk.eyJ1IjoibWljb3JpeCIsImEiOiJjanJ0cjN2Y2IwcjZiM3ltaWw4a2EwMzNlIn0.9aYkpqbDoPBGO3hTuIvdvw'

const monthMapping = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia'
]
const padWithZero = (num) => `${num}`.length === 1 ? `0${num}`: `${num}`
const displayHour = (date) => `${date.getHours()}:${padWithZero(date.getMinutes())}`

const labels = {
  gold: '#f1c40f',
  silver: '#95a5a6',
  bronze: '#CD7F23'
}
export default class extends Component{
  constructor(props){
    super(props)
    console.log(props)
    this.headerEl = React.createRef()
    this.state = {
      fixedHeader: false,
      mouse: 'out',
      headerHeight: 0
    }
    this.mapContainer = React.createRef()
    this.fixedHeaderEl = React.createRef()
  }
  componentWillUnmount() {
    this.map.remove();
  }
  componentDidMount = () => {
    let { location } = this.props.data.school
    if(location && location.position){
      this.map = new mapboxgl.Map({
       container: this.mapContainer.current,
       style: 'mapbox://styles/mapbox/streets-v9',
       center: [location.position.Longitude, location.position.Latitude],
       zoom: 13
     })
     let el = document.createElement('div')
     el.className = 'marker';
     el.style = 'display:inline-block;'
     ReactDOM.render((
       <MarkerWrapper>
        <Icon icon={GraduationHatIcon} color="rgb(89, 0, 138)" />
       </MarkerWrapper>
     ), el)
     this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')
     this.map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}))
     this.map.on('mousemove', this.handleMouseStart)
    this.map.on('mouseout', this.handleMouseOut)
     new mapboxgl.Marker(el)
     .setLngLat([location.position.Longitude, location.position.Latitude])
     .addTo(this.map)
     console.log(this.fixedHeaderEl.current.clientHeight)
     this.setState({
       headerHeight: this.fixedHeaderEl.current.clientHeight
     })
    }

    (function(d, s, id) {
      // if(!document.querySelector('#moovit-jsw')){
        let js, fjs = d.getElementsByTagName(s)[0];
        js = d.createElement(s); js.id = id;
        js.src = "https://widgets.moovit.com/wtp/pl";
        fjs.parentNode.insertBefore(js, fjs);
      // }

      return null
      })(document, 'script', 'moovit-jsw')
  }
  onScroll = (e) => {
    const rect = this.headerEl.current.getBoundingClientRect()
    let fixedHeader = rect.top+rect.height <= 70
    if(fixedHeader != this.state.fixedHeader){
      this.setState({
        fixedHeader
      })
    }

  }
  handleMouseStart = () => {
    if(window && window.innerWidth <= responsiveWidth){
      return
    }
    console.log('x')
    this.setState({
      mouse: 'over'
    }, () => {
      window.dispatchEvent(new Event('resize'))
      console.log('x')
    })
  }
  handleMouseOut = () => {
    this.setState({
      mouse: 'out'
    }, () => window.dispatchEvent(new Event('resize')))

  }
  render = () => {
    const { school } = this.props.data
    return (
      <>
      <SEO title={school.name.full} keywords={[`Liceum`, `LO`, school.name.full]} />
      <DocumentEvents onScroll={this.onScroll} />
      <Layout>
      <div ref={this.headerEl}>
      <Header bg={school.media && school.media[0]}>
        {
          school.media && school.media[0] && <img src={school.media[0]} className="bg" />
        }
      <div>
      <div className="top-info">
      { school.media && school.media[0] ? <img src={school.media[0]} width="400"/> : <LOPlaceholder /> }
      <div>
        <div className="ranking">
      { school.ranking && <h2> {school.ranking.place}. miejsce w Warszawie</h2> }
      { school.ranking && school.ranking.label && <Icon icon={AwardIcon} color={labels[school.ranking.label]}/>}
      </div>
      <div className="thresholds">
        {
           school.thresholds && school.thresholds._2018.overview.availableSubjects.map(sub => {
            let subject = subjects.filter(s => sub === s.short)[0]
            return <Tag light color={subject && subject.color}>{subject ? subject.full : sub}</Tag>
          })
        }
      </div>
      </div>
      </div>
      <div className="name">
        <h1>{school.name.full}</h1>
          <h2 >{school.location && school.location.address.District}</h2>
          </div>
          
      </div>
      </Header>
      
  </div>
        <Main>
          <LinksWrapper>
          <Links items={ ['info', 'ranking', 'thresholds', 'open-days', 'contact', 'location', 'opinion', 'data-sources'] } currentClassName="is-current" offset={(this.state.headerHeight+80)}>
  <li><a href="#info">Informacje</a></li>
  <li><a href="#ranking">Rankingi</a></li>
  <li><a href="#thresholds">Punkty</a></li>
  <li><a href="#open-days">Dni otwarte</a></li>
  <li><a href="#contact">Kontakt</a></li>

  <li><a href="#location">Dojazd</a></li>
  <li><a href="#opinion">Opinie</a></li>
  <li><a href="#data-sources">Źródła danych</a></li>
  </Links>
          </LinksWrapper>
      <SchoolWrapper>


          <FixedHeader active={this.state.fixedHeader} ref={this.fixedHeaderEl}>
          <div className="container">
          <div className="top">
          { school.media && school.media[0] ? <img src={school.media[0]} /> : <LOPlaceholder /> }
          <h2 >{school.name.full}</h2>
          </div>
         
          </div>


          </FixedHeader>

     
  
  <Anchor id="ranking" offset={this.state.headerHeight+80} />
  <Section>
    <h2>Wyniki w rankingu</h2>
      {!school.ranking && (
        <p>Brak danych</p>
      )}
      {school.ranking && (
        <>
        {school.ranking.label && <p>To liceum posiada {school.ranking.label === 'gold' ? 'złoty' : (school.ranking.label === 'silver' ? 'srebrny' : 'brązowy')} znak jakości.</p>}
        <RankingTableWrapper>
          <table>
          <thead>
          <tr>
            <th>Miejsce</th>
            <th>2018</th>
            <th>2017</th>
            <th>2016</th>
            <th>Matura podstawa</th>
            <th>Matura rozszerzenie</th>
            
          </tr>
          </thead>
          <tbody>
          <tr>
            
            <td>{school.ranking.place}</td>
            <td>{school.ranking.archive['_2018']}</td>
            <td>{school.ranking.archive['_2017']}</td>
            <td>{school.ranking.archive['_2016']}</td>
            <td>{school.ranking.exam.basic}</td>
            <td>{school.ranking.exam.extended}</td>
            
          </tr>
          </tbody>
          </table>
          </RankingTableWrapper>
          
          </>
      )}
      <TextLink wrapper="a" href="http://licea.perspektywy.pl/2019/ranking/ranking-liceow-warszawskich-2019">
        Ranking liceów warszawskich - perspektywy.pl
      </TextLink>
  </Section>
  <Anchor  id="thresholds" offset={this.state.headerHeight+80}/>
  <Section>
  <h2>Średnie ilości punktów</h2>
  <h3>2018/2019</h3>
  { !school.thresholds ? <span>Brak danych</span> : (
     <ResponsiveContainer width="100%" height={500} >
    <BarChart height={500} data={school.thresholds._2018.detailed}

              layout="vertical"
              >
         <YAxis dataKey={t => t.extensions.join('-')} type="category" tick={<Tick />} tickLine={false}/>
         <XAxis type="number" unit="pkt" domain={[0, 200]}/>
        
         <Bar dataKey='threshold' fill="rgba(89, 0, 138, .2)" name="Próg punktowy" />
        </BarChart>
          </ResponsiveContainer>

  )}
  </Section>
  <Anchor id="open-days" offset={this.state.headerHeight+80} />
  <Section >
  <h2>Dni otwarte</h2>
    {!school.openDays ? <p>Brak danych</p> :
      (
        <table>

        {school.openDays.map(day => {
          let start = new Date(day.date.start)
          let end = day.date.end ? new Date(day.date.end) : null
          return (
            <tr>
            <td>
              <FontAwesomeIcon icon={faCalendar} /> {start.getDate()} {monthMapping[start.getMonth()]}
            </td>
            <td>
              <FontAwesomeIcon icon={faClock} /> { end && 'od'} {displayHour(start)} { end && `do ${displayHour(end)}`}
            </td>
            <td>
              { day.for }
            </td>
            </tr>
          )
        })}
        </table>
      ) }
  </Section>
    <Anchor id="contact" offset={this.state.headerHeight+80} />
  <Section>
    <h2>Kontakt</h2>
    <address>
    {school.location.address.Label}
    </address>
    <ContactGrid full={this.state.mouse === 'over'}>
    <div class="left">
    {
      school.contact.phone && (
        <ContactBox>
        <div className="icon-wrapper">
        <FontAwesomeIcon icon={faPhone} size="2x"  />
        </div>
        <div className="info">
          {school.contact.phone}
          </div>
        </ContactBox>
      )
    }
    {
      school.contact.fax && (
        <ContactBox>
        <div className="icon-wrapper">
        <FontAwesomeIcon icon={faFax} size="2x" />
        </div>
        <div className="info">
          {school.contact.fax}
          </div>
        </ContactBox>
      )
    }
    {
      school.contact.email && (
        <ContactBox>
        <div className="icon-wrapper">
        <FontAwesomeIcon icon={faAt} size="2x"  />
        </div>
        <div className="info">
          {school.contact.email}
          </div>
        </ContactBox>
      )
    }
    {
      school.contact.website && (
        <ContactBox>
        <div className="icon-wrapper">
        <FontAwesomeIcon icon={faGlobe}  size="2x" />
        </div>
        <div className="info">
          {school.contact.website}
          </div>
        </ContactBox>
      )
    }
    </div>
    <div class="right">
      <MapWrapper ref={this.mapContainer} />


    </div>

    </ContactGrid>
  </Section>
    <Anchor id="location" offset={this.state.headerHeight+80} />
  <Section>
  <h2>Dojazd komunikacją</h2>

  <MoovitWrapper className="mv-wtp"
     data-metro="1062"
     data-to-lat-long={[school.location.position.Latitude, school.location.position.Longitude].join('_')}
     data-lang="pl" />

  </Section>
  <Anchor id="opinion" offset={this.state.headerHeight+80} />
  <Section>
  <h2>Opinie</h2>
    <p>Sprawdź <TextLink wrapper="a" href="https://www.facebook.com/groups/idziemygdzie">grupę idziemygdzie na Facebooku</TextLink></p>
  
  </Section>
  <Anchor id="info" offset={this.state.headerHeight+80} />
  <Section>
    <h2>Informacje o szkole</h2>

      <InfoGrid>
      <InfoBox>
      <div className="icon-wrapper">
      <FontAwesomeIcon size="2x" icon={faUsers} />
      </div>
      <div className="info-wrapper">
      <h3>Publiczna</h3>
      <h4>TAK</h4>
      </div>
      </InfoBox>
      <InfoBox>
      <div className="icon-wrapper">
      <FontAwesomeIcon size="2x" icon={faSchool} />
      </div>
      <div className="info-wrapper">
      <h3>Organ prowadzący</h3>
      <h4>{school.meta.leadingOrgan.type} {school.meta.leadingOrgan.name}</h4>
      </div>
      </InfoBox>
      <InfoBox>
      <div className="icon-wrapper">
      <FontAwesomeIcon size="2x" icon={faHandshake} />
      </div>
      <div className="info-wrapper">
      <h3>Organizacja</h3>
      <h4>{school.meta.parent}</h4>
      </div>
      </InfoBox>
      <InfoBox>
      <div className="icon-wrapper">
      <FontAwesomeIcon size="2x" icon={faMoneyBill} />
      </div>
      <div className="info-wrapper">
      <h3>Właściciel kapitału</h3>
      <h4>{school.meta.capitalOwner}</h4>
      </div>
      </InfoBox>

      </InfoGrid>
  </Section>
    <Anchor id="data-sources" offset={this.state.headerHeight+80} />
  <Section>
  <h2>Źródła danych</h2>
    {school.media && <p>Źródło zdjęcia: {
      (() => {
        if(typeof window !== 'undefined' && new URL(school.media[0]).hostname.includes('wikimedia.org')){
          let url = school.media[0].split('/')
          console.log('url', `https://commons.wikimedia.org/wiki/File:${url[url.length-2]}`)
          return `https://commons.wikimedia.org/wiki/File:${url[url.length-2]}`
        }else{
          return school.media[0]
        }
      })()
    }</p>}
  <TextLink to="/about-data">Przeczytaj skąd zebraliśmy dane, które Ci prezentujemy</TextLink>
  </Section>

 
      </SchoolWrapper>
      </Main>
      </Layout>
      </>
    )
  }
}
export const pageQuery = graphql`
  query($id: String!){
    school(id: {eq: $id}) {
      name {
        full
        short
      },
      media,
      contact{
        email,
        phone,
        fax,
        website
      },
      location{
        position{
          Latitude,
          Longitude
        },
        address{
          Label,
          District
        }
      }
      meta{
        capitalOwner,
        parent,
        leadingOrgan{
          type,
          name
        }
      }
      thresholds{
        _2018{
          detailed{
            extensions,
            threshold
          },
          overview{
            availableSubjects
          }
        }
      },
      ranking{
        archive{
          _2018,
          _2017,
          _2016
        },
        exam{
          basic,
          extended
        },
        label,
        place
      },
      openDays{
        date{
          start,
          end
        },
        for
      }
    }
  }
`
