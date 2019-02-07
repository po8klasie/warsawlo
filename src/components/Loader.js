import React from 'react'
import {FontAwesomeIcon }from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import styled from '@emotion/styled'
const Loader = styled('div')`
  width:100%;
  text-align:center;
  .wrapper{
    width:100%;
    display:flex;
    justify-content:center;
  }
  p{
    text-align:center;
    letter-spacing:2px;
    color:black;
    font-family: Work Sans;
    font-size: calc(1.5em * ${props => props.size ? (1/props.size*2) : 1});
  }
`
const AnimatedIcon = styled(FontAwesomeIcon)`
& path{
  fill: transparent;
}
stroke: ${props => props.theme.colors.primary};
stroke-width:20;

stroke-width: 20;
animation: loader 3s linear infinite both;
--loader-totallength: 1200;
--loader-dashlength: 1000;
stroke-dasharray: var(--loader-dashlength) calc(var(--loader-totallength) - var(--loader-dashlength));
stroke-dashoffset: var(--loader-totallength);
position:relative;
&::after{
  position:absolute;
  top:100%;
  content: 'Loading';
}
@keyframes loader {
	100% {
		stroke-dashoffset: 0;
	}
}
`
export default (props) => (
  <Loader {...props}>
  <div className="wrapper">
  <AnimatedIcon icon={faGraduationCap} size={props.size ? `${props.size}x` : '6x'}/>
  </div>
  <p>Loading</p>
  </Loader>
)
