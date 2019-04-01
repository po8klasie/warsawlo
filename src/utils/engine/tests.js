import Subjects from 'utils/subjects'
import {getDistance} from 'geolib'
export const profiles = (values) => (school) => {
  if(!school.thresholds){
    return false
  }
 
  if(values.every(elem => school.thresholds._2018.overview.availableSubjects.includes(elem))){
    return true
  }
 
  return false
}
export const pointsRange = (values) => (school) => {
  if(!school.thresholds){
    return false
  }
  if(school.thresholds._2018.overview.pointsRange[0] >= values[0] && school.thresholds._2018.overview.pointsRange[1] <= values[1]){
    return true
  }
  return false
}
export const distance = (value) => (school) => {

  if(!value)
    return true
  let distanceInMeters = getDistance({
    latitude: value.startPosition.latitude,
    longitude: value.startPosition.longitude
  }, {
     latitude: school.location.position.Latitude,
     longitude: school.location.position.Longitude
  })
  return distanceInMeters <= value.maxDistance
}
