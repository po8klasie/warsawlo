const getImage = (website) => new Promise((resolve, reject) => {
  fetch(`https://cors-anywhere.herokuapp.com/${website}`).then(res => res.text()).then(response => {
    let d = document.createElement('div')
    d.innerHTML = response;
    console.log(d.querySelectorAll('img'));
    resolve()
  })
})
export default getImage
