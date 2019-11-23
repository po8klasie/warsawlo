import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Suggestion = ({ item, matches }) => {
  console.log(item, 'item')
  console.log(matches, 'matches')

  if (!matches || matches.key !== 'name.full') {
    return (
      <Item>
        <div>{item.name.full}</div>
        <Location>{item.location.address.District}</Location>
      </Item>
    )
  }
  // we are using index 0 in matching array, as we fuzzy search only by key 'key'
  // in our suggestion not in whole object. Matches on further locations will
  // never occur with current Fuse.js configuration.
  const matchInfo = matches[0]
  const matchValue = matchInfo.value.split('')
  let numberOfAddedIndexes = 0
  matchInfo.indices.map(([start, end]) => {
    matchValue.splice(start + numberOfAddedIndexes, 0, '<b>')
    numberOfAddedIndexes++
    matchValue.splice(end + 1 + numberOfAddedIndexes, 0, '</b>')
    numberOfAddedIndexes++
  })

  return (
    <Item>
      <div dangerouslySetInnerHTML={{ __html: matchValue.join('') }} />
      <Location>{item.location.address.District}</Location>
    </Item>
  )
}

Suggestion.propTypes = {
  matches: PropTypes.array,
  name: PropTypes.string.isRequired,
}

export default Suggestion

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 12px;
  align-items: center;
`

const Location = styled.span`
  background: blue;
  color: white;
  text: bold;
  border-radius: 4px;
  padding: 5px 8px;
  white-space: nowrap;
`
