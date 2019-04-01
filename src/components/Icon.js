import React, {Component} from 'react'
import styled from '@emotion/styled'
import theme from 'utils/theme'

export default class extends Component{
  constructor(props){
    super(props)
    this.svgParent = React.createRef()
    this.StyledIcon = styled(this.props.icon)`
    width:${this.props.size ? this.props.size : '3em'};
    fill: ${this.props.color ? (theme.colors[this.props.color] ? theme.colors[this.props.color] : this.props.color) : 'black'};
    ${this.props.gradient && 'fill:url(#icon-gradient);'}
  `
  }
  componentDidMount(){
  
    if(this.props.gradient){
      const SVG = this.svgParent.current.querySelector('svg')
      SVG.innerHTML = `
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${this.props.gradient[0]};" />
            <stop offset="100%" style="stop-color:${this.props.gradient[1]};" />
          </linearGradient>
        </defs>
          ${SVG.innerHTML}
        `
    }
  }
  render(){
    
  return (
    <span ref={this.svgParent}>
      <this.StyledIcon {...this.props}  />
    </span>

  )
  }
}
