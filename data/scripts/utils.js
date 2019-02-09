const isSame = (a,b) => {
    if(a.length != b.length) return false
    if(a.filter(function(i) {return a.indexOf(i) < 0}).length > 0)
       return false
    if(b.filter(function(i) {return a.indexOf(i) < 0}).length > 0)
       return false
    return true
  }
const subtract = (a, b) => {
      let r = {}

      // For each property of 'b'
      // if it's different than the corresponding property of 'a'
      // place it in 'r'
      for (let key in b) {
          if (Array.isArray(b[key])) {
             if(!a[key]) a[key] = []
             if(!isSame(a[key],b[key]))
                 r[key] = a[key]
          } else if (typeof(b[key]) == 'object') {
              if (!a[key]) a[key] = {}
              r[key] = subtract(a[key], b[key])
          } else {
              if (b[key] != a[key]) {
                  r[key] = a[key]
              }
          }
      }
      return r
  }
module.exports = {
  subtract
}
