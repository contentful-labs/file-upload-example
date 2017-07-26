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
      if (!asset.fields.hasOwnProperty('file')) {
        return null
      }
      const localeFile = Object.keys(asset.fields.file)[0]
      const localeTitle = Object.keys(asset.fields.title)[0]
      const title = asset.fields.title[localeTitle]
      const ext = /\.(.*)$/.exec(asset.fields.file[localeFile].fileName)[1]

      let preview = (
        <div className={styles.fileIcon}>
          {ext}
        </div>
      )
      if (
        asset.fields.file[localeFile].contentType.indexOf('image') === 0 &&
        asset.fields.file[localeFile].hasOwnProperty('url')
      ) {
        const url = `${asset.fields.file[localeFile].url}?w=800&h=600&q=80&fm=jpg&fl=progressive&fit=fill`
        preview = <img src={url} alt={title} />
      }
      return (
        <li key={asset.sys.id}>
          <h3>{title}</h3>
          {preview}
        </li>
      )
    })
    return (
      <div>
        <Dropzone
          disableClick
          onDrop={this._onDrop}
          className={styles.dropzone}
          activeClassName={styles.dropzoneActive}
        >
          <a className={styles.changeSpaceLink} href={`${APP_CONFIG.paths.webpackPublicPath}`}>Change space</a>
          <h1>Your assets:</h1>
          <ul className={styles.list}>
            {assetsList}
          </ul>
        </Dropzone>
      </div>
    )
  }
}
