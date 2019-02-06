import React from 'react'
import SchoolData from '../../data/data.json'
import mapboxgl from 'mapbox-gl'
import {css} from 'emotion'
import {render} from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
const markerStyle = css`
color: rgb(89,0,138);
background: white;
font-size:1.2em;
display:flex;
justify-content:center;
align-items:center;
border-radius:50%;
width: 30px;
height: 30px;
transition: width .2s, height .2s, background .2s, color .2s, font-size .2s;

&.active{
  font-size: 1.5em;
  width:50px;
  height:50px;
  color: white;
  background: rgb(89,0,138);
}
`
const generateMarker = ({schoolID, selectSchool}) => {
  let marker = document.createElement('span')
  render(<FontAwesomeIcon icon={faGraduationCap} />, marker)
  marker.classList.add(markerStyle, 'school-marker')
  marker.addEventListener('click', e => {
    e.preventDefault();
    [].forEach.call(document.querySelectorAll('.school-marker'), el => el.classList.remove('active'))
    e.target.closest('.school-marker').classList.add('active')
    selectSchool(schoolID)
  })
  return marker
}
const addSchoolMarkers = ({map, selectSchool, schools}) => schools.map((school, schoolID) => {
  console.log(school)
  return new mapboxgl.Marker(generateMarker({schoolID, selectSchool, map}))
  .setLngLat([school.location.position.Longitude, school.location.position.Latitude])
  .addTo(map)
})
export default addSchoolMarkers
