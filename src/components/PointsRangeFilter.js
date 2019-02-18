import React from 'react'
import Slider, {createSliderWithTooltip} from 'rc-slider'
import styled from '@emotion/styled'
import 'rc-slider/assets/index.css'
import theme from 'utils/theme'
const RangeWrapper = styled('div')`
  width:70%;
  margin:auto;
  display:flex;
  align-items:center;
  color:white;

  span{
    margin: 0 3em;
    display:flex;
    align-items:center;
    height:100%;
    white-space: nowrap;
  }
  .range-wrapper{
    width:90%;
  }
  .rc-slider-rail{
    background: ${theme.colors.secondary};
  }
  .rc-slider-track{
    background:white;
  }
  .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:active, .rc-slider-handle-click-focused, .rc-slider-handle-click-focused:focus{
    border-color:white;
    background: ${theme.colors.secondary};
    box-shadow:none;
  }
`
const Info = styled('span')`
  metin-top:1em;
  color:white;
`
const Range = createSliderWithTooltip(Slider.Range)
export default props => (
  // <RangeWrapper>
  // <span>0 pkt</span>
  // <div className="range-wrapper">
  // <Range min={0} max={200} defaultValue={[0, 200]} tipFormatter={value => `${value} pkt`} onChange={props.onChange} disabled/>
  // </div>
  // <span>200 pkt</span>
  // </RangeWrapper>
  <>
   <Info>Pracujemy nad tym! Wpadnij tu później!</Info>

  </>
)
