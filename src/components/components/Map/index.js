
import React from 'react'
import mapboxgl from 'mapbox-gl'
import {css} from 'emotion'
import {connect} from 'react-redux'
import addSchoolMarkers from './schoolMarkers'
import {injectGlobal} from 'emotion'
import {selectSchool} from '../../store/actions/select'
mapboxgl.accessToken = 'pk.eyJ1IjoibWljb3JpeHBhYm1lZCIsImEiOiJjamxrcGN2MW0wbXlxM2twaXZjdXU1eDEyIn0.4_sxaF5tHhMDudaaJ8_vzQ';

injectGlobal`
@import url('https://api.mapbox.com/mapbox-gl-js/v0.50.0/mapbox-gl.css');
`
const mapDefaults = {
  center: [21.009241599999996, 52.2320503],
  zoom: 12,
  pitch: 0
}
class Map extends React.Component {
  state = {
    schoolMarkers: null,
    cameraRotation: null
  }
  constructor(props){
    super(props)
    this.mapContainer = React.createRef()
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      ...mapDefaults
    })
    window.mapEl = this.map
    this.props.getMap(this.map)
    this.map.on('click', e => {
      let marker = e.originalEvent.path.filter(el => el.classList && el.classList.contains('school-marker'))[0]
      if(!marker){
        this.props.selectSchool(null)
      }
    })
    this.map.addControl(new mapboxgl.NavigationControl());
    let schoolMarkers = addSchoolMarkers({
      map: this.map,
      selectSchool: this.props.selectSchool,
      schools: this.props.data.data
    })
    this.schoolMarkers = schoolMarkers
    this.map.on('load', () => {
      this.addLayerToMap()
    })

  }
  addLayerToMap = () => {
    let layers = this.map.getStyle().layers
    let labelLayerId = layers.filter(layer => layer.type === 'symbol' && layer.layout['text-field']).pop().id
    this.map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId)
  }
  rotateCamera = (timestamp) => {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    this.map.rotateTo((timestamp / 100) % 360, {duration: 0})
    this.frameId = window.requestAnimationFrame(this.rotateCamera)
  }
  componentDidUpdate = (prevProps) => {
    let schoolChanged = prevProps.select.schoolID !== this.props.select.schoolID

    if(schoolChanged){
      window.dispatchEvent(new Event('resize')) // resize map
      clearInterval(this.animationTimeout)
      // cancelAnimationFrame(this.frameId)
    }

    // selection has been cleared
    if(this.props.select.schoolID === null && prevProps.select.schoolID !== null){
      this.map.easeTo(mapDefaults)
      this.schoolMarkers.forEach(marker => marker.getElement().classList.remove('active'))
    }

    // school selection changed
    if(this.props.select.schoolID !== null && schoolChanged){
      let position = [
        this.props.data.data[this.props.select.schoolID].location.position.Longitude,
        this.props.data.data[this.props.select.schoolID].location.position.Latitude,
      ]
      this.map.stop()
      setTimeout(() => {
        this.map.easeTo({
          center: position,
          duration: 800,
          zoom: 14,
        })
      }, 300)
      // this.animationTimeout = setTimeout(() => {
      //   this.map.easeTo({
      //     zoom: 17,
      //     pitch:60,
      //     center: position,
      //     duration: 800,
      //   })
      //   setTimeout(() => this.rotateCamera(0), 800)
      // }, 10000)
    this.map.setLayoutProperty('3d-buildings', 'visibility', 'visible')

    }
  }

  render() {
    let navHeight = this.props.style.navHeight ? this.props.style.navHeight : 0;
    return (<div ref={this.mapContainer} className={css`
    width:${'100%'};
    float:right;
    height:100%;
    div[class^='mapboxgl-ctrl-'], .mapboxgl-marker{
      top:auto;
      left:auto;
    }
      `}></div>)
}
}
const mapStateToProps = (state, ownProps) => {
  return ({
    style: state.style,
    select: state.select,
    data: state.data
})
}

const mapDispatchToProps = (dispatch) => ({
  selectSchool: schoolID => dispatch(selectSchool(schoolID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);
