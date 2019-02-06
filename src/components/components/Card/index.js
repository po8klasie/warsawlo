import React, {Component, forwardRef} from 'react'

import styled from 'react-emotion'
import {css} from 'emotion'
import {connect} from 'react-redux'
import {selectSchool} from '../../store/actions/select'
import {Link} from 'react-router-dom'
import Subjects from '../../data/subjects.json'
import Tag from '../Tag'
import Button from '../Button'
const SitePreview = styled('div')`
  position:relative;
  width:${props => props.dimensions.width}px;
  height:15rem;
  padding: 0;
  overflow: hidden;
  margin: 0 auto 0 auto;

  iframe{
    width:${props => props.dimensions.width*4}px;
    height:${props => props.dimensions.height * 4}px;
    border: 0;
    transform: scale(0.25);
    transform-origin: 0 0;
    pointer-events:none;
    overflow:hidden;
    display: block;
  }
  &::after{
    content: '${props => props.website ? '' : 'LO'}';
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
    background:${props => props.theme.colors.primary};
    opacity:0.5;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:${props => props.dimensions.height * 0.4 * 0.8}px;
    font-family ${props => props.theme.fonts.secondary};
    color:white;
  }
`
const CardElement = styled('div')`
overflow:hidden;
height:100%;
width:100%;
background:white;
box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.3);
`
const CardBody = styled('div')`
width: calc(100% - 20px);
padding: 10px;

h1{
  font-size: 1.2em;
  margin:0;
}
h2{
  font-size: .8em;
  color:rgb(100,100,100);
}
a{
  all:unset;
}
`
const getWikiSummary = (name, signal) => new Promise(async (resolve) => {
  let searchRes, pageRes
  try{
  searchRes = await fetch(`https://pl.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&&origin=*&search=${name}`,
    {
      signal
    })
  }catch{
    resolve('')
    return
  }
  if(!searchRes){
    resolve('')
    return
  }
  let response = await searchRes.json()
  if(!response[1]){
    resolve('')
    return
  }
  let normalizedName = response[1]
  try {
  pageRes = await fetch(`https://pl.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=${normalizedName}`,
  {
    signal
  })
} catch (e) {
  console.log(e);
  resolve('')
  return
}
  if(!pageRes){
    resolve('')
    return
  }
  response = await pageRes.json()
  if(response.query === undefined || !response.query.pages || !response.query.pages.length < 1){
    resolve('')
    return
  }
  console.log(response);
  let site = Object.values(response.query.pages)[0]
  if(site){
    let text = site.extract.split(/–(.+)/)[1].trim()
    resolve(text.charAt(0).toUpperCase()+text.slice(1))
    return
  }
  resolve('')
})
class SchoolCard extends Component{
 constructor(props){
 super(props)
 this.state = {
   summary: '',
   dimensions: {},
   loadError: false
 }
 this.el = React.createRef()
 this.frame = React.createRef()
 }
 getDimensions = () => {
   this.setState({
     dimensions: {
       height: this.el.current.clientHeight,
       width: this.el.current.clientWidth
     }
   })
 }
 componentDidMount = () => {
   this.timeout = setTimeout(this.fireIframeError, 10000)
   this.getDimensions()
   window.addEventListener('resize', this.getDimensions)
   this.controller = new AbortController()
   this.signal = this.controller.signal

   // getWikiSummary(this.props.school.name.full, this.signal).then(summary => {
   //   this.setState({
   //     summary
   //   })
   // }).catch(err => {
   //   console.log(err);
   // })
 }
 componentWillUnmount = () =>{
   this.controller.abort()
   window.removeEventListener('resize', this.getDimensions)
   clearTimeout(this.timeout)
 }
 selectSchool = () => {
   this.props.selectSchool(this.props.schoolID)
 }
 handleLoad = () => {
   clearTimeout(this.timeout)
 }
 fireIframeError = (e) => {
   if(e){
     console.log(e);
   }
   this.setState({
     loadError: true
   })
 }
 render = () => {
   return (
     <div ref={this.props.innerRef} style={{height: '100%'}}>
     <div ref={this.el} style={{height: '100%'}}>
       <CardElement onClick={this.selectSchool}>
       <SitePreview dimensions={this.state.dimensions} website={!this.state.loadError & Boolean(this.props.school.contact.website)}>
       {
         (() => {
           // if(!this.state.loadError && this.props.school.contact.website)
           //   return <iframe sandbox src={`http://${this.props.school.contact.website}`} ref={this.frame} onLoad={this.handleLoad}></iframe>

           return null
         })()
       }
       </SitePreview>
         <CardBody>
           <h1>{this.props.school.name.full && this.props.school.name.full}</h1>
           <h2>{this.props.school.location.address && this.props.school.location.address.District}</h2>
           {(() => {
            if(this.props.school.profiles){
              return this.props.school.profiles.overview.availableSubjects.map(subject => {
                let info = Subjects.filter(arr => arr[2] == subject)
                let color = 'black'
                let isActive = false
                if(info && info[0]){
                  color = info[0][1]
                  isActive = this.props.filters.subjects ? this.props.filters.subjects.includes(info[0][0]) : false
                  }
                return (<Tag
                  small
                  color={color}
                  key={subject}
                  active={isActive}
                  >
                  {subject}
                </Tag>)
              })
            }
            return null
           })()}
           <p>{this.state.summary.length > 100 ? this.state.summary.substr(0, 100).trim()+' ...' : this.state.summary}</p>
           <Link to={`/school/${this.props.school.name.full.split(' ').join('+')}`}><Button>Więcej</Button></Link>
         </CardBody>
       </CardElement>
     </div>
     </div>
   )
 }
 }

 const mapDispatchToProps = (dispatch) => ({
   selectSchool: schoolID => dispatch(selectSchool(schoolID))
 })
const SchoolCardConnected = connect(null, mapDispatchToProps)(SchoolCard)
 // Use connect to put them together
 export default forwardRef((props, ref) => <SchoolCardConnected innerRef={ref} {...props}/>)
