import { connect } from 'preact-redux'

import { selectAccessToken, selectSpaceId } from 'store/contentful/selectors'
import { setAccessToken, setSpaceId, INIT_CLIENT } from 'store/contentful/actions'

import Login from './components/Login'

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: selectAccessToken(state),
    spaceId: selectSpaceId(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAccessToken: (accessToken) => {
      dispatch(setAccessToken({
        accessToken
      }))
    },
    setSpaceId: (spaceId) => {
      dispatch(setSpaceId({
        spaceId
      }))
    },
    initClient: () => {
      dispatch(INIT_CLIENT.request())
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
