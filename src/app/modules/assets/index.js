import { connect } from 'preact-redux'

import { selectAssets } from 'store/contentful/selectors'
import { UPLOAD_FILES } from 'store/contentful/actions'

import Assets from './components/Assets'

const mapStateToProps = (state, ownProps) => {
  return {
    assets: selectAssets(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    uploadFiles: (files) => {
      dispatch(UPLOAD_FILES.request({files}))
    }
  }
}

const AssetsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Assets)

export default AssetsContainer
