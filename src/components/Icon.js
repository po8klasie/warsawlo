import React from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'

export default (props) => {
  const StyledIcon = styled(props.icon)`
    width:${props.size ? props.size : '3em'};
    fill: ${props.color ? (theme.colors[props.color] ? theme.colors[props.color] : props.color) : 'black'};
  `
  return <StyledIcon {...props} />
}
