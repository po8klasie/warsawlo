const types = {
  subjects: 'array',
  pointsRange: 'array',
  distance: 'object',
}
const transforms = {
  array: [
    value => value.join(','),
    value => value.split(','),
  ],
  object: [
    value => JSON.stringify(value),
    value => JSON.parse(value),
  ],
}

const transformParam = (name, value, toString = false) => transforms[types[name]][toString ? 1 : 0](value)
export default transformParam
