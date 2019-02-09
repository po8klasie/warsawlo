const HereMapsAPI = require('here-maps-node').default;
const dotenv = require('dotenv')
const es = require('event-stream')

dotenv.config()
if(!('HERE_APP_ID' in process.env) || !('HERE_APP_CODE' in process.env))
  throw new Error('Here API creds missing')
const hmAPI = new HereMapsAPI({
  app_id: process.env.HERE_APP_ID,
  app_code: process.env.HERE_APP_CODE
})

const getLocation = () => es.map((school, callback) => {
  hmAPI.geocode({
    searchtext: `${school.location.street} ${school.location.houseNumber}, Warszawa, Polska`
  }, (err, result) => {
    if(err){
      callback(null, school)
      return
    }
    let position = result.Response.View[0].Result[0].Location.DisplayPosition
    let address = result.Response.View[0].Result[0].Location.Address

    callback(null, {
      ...school,
      location: {
        position,
        address
      }
    })
})
})
module.exports = getLocation
