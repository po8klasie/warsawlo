import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import TextLink from 'components/TextLink'
import Button from 'components/Button'
import Modal from 'components/Modal'

export default props => (
  <Modal icon={faUserSecret} {...props} onClose={props.onCancel}>
    <h2>Hej!</h2>
    <p>Spokojnie, nie chcemy od Ciebie nic więcej poza zgodą na przechowywanie listy obserwowanych szkół
      na Twoim urządzeniu za pomocą WebStorage (coś w rodzaju nowocześniejszych cookies).
    </p>
    <p>Naszą politykę prywatności oraz Wskazówki, jak cofnąć zgodę możesz znaleźć <TextLink
      to="/privacy">tutaj</TextLink></p>
    <Button onClick={props.onAgree}>Zgadzam się</Button>
    <Button onClick={props.onCancel}>Nie zgadzam się</Button>
  </Modal>
);
