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

  span{
    margin: 0 3em;
    display:flex;
    align-items:center;
    height:100%;
  }
  .range-wrapper{
    width:90%;
  }
  .rc-slider-track{
    background:${theme.colors.primary};
  }
  .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:active, .rc-slider-handle-click-focused, .rc-slider-handle-click-focused:focus{
    border-color:${theme.colors.primary};
    box-shadow:none;
  }
`
const Range = createSliderWithTooltip(Slider.Range)
export default props => (
  <RangeWrapper>
  <span>0 pkt</span>
  <div className="range-wrapper">
  <Range min={0} max={200} defaultValue={[0, 200]} tipFormatter={value => `${value} pkt`} onChange={props.onChange}/>
  </div>
  <span>200 pkt</span>
  </RangeWrapper>
)
