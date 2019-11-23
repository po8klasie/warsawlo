import styled from '@emotion/styled'

export const StyledWrapper = styled.div`
  .octopie-react-autosuggest__container {
    width: 100%;
    position: relative;
    margin-top: 0px;
  }

  .octopie-react-autosuggest__input {
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #333;
    border-radius: 3px;
    padding: 12px 10px;
    line-height: 1.2;
    height: auto;
    font-family: inherit;
    color: inherit;
  
    &:hover {
      border: 1px solid ;
    }
    
    &:focus,
    &:active {
      border: focus;
      outline: none;
    }
  
    &::placeholder {
      color: greyPlaceholder !important;
    }

  ${props =>
    props.error
      ? `
          border-color: error !important;

          &:focus,
          &:active,
          &:hover {
            border-color: error !important;
          }
        `
      : ''}

  ${props =>
    props.withIcon
      ? `
          padding-left: inputL !important;
        `
      : ''}
  }

  .octopie-react-autosuggest__suggestion {
    font-size: 16px;
    padding: 5px 10px;
    padding-bottom: 0px;
    line-height: base;
    cursor: pointer;
    margin: 0;
    
    &--highlighted {
      background-color: accent;
      color: #222;
      
      div {
        background: #f0f0f0;
      }
    }
  }

  .octopie-react-autosuggest__suggestions-container--open {
    background-color: white;
    border-radius: 3px;
    border: base;
    margin-left: 0px;
    display: block;
    width: 100%;
    position: absolute;
    margin-top: 3px;
    z-index: 2;
    box-shadow: {th('shadows.l')};
    max-height: 300px;
    overflow-y: auto;
  }

  .octopie-react-autosuggest__suggestions-list {
    list-style: none;
    margin: 0px;
    padding: 5px 0px;
  }

  .octopie-react-autosuggest__clear {
    top: calc(50% - 5px);
    right: 12px;
    left: auto;
    width: 10px;
    height: 10px;
    font-size: 10px;
    position: absolute !important;
    transform: translateY(-50%);
    color: greyDarker;
    padding: 0px;
    margin: 0px;

    &:before {
      content: '\\E26B' !important;
    }
  }
})}
`
