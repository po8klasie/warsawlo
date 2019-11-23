import React from 'react'
import subjects from 'utils/subjectsMapping'
import Tag from 'components/Tag'

export default props => (
  <>
    {
      subjects.map(subject => {
        return (
          <Tag
            onClick={() => props.onToggle(subject[0])}
            key={subject}
            active={props.profiles.includes(subject[0])}
            color={subject[1]}
            light

          >{subject[0]}</Tag>

        )
      })

    }
  </>
)
