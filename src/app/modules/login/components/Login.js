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
    setEnvironment: proptypes.func.isRequired,
    setHost: proptypes.func.isRequired,
    setHostUpload: proptypes.func.isRequired,
    setSpaceId: proptypes.func.isRequired,
    initClient: proptypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this._onAccessTokenChange = this._onAccessTokenChange.bind(this)
    this._onEnvironmentChange = this._onEnvironmentChange.bind(this)
    this._onHostChange = this._onHostChange.bind(this)
    this._onHostUploadChange = this._onHostUploadChange.bind(this)
    this._onSpaceIdChange = this._onSpaceIdChange.bind(this)
    this._onFormSubmit = this._onFormSubmit.bind(this)

    this.state = {
      hidden: true
    }
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
  _onEnvironmentChange (e) {
    this.props.setEnvironment(e.target.value.trim())
  }
  _onFormSubmit () {
    this.props.initClient()
  }
  render ({ accessToken, spaceId, environment, host, hostUpload }) {
    return (
      <div>
        <form className={styles.wrapper} onSubmit={this._onFormSubmit}>
          <div className={styles.header}>
            <img src={contentfulLogo} alt='Contentful' />
            <h1>Direct File Upload Example</h1>
            <p>
              This is an example showing how to upload files directly to the <a href='https://www.contentful.com'>Contentful headless CMS</a>.
              To start using it you need to create an account and enter your Content Management API credentials later on.
            </p>
            <p>
              This example uses Preact, Redux and Redux Saga.
              The source code is open source and you can find it on <a href='https://github.com/contentful-labs/file-upload-example'>GitHub</a>.
            </p>
          </div>
          <div className={styles.group}>
            <label htmlFor='access-token'>Access Token:</label>
            <input
              id='access-token'
              type='text'
              required
              value={accessToken}
              onChange={this._onAccessTokenChange} />
          </div>
          <div className={styles.group}>
            <label htmlFor='space-id'>Space ID:</label>
            <input
              id='space-id'
              type='text'
              required
              value={spaceId}
              onChange={this._onSpaceIdChange} />
          </div>
          <div className={styles.group}>
            <label htmlFor='environment'>Environment:</label>
            <input
              id='environment'
              type='text'
              required
              value={environment}
              onChange={this._onEnvironmentChange} />
          </div>
          { !this.state.hidden
            ? (
              <div>
                <div className={styles.group}>
                  <label htmlFor='host'>Host :</label>
                  <input
                    id='host'
                    type='text'
                    value={host}
                    required
                    onChange={this._onHostChange} />
                </div>
                <div className={styles.group}>
                  <label htmlFor='hostUpload'>Upload Host :</label>
                  <input
                    id='hostUpload'
                    type='text'
                    required
                    value={hostUpload}
                    onChange={this._onHostUploadChange} />
                </div>
              </div>
            ) : (
              <div className={styles.reveal}>
                <span onClick={() => this.setState({
                  hidden: false
                })}>Change host</span>
              </div>
            ) }
          <div className={styles.group}>
            <input type='submit' value='Connect' />
          </div>
        </form>
      </div>
    )
  }
}
