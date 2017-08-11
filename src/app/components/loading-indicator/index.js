import { h, Component } from 'preact'
import proptypes from 'proptypes'

import styles from './Loading-indicator.css'

import logo from 'assets/images/contentful-logo-only.svg'

export default class Busy extends Component {
  static propTypes = {
    message: proptypes.string
  }
  render ({ message }) {
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
