import React, { Component, forwardRef } from 'react'
import PropTypes from 'prop-types'
class MoovitEmbed extends Component{
  constructor(props){
    super(props)
    this.simpleMappings = [
      'metro',
      'lang',
      'from',
      'to'
    ]
  }
  componentDidMount = () => {
    if(!document.querySelector('#moovit-jsw')){
      (function(d, s, id, props) {
        var js, fjs = d.getElementsByTagName(s)[0];

        js = d.createElement(s); js.id = id;

        js.src = `https://widgets.moovit.com/wtp/${props.lang ? props.lang : 'en'}`;

        fjs.parentNode.insertBefore(js, fjs);

      })(document, 'script', 'moovit-jsw', this.props)
    }
  }
  render = () => {
    let attr = {}
    for(let key in this.props){
      console.log(key, this.props[key])
      if(this.simpleMappings.includes(key)){
        attr[`data-${key}`] = this.props[key]
      }else if(key == 'fromCoords'){
        attr['data-from-lat-long'] = this.props[key].join('_')
      }else if(key == 'toCoords'){
        attr['data-to-lat-long'] = this.props[key].join('_')
      }
    }
    console.log(attr)
    return (
      <div className={`mv-wtp ${this.props.className}`}  {...attr} ref={this.props.forwardedRef}></div>
    )
  }
}
MoovitEmbed.propTypes = {
  metro: PropTypes.number,
  lang: PropTypes.string,
  from: PropTypes.string,
  fromCoords: PropTypes.arrayOf(PropTypes.number),
  to: PropTypes.string,
  toCoords: PropTypes.arrayOf(PropTypes.number)
}

export default forwardRef((props, ref) => <MoovitEmbed {...props} forwardedRef={ref} />)
