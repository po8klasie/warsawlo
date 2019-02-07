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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import subjects from 'utils/subjectsMapping'
import Tag from 'components/Tag'
import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom'
// import MoovitEmbed from 'components/MoovitEmbed'
const Header = styled('header')`
  width: 100%;
  max-height:40vh;
  display:grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap:10px;

  div{
    display:flex;
    align-items:center;
    h1{
      border: 3px solid #eee;
      padding:.5em;
      border-radius: 5px;

    }
  }
`
const Wrapper = styled('div')`
  width:75%;
  margin:calc(70px + 2em) auto auto auto;
`
const TabLinksWrapper = styled(Scrollspy)`
width:100%;
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  grid-column-gap:5em;
  margin:0;
  li{
    display:flex;
    align-items:center;
    justify-content:center;
    border-bottom: 3px solid #eee;
    &.is-current{
      border-bottom-color: ${({theme}) => theme.colors.primary};
    }
    a{
      all:unset;
      cursor:pointer;
    }
  }
`
const FixedHeader = styled('header')`
  position: fixed;
  background:white;
  top:${props => props.active ? '70px' : '-100%'};
  left:0;
  width:100%;
  padding: 0;
  z-index:20;

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
`
const InfoBox = styled('div')`
  border: 3px solid #eee;
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
`
const TabLinks = props => (
  <TabLinksWrapper items={ ['basic-info', 'contact', 'thresholds', 'location'] } currentClassName="is-current">
  <li><a href="#info">Informacje</a></li>
  <li><a href="#contact">Kontakt</a></li>
  <li><a href="#thresholds">Progi punktowe</a></li>
  <li><a href="#location">Dojazd</a></li>
  </TabLinksWrapper>
)
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
 transform: translate(0, -50%)
`
const Tick = props => {
  console.log(props)
  // return props.payload.value
  return (<ForeignObject x={props.x+10} y={props.y-props.payload.offset} width={500} height={props.payload.offset*2}>
    <BarTagsWrapper>
    {
      props.payload.value.split('-').map(sub => {
        let subject = subjects.filter(s => s[2] === sub)
        return (
          <BarTag
          key={sub}
          color={subject[0] ? subject[0][1] : false}
          >{sub}</BarTag>
        )
      })
    }
    </BarTagsWrapper>
    </ForeignObject>)
}
const MoovitWrapper = styled('div')`
  width:100%;
  height:80vh;
  iframe{
    border:none;
    outline:none;
    margin-bottom:0;
  }
`
const ContactGrid = styled('div')`
  display:flex;
  justify-content:space-between;
  min-height:20vh;
  .left{
    width:${props => props.full ? '0' : 'calc(50% - 1em)'};
    visibility:${props => props.full ? 'hidden' : 'visible'};
    transition.3s all;
  }
  .right{
    width:${props => props.full ? '100%' : 'calc(50% - 1em)'};
    transition.3s all;
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
  svg{
    path{
      fill: rgb(89,0,138);
    }
  }
`
mapboxgl.accessToken = 'pk.eyJ1IjoibWljb3JpeCIsImEiOiJjanJ0cjN2Y2IwcjZiM3ltaWw4a2EwMzNlIn0.9aYkpqbDoPBGO3hTuIvdvw'

export default class extends Component{
  constructor(props){
    super(props)
    console.log(props)
    this.headerEl = React.createRef()
    this.state = {
      fixedHeader: false,
      mouse: 'out'
    }
    this.mapContainer = React.createRef()
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
        <FontAwesomeIcon icon={faGraduationCap} size="2x" />
       </MarkerWrapper>
     ), el)
     this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')
     this.map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}))
     this.map.on('mousemove', this.handleMouseStart)
    this.map.on('mouseout', this.handleMouseOut)
     new mapboxgl.Marker(el)
     .setLngLat([location.position.Longitude, location.position.Latitude])
     .addTo(this.map)
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
      <Wrapper>


          <FixedHeader active={this.state.fixedHeader}>
          <div className="container">
          <div className="top">
          { school.media && school.media[0] ? <img src={school.media[0]} /> : <LOPlaceholder /> }
          <h2 >{school.name.full}</h2>
          </div>
          <TabLinks />
          </div>


          </FixedHeader>

      <div ref={this.headerEl}>
      <Header bg={school.media && school.media[0]}>
      { school.media && school.media[0] ? <img src={school.media[0]} /> : <LOPlaceholder /> }
      <div>
      <h1>{school.name.full}</h1>
      </div>
      </Header>
      <TabLinks />
  </div>
  <Section id="info">
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
  <Section id="thresholds">
  <h2>Progi punktowe</h2>
  { !school.thresholds ? <span>Brak danych</span> : (
     <ResponsiveContainer width="100%" height={500} >
    <BarChart height={500} data={school.thresholds._2018.detailed}

              layout="vertical"
              >
         <YAxis dataKey={t => t.extensions.join('-')} type="category" tick={<Tick />} tickLine={false}/>
         <XAxis type="number" unit="pkt" domain={[0, 200]}/>
         <Tooltip/>
         <Bar dataKey='threshold' fill="rgb(89,0,138)" name="Próg punktowy" />
        </BarChart>
          </ResponsiveContainer>

  )}
  </Section>
  <Section id="contact">
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
  <Section id="thresholds">
  <h2>Dojazd</h2>

  <MoovitWrapper className="mv-wtp"
     data-metro="1062"
     data-to-lat-long={[school.location.position.Latitude, school.location.position.Longitude].join('_')}
     data-lang="pl" />

  </Section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      </Wrapper>
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
          Label
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
          }
        }
      }
    }
  }
`
