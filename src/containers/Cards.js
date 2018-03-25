import { connect } from 'react-redux'

import Cards from '../components/Cards'
import * as actionCreators from '../redux/modules/cards'

const createActionDispatchers = actionCreators => dispatch =>
  Object.keys(actionCreators).reduce((actionDispatchers, name) => {
    let actionCreator = actionCreators[name]
    if (typeof actionCreator == 'function') {
      actionDispatchers[name] = (...args) => dispatch(actionCreator(...args))
    }
    return actionDispatchers
  }, {})

const mapStateToProps = state => ({
  cardsState: state.cards, // gives our component access to state through props.cardsState
})
const mapDispatchToProps = createActionDispatchers(actionCreators)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)
