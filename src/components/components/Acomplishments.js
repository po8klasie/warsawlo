import React, {Component} from 'react'
import Select from './Select'
import Tag from './Tag'
import styled from 'react-emotion'
import {faBan, faSave, faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Button from './Button'
//// background: ${props => !props.cancel && props.theme.colors.primary};
// color:${props => !props.cancel && 'white'};
const ActionsWrapper = styled('div')`
  display:flex;
  margin-top:10px;
  text-align:center;
  width:100%;
  button{
    margin: 0 10px 10px 10px;
    width:calc(50% - 20px);
  }
  .new{
    background: ${props => props.theme.colors.primary};
    color:white;
  }
`
const AddButton = styled(Button)`
  background: ${props => props.theme.colors.primary};
  color:white;
  width:calc(100% - 40px);
  margin:10px;
  text-align:center;
`
const availableChoices = {
  voivodeship: [
['Co najmniej podwójnym finalistą konkursu przedmiotowego', 10],
['Co najmniej podwójnym laureatem konkursu tematycznego lub interdyscyplinarnego', 7],
['Co najmniej podwójnym finalistą konkursu tematycznego lub interdyscyplinarnego', 5],
['Finalistą konkursu przedmiotowego ', 7],
['Laureatem konkursu tematycznego lub interdyscyplinarnego', 5],
['Finalistą konkursu tematycznego lub interdyscyplinarnego', 3],
],
domestic: [
  ['Finalistą konkursu przedmiotowego', 10],
  ['Laureatem konkursu tematycznego lub interdyscyplinarnego', 7],
  ['Finalistą konkursu tematycznego lub interdyscyplinarnego', 5]
],
international: [
  ['Finalistą konkursu z przedmiotu lub przedmiotów artystycznych objętych ramowym planem nauczania szkoły artystycznej', 10],
  ['Laureatem turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej', 4],
  ['Finalistą turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej', 3]
]
}
const CustomSelect = styled(Select)`
  width:calc(100% - 20px);
`
 export default class Accomplishments extends Component{
 constructor(props){
 super(props)
 this.state = {
   extent: null,
   type: null,
   adding: false
   }
 }

 init = () => this.setState({
   adding:true
 })

 handleExtent = e => this.setState({
     extent: e.target.value
   })

 handleType = e => this.setState({
    type: availableChoices[this.state.extent].filter(type => type[0] == e.target.value)[0]
  })
  cancel = () => this.setState({
    adding:false,
    extent: null,
    type: null
  })
  add = () => {
    this.props.onAdd({
      type: this.state.type,
      extent: this.state.extent
    })
    this.cancel()
  }

 render = () => {
   if(!this.state.adding)
    return (<AddButton onClick={this.init}>
      <FontAwesomeIcon icon={faPlus} /> Dodaj
    </AddButton>)

 return (
   <div>
   <CustomSelect onChange={this.handleExtent} value={this.state.extent}>
     <option disabled selected>Zasięg konkursu</option>
     <option value="voivodeship">Wojewódzki</option>
     <option value="domestic">Ponadwojewódzki</option>
     <option value="international">Międzynarodowy lub ogólnopolski</option>
   </CustomSelect>

   {
     this.state.extent &&
     (
       <CustomSelect onChange={this.handleType} value={this.state.type}>
       <option disabled selected>Jestem</option>
       {
         this.state.extent && availableChoices[this.state.extent].map((choice) => <option data-to-add={choice[1]}>{choice[0]}</option>)
       }
       </CustomSelect>
     )
   }
   <ActionsWrapper>

   <Button className="new" onClick={this.add} disabled={!this.state.type}>
     <FontAwesomeIcon icon={faSave} /> Zapisz
   </Button>
   <Button className="cancel" onClick={this.cancel}>
     <FontAwesomeIcon icon={faBan} /> Anuluj
   </Button>
   </ActionsWrapper>


   </div>
 )
 }
}
