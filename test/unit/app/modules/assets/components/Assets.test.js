import { h } from 'preact'
import render from 'preact-render-to-string'

import Assets from '../../../../../../src/app/modules/assets/components/Assets'

test('Assets - Empty', () => {
  const uploadMock = jest.fn()
  const html = render(<Assets assets={[]} uploadFiles={uploadMock} />)
  expect(html).toMatchSnapshot()
  expect(uploadMock.mock.calls).toHaveLength(0)
})

test('Assets - Filled', () => {
  const uploadMock = jest.fn()
  const assets = [
    {
      sys: {
        id: 'invalid asset - should be filtered'
      },
      fields: {}
    },
    {
      sys: {
        id: 'valid',
        createdAt: new Date()
      },
      fields: {
        title: {
          'en-US': 'totally valid asset'
        },
        file: {
          'en-US': {
            fileName: 'awesome-image.jpg',
            url: 'http://example.com/awesome-image.jpg',
            contentType: 'image/awesome-format'
          }
        }
      }
    }
  ]
  const html = render(<Assets assets={assets} uploadFiles={uploadMock} />)
  expect(html).toMatchSnapshot()
  expect(uploadMock.mock.calls).toHaveLength(0)
})
