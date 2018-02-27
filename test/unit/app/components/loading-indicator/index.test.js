import { h } from 'preact'
import render from 'preact-render-to-string'

import LoadingIndicator from '../../../../../src/app/components/loading-indicator/index'

test('LoadingIndicator', () => {
  const props = {
    message: 'Pretty busy loading'
  }
  const html = render(<LoadingIndicator {...props} />)
  expect(html).toMatchSnapshot()
})
