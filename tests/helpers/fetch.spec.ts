import FormData from 'form-data'
import { fetch } from '../../src/helpers/fetch'

const mockFetch = jest.fn()
global.fetch = mockFetch

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mockNextNodeFetchCall(json: any) {
  mockFetch.mockImplementationOnce(async () => ({ json: async () => json }))
}

function getLastNodeFetchCall() {
  return mockFetch.mock.calls[0]
}

describe('helpers -> fetch', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  test('can make a fetch request using a form data body', async () => {
    mockNextNodeFetchCall({ success: true, response: { foo: 'bar' } })

    const response = await fetch('https://example.com', {
      method: 'POST',
      body: { baz: 42, ree: undefined },
    })
    expect(response).toMatchSnapshot()

    const request = getLastNodeFetchCall()
    expect(request[0]).toEqual('https://example.com')
    expect(request[1].method).toEqual('POST')
    expect(request[1].body).toBeInstanceOf(FormData)
  })
})
