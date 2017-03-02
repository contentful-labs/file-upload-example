import { h, Component } from 'preact'
import proptypes from 'proptypes'

import styles from './Assets.css'

export default class Assets extends Component {
  static propTypes = {
    assets: proptypes.array.isRequired
  }
  render ({ assets }) {
    const assetsList = assets.map((asset) => (
      <li key={asset.sys.id}>
        <code>{JSON.stringify(asset, null, 2)}</code>
      </li>
    ))
    return (
      <div>
        <h1>Your assets:</h1>
        <ul className={styles.wrapper}>
          {assetsList}
        </ul>
      </div>
    )
  }
}
