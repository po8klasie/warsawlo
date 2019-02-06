import React from 'react'
import styled from 'react-emotion'

const Tag = styled('span')`
    padding:3px 10px 3px 10px;
    color:${props => !props.active ? props.color : 'black'};
    position:relative;
    display:inline-block;
    border-radius:3px;
    cursor: pointer;
    margin: ${props => props.small ? 2 :20}px;
    font-size: ${props => props.small ? 0.8 :1}em;
    margin: 2px;
    border: 2px solid ${props => props.active ? props.color : 'rgb(210,210,210)'};
    transition: .2s all;
    letter-spacing: 2px;
`
export default (props) => (
  <Tag {...props}>{props.children}</Tag>
)
