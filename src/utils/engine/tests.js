import Subjects from 'utils/subjectsMapping'
import {getDistance} from 'geolib'
export const profiles = (values) => (school) => {
  if(!school.thresholds._2018){
    return false
  }
  let shortNames = values.map(fullName => Subjects.filter(subject => subject[0] === fullName)[0][2])
  if(shortNames.every(elem => school.thresholds._2018.overview.availableSubjects.includes(elem))){

    return true
  }
  console.log(shortNames, school.thresholds._2018.overview.availableSubjects);
  return false
}
export const pointsRange = (values) => (school) => {
  if(!school.thresholds){
    return true
  }
  if(school.thresholds._2018.overview.pointsRange[0] >= values[0] && school.thresholds._2018.overview.pointsRange[1] <= values[1]){
    return true
  }
  return false
}
export const distance = (value) => (school) => {
  console.log(value);
  let distanceInMeters = getDistance({
    latitude: value.startPosition.latitude,
    longitude: value.startPosition.longitude
  }, {
     latitude: school.location.position.Latitude,
     longitude: school.location.position.Longitude
  })
  return distanceInMeters <= value.maxDistance
}
