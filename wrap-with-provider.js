import React from 'react'
// import { Provider } from 'react-redux'
// import createStore from './src/state/createStore'
// const store = createStore()
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import css from '@emotion/css'
import theme from './src/theme'
// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) =>(
  <>
  <Global
     styles={css`
       html, body{
         margin:0;
         padding:0;
         width:100%;
         height:100%;
       }
       `}
   />
  <ThemeProvider theme={theme}>
  {element}
</ThemeProvider>
</>
)
