import React from 'react'
import { navigate } from 'gatsby'
import { getUsernames } from 'utils/manage/users'
export default () => {
    getUsernames().then(usernames => {
        if(usernames.length > 0){
            navigate('/sign-in')
            return
        }
        navigate('/welcome')
    })
    return <h1>Ładowanie...</h1>
}