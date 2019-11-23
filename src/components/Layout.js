/** @jsx jsx*/
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import css from '@emotion/css'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import styled from '@emotion/styled'

const LayoutWrapper = styled('div')`
display: flex;
flex-direction: column;
height:100%;
`
const ContentWrapper = styled('div')`
flex: 1 0 auto;
`
const FooterWrapper = styled('div')`
flex-shrink: 0;
`
const Layout = ({ children, location }) => (
  <LayoutWrapper>
    <Navbar location={location}/>
    <ContentWrapper>
      {children}
    </ContentWrapper>
    <FooterWrapper>
      <Footer location={location}/>
    </FooterWrapper>
  </LayoutWrapper>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
