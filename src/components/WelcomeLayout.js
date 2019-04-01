import React from 'react'
import styled from '@emotion/styled'
import Brand from 'components/Brand'

const WelcomeLayout = styled.div`
    width:100%;
    height:100%;
    
    display: grid;
    grid-template-columns: 1fr 1fr;
`
const ContentWrapper = styled.div`
margin-top:10vh;
    & > div{
        width:75%;
        margin:auto;
    }
    `
const ImageWrapper = styled.div`
    width:100%;
    margin-top:10vh;
    height:80vh;
    img{
        width:100%;
        height:100%;
        object-fit: cover;
        object-position:center center;
        border-top-left-radius:3px;
        border-bottom-left-radius:3px;
    } 
`
const StyledBrand = styled(Brand)`
    justify-content: center;
    font-size:2.5em;
`

export default props => (
    <WelcomeLayout>
        <ContentWrapper>
        <StyledBrand />
            <div>
                {props.children}
            </div>
        </ContentWrapper>
        <ImageWrapper>
            <img src={props.image} />
        </ImageWrapper>
    </WelcomeLayout>
   
)