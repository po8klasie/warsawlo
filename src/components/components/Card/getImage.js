const getImage = (website, signal) => new Promise((resolve, reject) => {
  fetch(`https://cors-anywhere.herokuapp.com/${website}`, {signal})
  .then(res => res.text())
  .then(res => {
    let d = document.createElement('div')
    d.innerHTML = res;
    let images = [].slice.call(d.querySelectorAll('img')).sort((a, b) => {
      if (a.clientWidth*a.clientHeight > b.clientWidth*b.clientHeight)
        return -1
      if (a.clientWidth*a.clientHeight < b.clientWidth*b.clientHeight)
        return 1
   return 0
 })
    resolve(images)
  })
})
export default getImage
