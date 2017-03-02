import { connect } from 'preact-redux'

import { selectAssets } from 'store/contentful/selectors'

import Assets from './components/Assets'

const mapStateToProps = (state, ownProps) => {
  return {
    assets: selectAssets(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const AssetsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Assets)

export default AssetsContainer
