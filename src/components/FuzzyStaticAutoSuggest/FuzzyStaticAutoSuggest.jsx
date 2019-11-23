import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'
import Autosuggest from 'react-autosuggest'

import { StyledWrapper } from './styled'
import Suggestion from './Suggestion'
import { graphql, StaticQuery } from 'gatsby'

class FuzzyStaticAutoSuggest extends React.Component {
  static propTypes = {
    initialSuggestions: PropTypes.array,
    valid: PropTypes.bool,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    theme: PropTypes.objectOf(PropTypes.string),
    placeholder: PropTypes.string,
    value: PropTypes.string,
    iconClassName: PropTypes.string,
    onSuggestionsClearRequested: PropTypes.func,
    onSuggestionSelected: PropTypes.func,
    onChange: PropTypes.func,
    otherOption: PropTypes.object,
    withIcon: PropTypes.bool,
    variant: PropTypes.string,
  }

  static defaultProps = {
    initialSuggestions: [],
    disabled: false,
    value: '',
    placeholder: '',
    // This is left for safety reasons. We add our own classes,
    // to be protected before accidentally override of our styles
    theme: {
      container: 'octopie-react-autosuggest__container',
      containerOpen: 'octopie-react-autosuggest__container--open',
      input: 'octopie-react-autosuggest__input',
      inputOpen: 'octopie-react-autosuggest__input--open',
      inputFocused: 'octopie-react-autosuggest__input--focused',
      inputWithError: 'octopie-react-autosuggest__input--error',
      suggestionsContainer: 'octopie-react-autosuggest__suggestions-container',
      suggestionsContainerOpen:
        'octopie-react-autosuggest__suggestions-container--open',
      suggestionsList: 'octopie-react-autosuggest__suggestions-list',
      suggestion: 'octopie-react-autosuggest__suggestion',
      suggestionFirst: 'octopie-react-autosuggest__suggestion--first',
      suggestionHighlighted:
        'octopie-react-autosuggest__suggestion--highlighted',
      sectionContainer: 'octopie-react-autosuggest__section-container',
      sectionContainerFirst:
        'octopie-react-autosuggest__section-container--first',
      sectionTitle: 'octopie-react-autosuggest__section-title',
      loader: 'octopie-react-autosuggest__loading-indicator',
      clear: 'octopie-react-autosuggest__clear',
      otherOption: 'octopie-react-autosuggest__other-option',
    },
    withIcon: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      results: props.data.allSchool.edges.map(({ node }) => node),
      suggestions: [],
      value: '',
    }

    this.Fuse = new Fuse(this.state.results, {
      keys: ['name.full', 'location.address.District'], // we are looking by key 'key' in suggestion array
      shouldSort: true,
      includeMatches: true,
      minMatchCharLength: 1,
    })
  }

  get isAnswered() {
    return Boolean(this.props.value)
  }

  // when it returns true each invocation of the 'on*' methods will run
  // onSuggestionFetchRequested method
  shouldRenderSuggestions = () => true

  // it is required due to enhancing of suggestion by fusejs
  getSuggestion = suggestion =>
    suggestion.item ? suggestion.item.name.full : suggestion

  getSuggestionValue = suggestion => this.getSuggestion(suggestion).toString()

  selectMatchingSuggestion = event => {
    const matchingSuggestion = this.state.suggestions.find(
      suggestion =>
        this.getSuggestionValue(suggestion).toLowerCase() ===
        event.target.value.toLowerCase()
    )

    if (matchingSuggestion) {
      this.onSuggestionSelected(event, { suggestion: matchingSuggestion })
    }
  }

  onBlur = this.selectMatchingSuggestion

  onKeyPress = event => {
    if (event.keyCode === 13) {
      this.selectMatchingSuggestion(event)
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })

    this.props.onChange(newValue)
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  onSuggestionSelected = (e, { suggestion }) => {
    this.props.onSuggestionSelected(this.getSuggestion(suggestion))
  }

  enhanceSuggestions = suggestions => {
    return !this.props.otherOption
      ? suggestions
      : [this.props.otherOption, ...suggestions]
  }

  onSuggestionsFetchRequested = ({ value, reason }) => {
    // if value is empty we want to show whole list of suggestion set
    if (!value) {
      this.setState({
        suggestions: this.enhanceSuggestions(this.props.initialSuggestions),
      })
      return
    }

    switch (reason) {
      case 'input-changed':
      case 'input-focused':
        this.setState({
          suggestions: this.enhanceSuggestions(this.Fuse.search(value)),
        })
        return
      default:
        return
    }
  }

  renderSuggestion = suggestion => {
    console.log(suggestion, 'suggestion')
    if (!(suggestion && suggestion.item)) return

    return <Suggestion matches={suggestion.matches} item={suggestion.item} />
  }

  renderInputActionPoint() {
    if (this.isAnswered) {
      // return (
      //   <CloseIcon
      //     className={this.props.theme.clear}
      //     onClick={e => {
      //       this.onChange(e, { newValue: '' })
      //     }}
      //   />
      // )
    }

    return null
  }

  renderInputComponent = inputProps => (
    <Fragment>
      {/*{this.props.withIcon && <CheckMarkIcon valid={this.props.valid} />}*/}
      <input {...inputProps} />
      {this.renderInputActionPoint()}
    </Fragment>
  )

  render() {
    return (
      <StyledWrapper
        error={this.props.error}
        variant={this.props.variant}
        withIcon={this.props.withIcon}
      >
        <Autosuggest
          getSuggestionValue={suggestion => this.getSuggestionValue(suggestion)}
          inputProps={{
            placeholder: this.props.placeholder,
            value: this.state.value,
            onFocus: () => {},
            onChange: this.onChange,
            onKeyPress: this.onKeyPress,
            onBlur: this.onBlur,
            disabled: this.props.disabled,
          }}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderInputComponent={this.renderInputComponent}
          renderSuggestion={this.renderSuggestion}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          suggestions={this.state.suggestions}
          theme={this.props.theme}
        />
      </StyledWrapper>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allSchool {
          edges {
            node {
              name {
                full
              }
              location {
                address {
                  District
                }
              }
            }
          }
        }
      }
    `}
    render={data => <FuzzyStaticAutoSuggest data={data} {...props} />}
  />
)
