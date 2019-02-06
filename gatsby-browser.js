/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import WebFont from 'webfontloader'
import wrapWithProvider from './wrap-with-provider'
import { anchorate } from 'anchorate'
export const wrapRootElement = wrapWithProvider

export const onInitialClientRender = () => {


    WebFont.load({
     google: {
       families: [
         'Work Sans:400:latin,latin-ext',
         'Playfair Display:400'
       ]
     },
     custom: {
       families: ['Ostrich Sans Rounded'],
       urls: ['https://cdn.jsdelivr.net/gh/theleagueof/ostrich-sans/webfonts/ostrich-sans.css']
   }})
 }

export const onRouteUpdate = () => anchorate({
  scroller: el => {
    if (!el) return false
    el.scrollIntoView({ behavior: 'smooth' })
    window.scrollBy({
  top: 70,
  behavior: 'smooth'
})
    return true
  }
})
