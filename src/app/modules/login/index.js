import { connect } from 'preact-redux'

import { selectAccessToken, selectSpaceId, selectEnvironment, selectHost, selectHostUpload } from 'store/contentful/selectors'
import { setAccessToken, setSpaceId, setEnvironment, setHost, setHostUpload, INIT_CLIENT } from 'store/contentful/actions'

import Login from './components/Login'

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: selectAccessToken(state),
    spaceId: selectSpaceId(state),
    environment: selectEnvironment(state),
    host: selectHost(state),
    hostUpload: selectHostUpload(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAccessToken: (accessToken) => {
      dispatch(setAccessToken({
        accessToken
      }))
    },
    setHost: (host) => {
      dispatch(setHost({
        host
      }))
    },
    setHostUpload: (hostUpload) => {
      dispatch(setHostUpload({
        hostUpload
      }))
    },
    setSpaceId: (spaceId) => {
      dispatch(setSpaceId({
        spaceId
      }))
    },
    setEnvironment: (environment) => {
      dispatch(setEnvironment({
        environment
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
