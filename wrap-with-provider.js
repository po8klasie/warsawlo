import React from 'react'
// import { Provider } from 'react-redux'
// import createStore from './src/state/createStore'
// const store = createStore()
import { Global } from '@emotion/core'
import css from '@emotion/css'
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
       body{
         padding-top:80px;
       }
       #___gatsby{

         height:100%;
         & > div{
           height:100%;
         }
       }
       `}
   />
  {element}
</>
)
