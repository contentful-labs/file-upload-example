import { h, Component } from 'preact'

import { distanceInWordsToNow } from 'date-fns'
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
      const { file, title } = asset.fields
      const { createdAt } = asset.sys
      const localeFile = Object.keys(file)[0]
      const localeTitle = Object.keys(title)[0]
      const localizedTitle = title[localeTitle]
      const ext = /\.(.*)$/.exec(file[localeFile].fileName)[1]
      const formattedDate = distanceInWordsToNow(createdAt, { includeSeconds: true })
      const created = `created ${formattedDate} ago`

      let preview = (
        <div className={styles.fileIcon}>
          {ext}
        </div>
      )
      if (
        file[localeFile].contentType.indexOf('image') === 0 &&
        file[localeFile].hasOwnProperty('url')
      ) {
        const url = `${file[localeFile].url}?w=800&h=600&q=80&fm=jpg&fl=progressive&fit=fill`
        preview = <img src={url} alt={localizedTitle} />
      }
      return (
        <div key={asset.sys.id} className={styles.asset}>
          <div className={styles.label}>
            <div className={styles.labelContent}>
              <div className={styles.title}>
                {localizedTitle}
              </div>
              <div className={styles.created}>
                {created}
              </div>
            </div>
          </div>
          {preview}
        </div>
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
          <a className={styles.changeSpaceLink} href={'/'}>Change space</a>
          <h1>Your assets:</h1>
          <div className={styles.assets}>
            {assetsList}
          </div>
        </Dropzone>
      </div>
    )
  }
}
