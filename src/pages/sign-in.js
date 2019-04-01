import React, { Component } from 'react'

import styled from '@emotion/styled'
import doorImage from 'images/door.jpg'
import { Link, navigate } from 'gatsby'
import theme from 'utils/theme'
import Color from 'color'
import WelcomeLayout from 'components/WelcomeLayout'
import { getUsernames } from 'utils/manage/users'
import Icon from 'components/Icon'
import UserIcon from '../images/icons/user.svg'
import { setCurrentUser } from '../utils/manage/users';

const Header = styled.h2`
    margin-top: 1em;
    text-align:center;
`
const  UserLink = styled.button`
    cursor:pointer;
    background: none;
    color:#333;
    display: flex;
    align-items:center;
    padding:1em;
    margin: 1em 0;
    width:100%;
    border: 3px solid #ddd;
    border-radius:3px;
    outline:none;
    h3{
        margin:0;
    }
    svg{
        margin-right:2em;
    }
    &:focus{
        border-color:#aaa;
    }

`
const UsersWrapper = styled.div`
    width:50%;
    margin:auto;
`
const SignUpLink = styled(Link)`
    color:black;
`
const Warning = styled.p`
    color:#aaa;
    margin-top:2em;
    text-align:center;
`
export default class extends Component{
    constructor(props){
        super(props)
        this.state = {
            usernames: []
        }
        this.getUsernames()
    }
    getUsernames = () => {
        getUsernames().then(usernames => {
            this.setState({
                usernames
            })
        })
    }
   signin = (username) => {
        setCurrentUser(username).then(user => {
            navigate('/dashboard')
        })
   }
    render(){
        return (
            <WelcomeLayout image={doorImage}>
                <Header>Zaloguj się</Header>
                
            <UsersWrapper>
                {
                    this.state.usernames.map(username => (
                        <UserLink onClick={() => this.signin(username)}>
                          
                            <Icon icon={UserIcon} gradient={[theme.colors.primary, theme.colors.tertiary]} />
                            <h3>{username}</h3>
                            
                        </UserLink>
                    ))
                }
                <SignUpLink to="/welcome">lub utwórz nowe konto</SignUpLink>
                </UsersWrapper>
                <Warning>
                    Uwaga!<br />
                    Pamiętaj, że konto założone na innym urządzeniu nie będzie rozpoznawalne.
                    Jeśli chcesz przenieść z niego dane, wyeksportuj je, a potem importuj.
                </Warning>
            </WelcomeLayout>
           
        )
    }
}