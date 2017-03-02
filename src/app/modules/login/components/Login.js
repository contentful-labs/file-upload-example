import { h, Component } from 'preact'
import proptypes from 'proptypes'

import styles from './Login.css'

export default class Login extends Component {
  static propTypes = {
    accessToken: proptypes.string.isRequired,
    spaceId: proptypes.string.isRequired,
    setAccessToken: proptypes.func.isRequired,
    setSpaceId: proptypes.func.isRequired,
    initClient: proptypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this._onAccessTokenChange = this._onAccessTokenChange.bind(this)
    this._onSpaceIdChance = this._onSpaceIdChance.bind(this)
    this._onFormSubmit = this._onFormSubmit.bind(this)
  }
  _onAccessTokenChange (e) {
    this.props.setAccessToken(e.target.value.trim())
  }
  _onSpaceIdChance (e) {
    this.props.setSpaceId(e.target.value.trim())
  }
  _onFormSubmit () {
    this.props.initClient()
  }
  render ({ accessToken, spaceId }) {
    return (
      <div>
        <div className={styles.wrapper}>
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
              onChange={this._onSpaceIdChance} />
          </div>
          <div className={styles.group}>
            <input type='button' onClick={this._onFormSubmit} value='Connect' />
          </div>
        </div>
      </div>
    )
  }
}
