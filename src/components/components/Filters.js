import React, {Component} from 'react'
import styled from 'react-emotion'
import {css} from 'emotion'
import { Range, createSliderWithTooltip} from 'rc-slider'
import 'rc-slider/assets/index.css'
import Subjects from '../data/subjects.json'
import Tag from './Tag'
import LocationModal from './modals/Location'
import Input from './Input'

// import {css} from 'emotion'
// import {openModal} from '../store/actions/consent'
import Button from './Button'
const Wrapper = styled('div')`
  height:100%;
  width:25vw;
  display:flex;
  justify-content:center;
  position:sticky;
  top: 10vh;

  .box{
    margin-top:10vh;
    width:calc(80% - 10px);
    padding-left:10px;
    height:70vh;
    background:white;
    // box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.3);
  }
`
const PointsRange = styled(createSliderWithTooltip(Range))`
  margin: 0 10px 0 10px;
  width: calc(100% - 20px);
  .rc-slider-rail{
    background: rgb(210,210,210);
  }
  .rc-slider-handle{
    border: 2px solid ${props => props.theme.colors.primary};
    &:active{
      box-shadow:0;
    }
  }
  .rc-slider-track{
    background: ${props => props.theme.colors.primary};
  }
`
const LocationWrapper = styled('div')`
  position:relative;
  user-select: ${props => props.enabled ? 'auto' : 'none'};
  &::before{
    content: ${props => !props.enabled ? "''" : 'none'};
    width:100%;
    position:absolute;
    height:100%;
    top:0;
    left:0;
    background: rgba(255,255,255,0.7);
    z-index:2;
    display:flex;
    align-items:center;
    justify-content:center;
  }
`
class Filters extends Component{
 constructor(props){
 super(props)
 this.state = {
   subjects: [],
   init:true,
   pointsRange: [],
   isModalOpen: false,
   position: null
 }
 }
 handleSubjectsChange = (subject) => {
   let subjects = this.props.data.subjects ? this.props.data.subjects : []
   this.props.onChange({
     subjects: subjects.includes(subject) ? subjects.filter(e => e != subject) : [...subjects, subject]
   })
 }
 handlePoints = (value) => {
     this.props.onChange({
       pointsRange: value
     })
 }
 handleLocationModal = (position) => {
   if(position){
     this.setState({
       position,
       isModalOpen: false
     })
   }
 }
 handleDistance = (e) => {
   console.log(parseInt(e.target.value)*1000);
   this.props.onChange({
     distance: {
       startPosition: this.state.position.coords,
       maxDistance: parseInt(e.target.value)*1000
     }
   })
 }
 render = () => {
   console.log(this.state.pointsRange, this.props);
 return (<>
   <Wrapper>
   <div className="box">
     <h3>Rozszerzam:</h3>
   {
       Subjects.map(subject => {
         let isActive = this.props.data.subjects ? this.props.data.subjects.includes(subject[0]) : false
         return (
           <Tag

           key={subject}
           active={isActive}
           color={subject[1]}
           onClick={this.handleSubjectsChange.bind(this, subject[0])}
           >{subject[0]}</Tag>

         )
       })

   }
   <h3>Liczba punktów:</h3>
   <PointsRange min={0} max={200} value={this.props.data.pointsRange ? [parseInt(this.props.data.pointsRange[0]),parseInt(this.props.data.pointsRange[1])]  : [0,200]} onChange={this.handlePoints}/>
    <h3>Lokalizacja</h3>
    <LocationWrapper enabled={Boolean(this.state.position)}>
    <p>Twoje współrzędne:<br /> {this.state.position && `${this.state.position.coords.latitude} ${this.state.position.coords.longitude}`}</p>
    <div className="row">
    <span> w promieniu</span> <Input type="number" className={css`width:2em;`} onChange={this.handleDistance} /> km
    </div>
    </LocationWrapper>
    {!this.state.position && <Button onClick={() => this.setState({isModalOpen: true})}>Kliknij, aby odblokować usługi lokalizacji</Button>}
   </div>
   </Wrapper>
   <LocationModal open={this.state.isModalOpen} onClose={this.handleLocationModal} />
   </>
 )
 }
 }


 export default Filters
