import React from 'react'

import styled from '@emotion/styled'
import warsawImage from 'images/warsaw.jpg'
import { Link } from 'gatsby'
import Brand from 'components/Brand'
import theme from 'utils/theme'
import Color from 'color'
import WelcomeLayout from 'components/WelcomeLayout'
const ImportButton = styled(Link)`
    all:unset;
    display: block;
    border:none;
    background: ${theme.colors.tertiary};
    color:white;
    padding: .5em 2em;
    border-radius:3px;
    font-size:1.2em;
    text-align:center;
    cursor:pointer;
    width:100%;
    margin:1em 0;
    box-sizing:border-box;
    transition: .2s all;

    &:hover{
        background: ${Color(theme.colors.secondary).darken(.3).rgb().string()}
    }
`
const NewAccountButton = styled(Link)`
    all:unset;
    display: block;
    text-align:center;
    border:none;
    background: ${theme.colors.primary};
    color:white;
    padding: .5em 2em;
    border-radius:3px;
    font-size:1.2em;
    cursor:pointer;
    width:100%;
    margin:1em 0;
    box-sizing:border-box;
    transition: .2s all;

    &:hover{
        background: ${Color(theme.colors.primary).darken(.3).rgb().string()}
    }
`
const Buttons = styled.div`
    box-sizing:border-box;
    width:50%;
    margin: 10vh auto 0 auto;
`
const Text = styled.p`
    text-align: center;
    margin-top:10vh;
`
const SignInLink = styled(Link)`
    color:black;
`
export default props => (
    <WelcomeLayout image={warsawImage}>
    
                <Text>Pierwsze tak zaawansowane narzędzie stworzone, aby pomóc Ci w rekrutacji</Text>
                <Buttons>
                    
                <NewAccountButton to="/sign-up">Utwórz nowe konto</NewAccountButton>
                <ImportButton to="/import">Importuj dane</ImportButton>
                <SignInLink to="/sign-in">lub zaloguj</SignInLink>
                </Buttons>
       
    </WelcomeLayout>
   
)