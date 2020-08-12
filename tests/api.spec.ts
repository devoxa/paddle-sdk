import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'
import { fetch } from '../src/helpers/fetch'
import { PaddleSdkApiException } from '../src/exceptions'

jest.mock('../src/helpers/fetch', () => ({ fetch: jest.fn() }))

function mockNextApiResponse(response: any) {
  ;(fetch as jest.Mock).mockImplementationOnce(async () => ({ success: true, response }))
}

function getLastApiRequest() {
  return (fetch as jest.Mock).mock.calls[0]
}

describe('webhooks -> api methods', () => {
  const paddleSdk = new PaddleSdk({
    publicKey: FIXTURES.publicKey,
    vendorId: FIXTURES.vendorId,
    vendorAuthCode: FIXTURES.vendorAuthCode,
    metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
  })

  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it('createProductPayLink', async () => {
    mockNextApiResponse(FIXTURES.createProductPayLinkApiResponse)

    const response = await paddleSdk.createProductPayLink({
      productId: 123,
      title: 'Product name',
      webhookUrl: 'https://webhook.devoxa.io',
      prices: [['USD', 9.99]],
      recurringPrices: [['EUR', 12.99]],
      trialDays: 14,
      customMessage: 'Custom message under the product name',
      populateCoupon: 'COUPON-AAA',
      isDiscountable: true,
      imageUrl: 'https://devoxa.io/image.png',
      returnUrl: 'https://devoxa.io/return',
      isQuantityVariable: true,
      populateQuantity: 9,
      expirationDate: new Date('2020-07-03'),
      affiliates: [123],
      recurringAffiliateLimit: 2,
      populateHasMarketingConsent: true,
      populateCustomerEmail: 'david@devoxa.io',
      populateCustomerCountry: 'DE',
      populateCustomerPostcode: '37688',
      populateVatNumber: '123456789',
      populateVatCompanyName: 'Devoxa',
      populateVatStreet: '4 Stonebridgegate',
      populateVatCity: 'Ripon',
      populateVatState: 'Yorkshire',
      populateVatCountry: 'GB',
      populateVatPostcode: 'HG4 1LH',
      metadata: { foo: 'bar' },
    })

    const request = getLastApiRequest()
    request[1].body.passthrough = request[1].body.passthrough.replace(/./gi, 'X')

    expect(response).toMatchSnapshot()
    expect(request).toMatchSnapshot()
  })

  it('listSubscriptions', async () => {
    mockNextApiResponse(FIXTURES.listSubscriptionsApiResponse)

    const response = await paddleSdk.listSubscriptions({
      subscriptionId: 123,
      productId: 123,
      status: 'CANCELLED',
      page: 0,
      resultsPerPage: 100,
    })

    expect(response).toMatchSnapshot()
    expect(getLastApiRequest()).toMatchSnapshot()
  })

  it('listSubscriptions no params', async () => {
    mockNextApiResponse(FIXTURES.listSubscriptionsApiResponse)

    await paddleSdk.listSubscriptions({})

    expect(getLastApiRequest()).toMatchSnapshot()
  })

  it('updateSubscription', async () => {
    mockNextApiResponse(FIXTURES.updateSubscriptionApiResponse)

    const response = await paddleSdk.updateSubscription({
      subscriptionId: 1,
      quantity: 9,
      currency: 'EUR',
      unitPrice: 9.99,
      shouldMakeImmediatePayment: false,
      productId: 3,
      shouldProrate: true,
      shouldKeepModifiers: true,
      metadata: { foo: 'bar' },
      shouldPause: true,
    })

    const request = getLastApiRequest()
    request[1].body.passthrough = request[1].body.passthrough.replace(/./gi, 'X')

    expect(response).toMatchSnapshot()
    expect(request).toMatchSnapshot()
  })

  it('cancelSubscription', async () => {
    mockNextApiResponse(FIXTURES.cancelSubscriptionApiResponse)

    const response = await paddleSdk.cancelSubscription({
      subscriptionId: 123,
    })

    expect(response).toMatchSnapshot()
    expect(getLastApiRequest()).toMatchSnapshot()
  })

  it('createSubscriptionModifier', async () => {
    mockNextApiResponse(FIXTURES.createSubscriptionModifierApiResponse)

    const response = await paddleSdk.createSubscriptionModifier({
      subscriptionId: 123,
      amount: 9.99,
      isRecurring: true,
      description: 'Extra sparkles',
    })

    expect(response).toMatchSnapshot()
    expect(getLastApiRequest()).toMatchSnapshot()
  })

  it('throw on error', async () => {
    ;(fetch as jest.Mock).mockImplementationOnce(async () => ({
      success: false,
      error: { message: 'Foo' },
    }))

    let error
    try {
      await paddleSdk.createProductPayLink({
        productId: 123,
      })
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(PaddleSdkApiException)
    expect(error).toMatchSnapshot()
  })
})
