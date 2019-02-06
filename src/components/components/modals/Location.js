import React, {Component} from 'react'
 import Modal from '../Modal'
 import Button from '../Button'
 import Loader from '../Loader'
 import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'
 export default class LocationModal extends Component{
 constructor(props){
 super(props)
 this.state = {
   loading:false,
   error: null
 }
 }
 ask = () => {
   this.setState({
     loading: true
   })
   navigator.geolocation.getCurrentPosition(position => {
     this.setState({
       loading: false
     })
     console.log(position.coords.latitude, position.coords.longitude)
     this.props.onClose(position)
  }, error => this.setState({error}), {
    enableHighAccuracy: true
  })
 }
 render = () => {
 return (
   <Modal open={this.props.open} icon={faMapMarkedAlt} onClose={() => this.props.onClose(null)}>
     <h1>Hej</h1>
     <h4>Aby skorzystać z opcji lokalizacji musisz pozwolić, abyśmy Ciebie znaleźli</h4>
     {(() => {
       if (!"geolocation" in navigator) {
         return (
          <>
          <Button disabled>Znajdź mnie</Button>
          <p>Twoja przeglądarka nie wspiera geolokalizacji. Skorzystaj z nowszej.</p>
          </>
        )
      } else {
        return (() => {
          if(this.state.loading){
            return <Loader size={3} />
          }else if(this.state.loading && this.state.error){
            return <p>Wystąpił błąd.</p>
          }
          return <Button onClick={this.ask}>Znajdź mnie</Button>
        })()
      }
    })()}
   </Modal>
 )
 }
 }
