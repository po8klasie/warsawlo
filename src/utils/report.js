const macroURL = 'https://script.google.com/macros/s/AKfycbycBZl68tLHTSJkHPqn_PGUNCsHZq6hA1fzC6vs9kT-r_HQxKU/exec'

const serialize = (data) => Object.entries(data).map(entry => `${ encodeURIComponent(entry[0])} = ${encodeURIComponent(entry[1])}`).join('&')

const report = ({title, description}) => {
  let data {
    title,
    description,
    time: new Date()
  }
  fetch(`${macroURL}?${serialize(data)}`)
  .then(res => res.text())
  .then(res => console.log(res))
}
export default report
