import React, { Component } from 'react'

import styled from '@emotion/styled'
import typewriterImage from 'images/typewriter.jpg'
import { Link, navigate } from 'gatsby'
import theme from 'utils/theme'
import Color from 'color'
import WelcomeLayout from 'components/WelcomeLayout'
import { addUser, setCurrentUser } from 'utils/manage/users'
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
const Header = styled.h2`
    margin-top: 1em;
    text-align:center;
`
const Input = styled.input`
    width:100%;
    border: 3px solid #aaa;
    padding:10px;
    border-radius:3px;
    outline:none;
    transition: .2s all;
    &:focus{
        border-color:${theme.colors.primary};
    }
`
const Switch = styled.button`
    background: ${props => props.active ? '#ddd !important' : '#fff'};
    padding:5px;
    border: none;
    box-shadow:none;
    color:black;
    padding:10px;
    border-radius:3px;
    outline:none;
    transition: .2s all;

    margin:10px;
    &:hover{
        background: #eee;
    }
`
const Switches = styled.div`
    margin-top:1em;
`
const Form = styled.form`
    width:75%;
    margin:auto;

    p{
        margin-top:2em;
    }
`
const BackButton = styled(Link)`
    color:#888;
    
`
const FinishButton = styled.button`
    border: 3px solid ${theme.colors.primary};
    padding:.5em 1em;
    background: ${theme.colors.primary};
    color:white;
    margin:1em;
    border-radius:3px;
    cursor:pointer;
`
const ErrorText = styled.p`
    background: ${theme.colors.tertiary};
    color:white;
    padding:10px;
    border-radius:3px;
`
export default class extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            schoolType: 'SP'
        }
    }
    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
            error:false
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        addUser(this.state.username.trim()).then(user => {
            setCurrentUser(this.state.username.trim()).then(() => {
                navigate('/dashboard')
            }) 
        }).catch(err => {
            this.setState({
                error:true
            })
        })
    
    }
    render(){
        return (
            <WelcomeLayout image={typewriterImage}>
                <Header>Potrzebujemy od Ciebie kilku informacji</Header>
                        <Form onSubmit={this.handleFormSubmit}>
                           
                            <Input placeholder="Nazwa użytkownika" onChange={this.handleUsernameChange} />
                            <Switches>
                                <label>Typ szkoły: </label>
                            <Switch
                            active={this.state.schoolType === 'SP'}
                            onClick={() => this.setState({schoolType: 'SP'})}>Szkoła podstawowa</Switch>
                            <Switch
                            active={this.state.schoolType === 'GIM'}
                            onClick={() => this.setState({schoolType: 'GIM'})}>Gimnazjum</Switch>
                            </Switches>
                            <p>Wszystkie z tych danych zapisujemy na twoim urządzeniu. Nie wysyłamy ich do zewnętrzych baz danych. </p>
                            {
                                this.state.error && <ErrorText>Użytkownik o podanej nazwie już jest zarejestrowany na tym urządzeniu</ErrorText>
                            }
                            <BackButton to="/welcome">Powrót</BackButton>
                            <FinishButton type="submit">Utwórz konto</FinishButton>
                        </Form>
               
            </WelcomeLayout>
           
        )
    }
}