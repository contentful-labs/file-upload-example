import { h, Component } from 'preact'
import proptypes from 'proptypes'

import styles from './Busy.css'

import logo from 'assets/images/contentful-logo-only.svg'

export default class Busy extends Component {
  static propTypes = {
    isBusy: proptypes.bool.isRequired,
    message: proptypes.string
  }
  render ({ isBusy, message }) {
    if (!isBusy) {
      return null
    }
    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.logo}>
              <img src={logo} alt='Contentful' />
            </div>
            <div className={styles.message}>
              {message}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
