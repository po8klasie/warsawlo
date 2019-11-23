import transformParam from './transformParams'

export const generateParamsURI = (query, filters) => {
  let params = new URLSearchParams()
  for (let [name, value] of Object.entries(filters)) {
    if (name !== 'query' && value && !isEqual(value, this.defaultFilters[name]))
      params.set(name, transformParam(name, value))
  }
  if (query) {
    params.set('query', query)
  }

  return decodeURIComponent(params.toString())
}
export const fromParams = (params) => {
  let searchParams = new URLSearchParams(params)
  let filters = {}
  let query = searchParams.has('query') ? searchParams.get('query') : ''

  for (let [name, value] of searchParams.entries()) {
    if (name !== 'query' && value.trim().length > 0)
      filters[name] = transformParam(name, value, true)
  }
  return {
    query,
    filters,
  }
}
