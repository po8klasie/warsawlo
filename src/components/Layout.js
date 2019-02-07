/** @jsx jsx*/
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'
import css from '@emotion/css'
import Navbar from 'components/Navbar'
const Layout = ({ children, location }) => (
  <>
  <Navbar location={location} />
  {children}
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
