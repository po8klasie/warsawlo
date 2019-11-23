export default (regon) => {
  let data = []
  if (typeof window !== 'undefined') {
    if (localStorage.following) {
      data = JSON.parse(localStorage.following)
      if (data.includes(regon)) {
        data.splice(data.indexOf(regon), 1)
        if (data.length === 0) {
          localStorage.removeItem('following')
          return
        }
      } else {
        data.push(regon)
      }
      localStorage.following = JSON.stringify(data)
    } else {
      localStorage.following = JSON.stringify([regon])
    }
  }
}
