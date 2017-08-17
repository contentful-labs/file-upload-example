import { h, Component } from 'preact'
import proptypes from 'proptypes'

import LoadingIndicator from 'components/loading-indicator'

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
        <LoadingIndicator message />
      </div>
    )
  }
}
