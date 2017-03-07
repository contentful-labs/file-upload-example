import { h, Component } from 'preact'
import proptypes from 'proptypes'

import contentfulLogo from 'assets/images/contentful.svg'
import styles from './Login.css'

export default class Login extends Component {
  static propTypes = {
    accessToken: proptypes.string.isRequired,
    spaceId: proptypes.string.isRequired,
    host: proptypes.string.isRequired,
    hostUpload: proptypes.string.isRequired,
    setAccessToken: proptypes.func.isRequired,
    setHost: proptypes.func.isRequired,
    setHostUpload: proptypes.func.isRequired,
    setSpaceId: proptypes.func.isRequired,
    initClient: proptypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this._onAccessTokenChange = this._onAccessTokenChange.bind(this)
    this._onHostChange = this._onHostChange.bind(this)
    this._onHostUploadChange = this._onHostUploadChange.bind(this)
    this._onSpaceIdChange = this._onSpaceIdChange.bind(this)
    this._onFormSubmit = this._onFormSubmit.bind(this)
  }
  _onAccessTokenChange (e) {
    this.props.setAccessToken(e.target.value.trim())
  }
  _onHostChange (e) {
    this.props.setHost(e.target.value.trim())
  }
  _onHostUploadChange (e) {
    this.props.setHostUpload(e.target.value.trim())
  }
  _onSpaceIdChange (e) {
    this.props.setSpaceId(e.target.value.trim())
  }
  _onFormSubmit () {
    this.props.initClient()
  }
  render ({ accessToken, spaceId, host, hostUpload }) {
    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <img src={contentfulLogo} alt='Contentful' />
            <h1>Direct File Upload Example</h1>
          </div>
          <div className={styles.group}>
            <label htmlFor='access-token'>Access Token:</label>
            <input
              id='access-token'
              type='text'
              value={accessToken}
              onChange={this._onAccessTokenChange} />
          </div>
          <div className={styles.group}>
            <label htmlFor='space-id'>Space ID:</label>
            <input
              id='space-id'
              type='text'
              value={spaceId}
              onChange={this._onSpaceIdChange} />
          </div>
          <div className={styles.group}>
            <label htmlFor='host'>Host :</label>
            <input
              id='host'
              type='text'
              value={host}
              onChange={this._onHostChange} />
          </div>
          <div className={styles.group}>
            <label htmlFor='hostUpload'>Upload Host :</label>
            <input
              id='hostUpload'
              type='text'
              value={hostUpload}
              onChange={this._onHostUploadChange} />
          </div>
          <div className={styles.group}>
            <input type='button' onClick={this._onFormSubmit} value='Connect' />
          </div>
        </div>
      </div>
    )
  }
}
