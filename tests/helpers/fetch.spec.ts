import { fetch } from '../../src/helpers/fetch'
import FormData from 'form-data'
import nodeFetch from 'node-fetch'

jest.mock('node-fetch', () => jest.fn())

function mockNextApiResponse(json: any) {
  ;((nodeFetch as unknown) as jest.Mock).mockImplementationOnce(async () => ({
    json: async () => json,
  }))
}

function getLastApiRequest() {
  return ((nodeFetch as unknown) as jest.Mock).mock.calls[0]
}

describe('fetch', () => {
  beforeEach(() => {
    ;((nodeFetch as unknown) as jest.Mock).mockClear()
  })

  it('runs fetch using form data', async () => {
    mockNextApiResponse({ success: true, response: { foo: 'bar' } })

    const response = await fetch('https://example.com', { method: 'POST', body: { baz: 42 } })
    expect(response).toMatchSnapshot()

    const request = getLastApiRequest()
    expect(request[0]).toEqual('https://example.com')
    expect(request[1].method).toEqual('POST')
    expect(request[1].body).toBeInstanceOf(FormData)
  })
})
