import { PaddleSdkApiException } from '../src/exceptions'
import { fetch } from '../src/helpers/fetch'
import {
  PaddleSdk,
  PaddleSdkCountry,
  PaddleSdkCurrency,
  PaddleSdkSubscriptionStatus,
} from '../src/index'
import { encryptMetadata, stringifyMetadata } from '../src/metadata'
import * as FIXTURES from './fixtures'

jest.mock('../src/helpers/fetch', () => ({ fetch: jest.fn() }))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mockNextApiResponse(response: any) {
  ;(fetch as jest.Mock).mockImplementationOnce(async () => ({ success: true, response }))
}

function getLastApiRequest() {
  return (fetch as jest.Mock).mock.calls[0]
}

describe('api requests', () => {
  const paddleSdk = new PaddleSdk({
    publicKey: FIXTURES.publicKey,
    vendorId: FIXTURES.vendorId,
    vendorAuthCode: FIXTURES.vendorAuthCode,
    metadataCodec: encryptMetadata(stringifyMetadata(), FIXTURES.metadataEncryptionKey),
  })

  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  test('can create a product pay link', async () => {
    mockNextApiResponse(FIXTURES.createProductPayLinkApiResponse)

    const response = await paddleSdk.createProductPayLink({
      productId: 123,
      title: 'Product name',
      webhookUrl: 'https://webhook.devoxa.io',
      prices: [[PaddleSdkCurrency.USD, 9.99]],
      recurringPrices: [[PaddleSdkCurrency.EUR, 12.99]],
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
      populateCustomerCountry: PaddleSdkCountry.DE,
      populateCustomerPostcode: '37688',
      populateVatNumber: '123456789',
      populateVatCompanyName: 'Devoxa',
      populateVatStreet: '4 Stonebridgegate',
      populateVatCity: 'Ripon',
      populateVatState: 'Yorkshire',
      populateVatCountry: PaddleSdkCountry.GB,
      populateVatPostcode: 'HG4 1LH',
      metadata: { foo: 'bar' },
    })

    expect(response).toMatchSnapshot()

    const request = getLastApiRequest()
    request[1].body.passthrough = request[1].body.passthrough.replace(/./gi, 'X')
    expect(request).toMatchSnapshot()
  })

  test('can list the subscriptions with filters', async () => {
    mockNextApiResponse(FIXTURES.listSubscriptionsApiResponse)

    const response = await paddleSdk.listSubscriptions({
      subscriptionId: 123,
      productId: 123,
      status: PaddleSdkSubscriptionStatus.CANCELLED,
      page: 0,
      resultsPerPage: 100,
    })

    expect(response).toMatchSnapshot()
    expect(getLastApiRequest()).toMatchSnapshot()
  })

  test('can list the subscriptions with no filters', async () => {
    mockNextApiResponse(FIXTURES.listSubscriptionsApiResponse)

    await paddleSdk.listSubscriptions({})

    expect(getLastApiRequest()).toMatchSnapshot()
  })

  test('errors if the payment method is not known', async () => {
    const fixture = FIXTURES.listSubscriptionsApiResponse
    fixture[0].payment_information.payment_method = 'foobar' as 'paypal'

    mockNextApiResponse(fixture)

    let error
    try {
      await paddleSdk.listSubscriptions({})
    } catch (err) {
      error = err
    }

    expect(error).toMatchSnapshot()
  })

  test('can update a subscription (all fields)', async () => {
    mockNextApiResponse(FIXTURES.updateSubscriptionApiResponse)

    const response = await paddleSdk.updateSubscription({
      subscriptionId: 1,
      quantity: 9,
      currency: PaddleSdkCurrency.EUR,
      unitPrice: 9.99,
      shouldMakeImmediatePayment: false,
      productId: 3,
      shouldProrate: true,
      shouldKeepModifiers: true,
      metadata: { foo: 'bar' },
      shouldPause: true,
    })

    expect(response).toMatchSnapshot()

    const request = getLastApiRequest()
    request[1].body.passthrough = request[1].body.passthrough.replace(/./gi, 'X')
    expect(request).toMatchSnapshot()
  })

  test('can update a subscription (single field)', async () => {
    mockNextApiResponse(FIXTURES.updateSubscriptionApiResponse)

    const response = await paddleSdk.updateSubscription({
      subscriptionId: 1,
      shouldPause: true,
    })

    expect(response).toMatchSnapshot()
    expect(getLastApiRequest()).toMatchSnapshot()
  })

  test('can cancel a subscription', async () => {
    mockNextApiResponse(FIXTURES.cancelSubscriptionApiResponse)

    const response = await paddleSdk.cancelSubscription({
      subscriptionId: 123,
    })

    expect(response).toMatchSnapshot()
    expect(getLastApiRequest()).toMatchSnapshot()
  })

  test('can create a subscription modifier', async () => {
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

  test('throws on API failure', async () => {
    ;(fetch as jest.Mock).mockImplementationOnce(async () => ({
      success: false,
      error: { message: 'Foo' },
    }))

    let error
    try {
      await paddleSdk.createProductPayLink({ productId: 123 })
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(PaddleSdkApiException)
    expect(error).toMatchSnapshot()
  })
})
