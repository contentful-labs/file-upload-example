import { h, Component } from 'preact'
import proptypes from 'proptypes'
import Dropzone from 'react-dropzone'

import styles from './Assets.css'

export default class Assets extends Component {
  static propTypes = {
    assets: proptypes.array.isRequired,
    uploadFiles: proptypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this._onDrop = this._onDrop.bind(this)
  }
  _onDrop (files) {
    this.props.uploadFiles(files)
  }
  render ({ assets }) {
    const assetsList = assets.map((asset) => {
      const localeFile = Object.keys(asset.fields.file)[0]
      const localeTitle = Object.keys(asset.fields.title)[0]
      const title = asset.fields.title[localeTitle]
      const url = asset.fields.file[localeFile].url
      return (
        <li key={asset.sys.id}>
          <h3>{title}</h3>
          <img src={url} alt={title} />
        </li>
      )
    })
    return (
      <div>
        <Dropzone
          disableClick
          onDrop={this._onDrop}
          className={styles.dropzone}
          activeClassName={styles.dropzoneActive} >
          <h1>Your assets:</h1>
          <ul className={styles.wrapper}>
            {assetsList}
          </ul>
        </Dropzone>
      </div>
    )
  }
}
