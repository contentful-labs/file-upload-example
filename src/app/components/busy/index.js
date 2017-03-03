import { connect } from 'preact-redux'

import { selectBusyState, selectBusyMessage } from 'store/busy/selectors'

import Busy from './components/Busy'

const mapStateToProps = (state, ownProps) => {
  return {
    isBusy: selectBusyState(state),
    message: selectBusyMessage(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const BusyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Busy)

export default BusyContainer
