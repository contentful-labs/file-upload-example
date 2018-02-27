import { h } from 'preact'
import render from 'preact-render-to-string'

import Login from '../../../../../../src/app/modules/login/components/Login'

test('Login', () => {
  const props = {
    accessToken: 'accessToken',
    spaceId: 'spaceId',
    host: 'host',
    hostUpload: 'hostUpload',
    setAccessToken: jest.fn(),
    setHost: jest.fn(),
    setHostUpload: jest.fn(),
    setSpaceId: jest.fn(),
    initClient: jest.fn()
  }
  const html = render(<Login {...props} />)
  expect(html).toMatchSnapshot()
  expect(props.setAccessToken.mock.calls).toHaveLength(0)
  expect(props.setHost.mock.calls).toHaveLength(0)
  expect(props.setHostUpload.mock.calls).toHaveLength(0)
  expect(props.setSpaceId.mock.calls).toHaveLength(0)
  expect(props.initClient.mock.calls).toHaveLength(0)
})
