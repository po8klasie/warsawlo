import React from 'react'
import styled from '@emotion/styled'
import LOPlaceholder from 'components/LOPlaceholder'
import Tag from 'components/Tag'
import subjectsMapping from 'utils/subjectsMapping'
import { Link } from 'gatsby'
const CardWrapper = styled(Link)`
  all:unset;
  width:100%;
  border: 3px solid #eee;
  display:grid;
  grid-template-columns: 1fr 4fr 1fr;
  margin:1em;
  cursor:pointer;
  transition: .4s all;
  &:hover{
    box-shadow: 0 20px 70px -20px rgba(0,0,0,0.3);
  }
`
const Info = styled('div')`
  padding:1em;
  h3{
    margin-bottom:20px;
  }
`
const Actions = styled('div')`
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;

  a{
    all:unset;
    cursor:pointer;
    background: #eee;
    padding:5px;
    margin:10px;
    display:block;
    font-size:0.8em;
  }
`
const SchoolImage = styled('img')`
  object-fit:cover;
  margin:0;
  height:100%;
  width:100%;
`
export default ({school, filters}) => {
  console.log(school)
  return (
    <CardWrapper to={`/school/${school.name.full.split(' ').join('+')}`}>
    {
      school.media && school.media[0] ? <SchoolImage src={school.media[0]} /> : <LOPlaceholder />
    }
    <Info>
    <h3>{school.name.full}</h3>
    <h5>{school.location && school.location.address.District}</h5>
    {
      school.thresholds && school.thresholds._2018.overview.availableSubjects.map(subject => {
        let subArr = subjectsMapping.filter(s => s[2] == subject)
        let color = subArr[0] ? subArr[0][1] : 'black'
        return (
            <Tag
            small
            color={color}
            key={subject}
            active={filters.profiles.includes(subArr[0] ? subArr[0][0] : 0)}
            >
            {subject}
          </Tag>
        )
      })
    }
    </Info>
    <Actions>
    <div>
      {school.contact.website && <a href={`http://${school.contact.website}`}
      target="_blank"
      rel="noopener norefferer"
      onClick={e => e.stopPropagation()}
      >Odwiedź stronę</a>}
      <a href={`https://google.com/search?q=${school.name.full.split(' ').join('+')}`}
      target="_blank"
      rel="noopener norefferer"
      onClick={e => e.stopPropagation()}
      >Szukaj w Google</a>
      </div>
    </Actions>

    </CardWrapper>
  )

}
