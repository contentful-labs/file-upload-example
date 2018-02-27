import { h } from 'preact'
import render from 'preact-render-to-string'

import Busy from '../../../../../../src/app/components/busy/components/Busy'

test('Busy - is busy', () => {
  const html = render(<Busy isBusy message={'doing some heavy lifting over here'} />)
  expect(html).toMatchSnapshot()
})

test('Busy - not busy', () => {
  const html = render(<Busy isBusy={false} />)
  expect(html).toMatchSnapshot()
})
