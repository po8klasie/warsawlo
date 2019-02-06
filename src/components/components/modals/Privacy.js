import React, {Component} from 'react'
import { Link } from 'react-router-dom'
 import Modal from '../Modal'
 import Button from '../Button'
 import Loader from '../Loader'
 import {faUserSecret} from '@fortawesome/free-solid-svg-icons'
 export default class PrivacyModal extends Component{
 constructor(props){
 super(props)
 }
 render = () => {
 return (
   <Modal open={this.props.open} icon={faUserSecret} onClose={() => this.props.onClose(null)}>
     <h1>Ach to RODO...</h1>
     <h4>
     My też nie lubimy, jak nasze dane są zbierane, dlatego gromadzimy tylko informacje, które są niezbędne do funkcjonowania naszego serwisu.
     Kontynuując przeglądanie tej strony zgadzasz się na korzystanie przez nas technologii cookies, sessionStorage, localStorage itp.
     Zajrzyj do naszego <Link to="/privacy">centrum prywatności</Link>, aby zobaczyć jak dokładnie przetwarzamy Twoje dane.
     </h4>
     <Button onClick={() => this.props.onClose(null)}>Ok, przejdź dalej</Button>

   </Modal>
 )
 }
 }
