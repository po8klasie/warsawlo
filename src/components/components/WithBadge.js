import React, {Children} from 'react'
import styled from 'react-emotion'
export default props => {
  let Element = styled(Children.only(props.children))`
    position:relative;
    &::after{
      content:'${props.title}';
      position:absolute;
      top:-10px;
      right:-10px;
      display:block;
      background ${props => props.theme.colors[props.color ? props.color : 'primary']};
      color:white;
      transform: rotate(10deg);
      transform-origin: bottom right;
      letter-spacing:2px;
      font-size:.8em;
      border-radius:3px;
    }
  `
  return Element
}
