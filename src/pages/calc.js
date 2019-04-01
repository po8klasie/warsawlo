import React, {Component} from 'react'
import styled from '@emotion/styled'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faPenNib,
  faCalculator,
  faChalkboardTeacher,
  faLanguage,
  faPaw,
  faLandmark,
  faHandsHelping,
  faAward,
  faCertificate,
  faPlus,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons'
import Input from 'components/Input'
import Tag from 'components/Tag'
import {InputGroup, InputAddon} from 'components/InputGroup'
import CheckBox from 'components/CheckBox'
import Accomplishments from 'components/Acomplishments'
import AppLayout from 'components/app/Layout'
import theme from 'utils/theme'
import PointsCalculator from '@warsawlo/points-calculator'
const responsiveWidth = '1000px'
const Grid = styled('div')`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column-gap: 30px;
grid-row-gap: 30px;
@media (max-width: ${responsiveWidth}) {
grid-template-columns: 1fr;
width:100%;
}
.geo{
color: rgba(0,0,0,0.5);
}
.profile{
border-bottom: 3px solid ${theme.colors.light};
&:last-of-type{
  border-bottom: none;
}
}
.threshold{
text-align:right;
margin: 0 0 0 10px;
}
`
const InnerGrid = styled('div')`
& > div:not(.no-grid) {
  border-bottom: 2px solid ${theme.colors.light};
  display: grid;
grid-template-columns: 1.2em .7fr auto;
grid-column-gap: 20px;
padding-bottom:10px;
margin: 10px 0 10px 0;
&:last-of-type{
  padding-bottom:0;
  border-bottom:none;
}

& *{
  display:flex;
  align-items:center;
}
}
`
const Box = styled('div')`
margin:20px;
background:white;
padding:10px;
@media (max-width: ${responsiveWidth}) {
  margin:0;
  padding:0;
}
.icon, span{
  display:flex;
  align-items:center;
  justify-content:center;
}
.grades{
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.result{
  display:flex;
  align-items:center;
  justify-content:flex-end;
  margin: 1em -10px 0 -10px;
  padding:10px 10px 0 0;
  border-top: 5px solid ${theme.colors.light};
  font-size:1.5em;
  @media (max-width: ${responsiveWidth}) {
    margin:0;
    padding:0;
  }
  &::before{
    content: 'Razem:';
    margin-right:.5em;
  }
  &::after{
    content: 'pkt';
    margin-left:.5em;
  }
}
`
const HeaderBox = styled(Box)`
`
const Grade = styled(Tag)`
color:black;
`
const PercentInputGroup = styled(InputGroup)`
input{
  width:3em;
}
`
const SubjectInput = styled(Input)`
padding:5px;
width: calc(100% - 10px);
`
const SchoolTypeWrapper = styled('div')`
display: flex;
`
const Accomplishment = styled('div')`
width:100%;
display: grid;
grid-template-columns: auto 1.2em;
grid-column-gap: 10px;
span{
  margin:5px;
  display:block;
}
.icon-wrapper{
  display:flex;
  align-items:center;
  jsutify-content:center;
  svg{
    cursor:pointer;
  }
}
`
const pointsFromGrades = (grades) => grades.reduce((prev, curr) => {
switch (curr) {
  case 6:
    console.log(prev, prev+18);
    return prev+18;
    break
  case 5:
    return prev+17
    break
  case 4:
    return prev+14
    break
  case 3:
    return prev+8
    break
  case 2:
    return prev+2
    break
  default:
    return prev
}
}, 0)
const pointsFromExam = (percentage, isGim) => {
console.log(Object.values(percentage).reduce((prev, curr) => prev+curr*0.2,0));
if(isGim)
  return Object.values(percentage).reduce((prev, curr) => prev+curr*0.2,0)

return Object.entries(percentage).reduce((prev, curr) => prev+curr[1]*(curr[0] !== 'lang' ? 0.35 : 0.3),0)
}
const pointsFromOther = (other) => Object.entries(other).reduce((prev, curr) => {
if(curr[1]){
  switch (curr[0]) {
    case 'merit':
      return prev+7
      break
    case 'activity':
      return prev+3
      break
    default:
      return prev
  }
}
return prev
}, 0)
const pointsFromAccomplishments = (accomplishments) => accomplishments.reduce((prev, curr) => prev+curr.type[1], 0)
export default class Calculator extends Component{
constructor(props){
super(props)
this.state = {
 grades: {
   polish: 1,
   math: 1,
   first: 1,
   second: 1
 },
 exam: {
   polish: 1,
   history: 1,
   math: null,
   science: null,
   lang: null
 },
 other: {
   activity: false,
   merit: false
 },
 schoolType: 'GIM',
 accomplishments: [],
 points: {}
}
this.Calc = new PointsCalculator()
this.Calc.points.subscribe(points => {
    console.log(points, 'xdd')
    this.setState({
        points
    })
})
}
toggleSchoolType = () => {
this.setState(state => {
  if(state.schoolType === 'GIM')
    return {
      schoolType: 'SP',
      exam: {
        ...state.exam,
        science: null,
        history: null
      }
    }
  return {schoolType: 'GIM'}
})
}
handleGrade = (grade, subject) => {
    this.setState(state => ({
        grades: {
            ...state.grades,
            [subject]: grade  
        }
    }), () => this.Calc.setGrades(this.state.grades))
}
handleExam = e => {
    e.persist()
    let category = e.target.getAttribute('data-category')
    this.setState(state => ({
        exam: {
            ...state.exam,
            [category]: parseInt(e.target.value)
        }
    }), () => this.Calc.setExamResult(this.state.exam))
}
handleOther = (e) => {
 let key = e.target.getAttribute('data-key')
 this.setState(state => {
   let other = state.other
   other[key] = !other[key]
   return {other}
 })
}
addAccomplishment = accomplishment => {
 this.setState(state => ({
   accomplishments: [
     ...state.accomplishments,
     accomplishment
   ]
 }))
}
handleRemoveAccomplishment = (idx) => {
 this.setState(state => {
   let accomplishments = state.accomplishments
   accomplishments.splice(idx, 1)
   return {accomplishments}
 })
}
renderGrades = (subject) => {
 return new Array(5).fill(0).map((x, grade) => <Grade
 color="rgb(89,0,138)"
 active={this.state.grades[subject] == grade+2}
 onClick={() => this.handleGrade(grade+2, subject)}>{grade+2}</Grade>)
}
render = () => {
return (
 <AppLayout location={this.props.location}>
 
<HeaderBox>
 <h1>Kalkulator punktów</h1>


</HeaderBox>


   <Grid>
     <div>
     <Box>
       <h2>Świadectwo</h2>
       <InnerGrid>
         <div>
              <div className="icon">
           <FontAwesomeIcon icon={faPenNib} />
           </div>
           <span>Język polski</span>
             <div className="grades">
              {this.renderGrades('polish')}
             </div>
         </div>
         <div>
              <div className="icon">
           <FontAwesomeIcon icon={faCalculator} />
           </div>
           <span>Matematyka</span>
             <div className="grades">
              {this.renderGrades('math')}
             </div>
         </div>
         <div>
           <div className="icon">
             <FontAwesomeIcon icon={faChalkboardTeacher} />
           </div>
             <SubjectInput placeholder="Przedmiot I"/>
           <div  className="grades">
            {this.renderGrades('first')}
           </div>

         </div>
         <div>
           <div className="icon">
             <FontAwesomeIcon icon={faChalkboardTeacher} />
           </div>
              <SubjectInput placeholder="Przedmiot II"/>
           <div className="grades">
            {this.renderGrades('second')}
           </div>

         </div>
         <div>
              <div className="icon">
           <FontAwesomeIcon icon={faCertificate} />
           </div>
           <span>Świadectwo w wyróznieniem</span>
           <CheckBox checked={this.state.other.merit} data-key="merit" onToggle={this.handleOther}/>
         </div>
         <div>
              <div className="icon">
           <FontAwesomeIcon icon={faHandsHelping} />
           </div>
           <span>Aktywność społeczna</span>
           <CheckBox checked={this.state.other.activity} data-key="activity" onToggle={this.handleOther}/>
         </div>
       </InnerGrid>
       <div className="result">
         {this.state.points.gradesPoints}
       </div>

     </Box>
     </div>
     <div>
     <Box>
        <h2>Egzamin</h2>
          <InnerGrid>
            <div>
                 <div className="icon">
              <FontAwesomeIcon icon={faPenNib} />
              </div>
              <span>Język polski</span>
              <PercentInputGroup addonAfter>
                <Input type="number" max="100" min="0" onChange={this.handleExam} data-category="polish"/>
                <InputAddon>%</InputAddon>
              </PercentInputGroup>
            </div>
            {(() => {
              if(this.state.schoolType == 'GIM')
                return (
                  <div>
                       <div className="icon">
                    <FontAwesomeIcon icon={faLandmark} />
                    </div>
                    <span>Historia i WOS</span>
                    <PercentInputGroup addonAfter>
                      <Input type="number" max="100" min="0" onChange={this.handleExam} data-category="history"/>
                      <InputAddon>%</InputAddon>
                    </PercentInputGroup>
                  </div>
                )
              return null
            })()}
            <div>
                 <div className="icon">
              <FontAwesomeIcon icon={faCalculator} />
              </div>
              <span>Matematyka</span>
                <PercentInputGroup addonAfter>
                  <Input type="number" max="100" min="0" onChange={this.handleExam} data-category="math"/>
                  <InputAddon>%</InputAddon>
                </PercentInputGroup>
            </div>
            {(() => {
              if(this.state.schoolType == 'GIM')
                return (
                  <div>
                       <div className="icon">
                    <FontAwesomeIcon icon={faPaw} />
                    </div>
                    <span>Przedmioty przyrodnicze</span>
                    <PercentInputGroup addonAfter>
                      <Input type="number" max="100" min="0" onChange={this.handleExam} data-category="science"/>
                      <InputAddon>%</InputAddon>
                    </PercentInputGroup>
                  </div>
                )
              return null
            })()}
                  <div>
                       <div className="icon">
                    <FontAwesomeIcon icon={faLanguage} />
                    </div>
                    <span>Język {this.state.schoolType === 'GIM' && '- podstawa'}</span>
                    <PercentInputGroup addonAfter>
                      <Input type="number" max="100" min="0" onChange={this.handleExam} data-category="lang"/>
                      <InputAddon>%</InputAddon>
                    </PercentInputGroup>
                  </div>
          </InnerGrid>
          <div className="result">
          {this.state.points.examPoints}
          </div>
     </Box>
     </div>
     <div>
     <Box>
       <h3>Osiągnięcia</h3>
       <Accomplishments onAdd={this.addAccomplishment}/>
       {
         this.state.accomplishments.map((accomplishment, i) =>  (
           <Accomplishment>
             <span>Jestem {accomplishment.type[0].toLowerCase()}</span>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faMinusCircle} onClick={() => this.handleRemoveAccomplishment(i)}/>
            </div>
           </Accomplishment>
         ))
       }

       <div className="result">
       {this.state.points.accomplishmentsPoints}
       </div>
     </Box>
   </div>
   </Grid>
   <Box>
     <h2>Razem: {this.state.points.all} pkt</h2>
   </Box>
 </AppLayout>
)
}
}
