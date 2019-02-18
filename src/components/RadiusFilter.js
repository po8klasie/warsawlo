import React from 'react'
import subjects from 'utils/subjectsMapping'
import styled from '@emotion/styled'

const Wrapper = styled('div')`
  display: flex;
  align-items:center;
  span{
    margin:10px;
    color:white;
  }
`
const Input = styled('input')`
  border:none;
  outline:none;
  background:white;
  border-radius:5px;
  padding:10px;
  margin:10px;
  width:3em;
  font-size:1.1em;
`
const Info = styled('span')`
  metin-top:1em;
  color:white;
`
export default props => (
  // <Wrapper>
  //   <span>W promieniu</span>
  //                 <Input type="number" />
  //                 <span>km</span>
  // </Wrapper>
  <Info>Pracujemy nad tym! Wpadnij tu później!</Info>
)
