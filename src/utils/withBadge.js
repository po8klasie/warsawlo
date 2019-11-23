import styled from '@emotion/styled'
import theme from 'utils/theme'

export const withBadge = (el, options) => {
  return styled(el)`
    position:relative;
    &::after{
      content:'${options && options.title && options.title}';
      position:absolute;
      top:-1em;
      right:-1em;
      display:block;
      background ${theme.colors[options && options.color ? options.color : 'primary']};
      color:white;
      // transform: rotate(10deg);
      // transform-origin: bottom right;
      letter-spacing:2px;
      font-size:.8em;
      border-radius:3px;
    }
  `
}
