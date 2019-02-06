import React from 'react'
import styled from 'react-emotion'

const InputElement = styled('input')`
all:unset;
padding:10px;
background rgb(230,230,230);
border: 3px solid rgb(230,230,230);
border-radius:3px;
transition: .2s all;
&:focus{
  border: 3px solid rgb(210,210,210);
}
`
export default props => <InputElement {...props} />
