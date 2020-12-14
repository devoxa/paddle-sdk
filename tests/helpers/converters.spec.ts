import * as converters from '../../src/helpers/converters'
import { PaddleSdkSubscriptionStatus, PaddleSdkCurrency } from '../../src'

describe('helpers -> converters', () => {
  it('can convert an API integer', () => {
    expect(converters.convertApiInteger('12')).toEqual(12)
  })

  it('can convert an API float', () => {
    expect(converters.convertApiFloat('12')).toEqual(12)
    expect(converters.convertApiFloat('12.99')).toEqual(12.99)
  })

  it('can convert an API boolean', () => {
    expect(converters.convertApiBoolean('1')).toEqual(true)
    expect(converters.convertApiBoolean('0')).toEqual(false)
    expect(converters.convertApiBoolean('true')).toEqual(true)
    expect(converters.convertApiBoolean('false')).toEqual(false)
  })

  it('can convert an SDK boolean', () => {
    expect(converters.convertSdkBoolean(true)).toEqual(1)
    expect(converters.convertSdkBoolean(false)).toEqual(0)
  })

  it('can convert an API date', () => {
    expect(converters.convertApiDate('2020-09-21', 'DATE')).toEqual(
      new Date('2020-09-21T00:00:00.000Z')
    )
    expect(converters.convertApiDate('2020-09-21 21:32:10', 'DATE_TIME')).toEqual(
      new Date('2020-09-21T21:32:10.000Z')
    )
    expect(converters.convertApiDate('09/2022', 'EXPIRY_DATE')).toEqual(
      new Date('2022-09-01T00:00:00.000Z')
    )
  })

  it('can convert an SDK date', () => {
    expect(converters.convertSdkDate(new Date('2020-09-21T00:00:00.000Z'), 'DATE')).toEqual(
      '2020-09-21'
    )
    expect(converters.convertSdkDate(new Date('2020-09-21T21:32:10.000Z'), 'DATE_TIME')).toEqual(
      '2020-09-21 21:32:10'
    )
    expect(converters.convertSdkDate(new Date('2022-09-01T00:00:00.000Z'), 'EXPIRY_DATE')).toEqual(
      '09/2022'
    )
  })

  it('can convert an API subscription status', () => {
    expect(converters.convertApiSubscriptionStatus('active')).toEqual('ACTIVE')
    expect(converters.convertApiSubscriptionStatus('trialing')).toEqual('TRIALING')
    expect(converters.convertApiSubscriptionStatus('past_due')).toEqual('PAST_DUE')
    expect(converters.convertApiSubscriptionStatus('paused')).toEqual('PAUSED')
    expect(converters.convertApiSubscriptionStatus('deleted')).toEqual('CANCELLED')
  })

  it('can convert an SDK subscription status', () => {
    expect(converters.convertSdkSubscriptionStatus(PaddleSdkSubscriptionStatus.ACTIVE)).toEqual(
      'active'
    )
    expect(converters.convertSdkSubscriptionStatus(PaddleSdkSubscriptionStatus.TRIALING)).toEqual(
      'trialing'
    )
    expect(converters.convertSdkSubscriptionStatus(PaddleSdkSubscriptionStatus.PAST_DUE)).toEqual(
      'past_due'
    )
    expect(converters.convertSdkSubscriptionStatus(PaddleSdkSubscriptionStatus.PAUSED)).toEqual(
      'paused'
    )
    expect(converters.convertSdkSubscriptionStatus(PaddleSdkSubscriptionStatus.CANCELLED)).toEqual(
      'deleted'
    )
  })

  it('can convert an API paused reason', () => {
    expect(converters.convertApiPausedReason('delinquent')).toEqual('DELINQUENT')
    expect(converters.convertApiPausedReason('voluntary')).toEqual('VOLUNTARY')
  })

  it('can convert an API currency', () => {
    expect(converters.convertApiCurrency('EUR')).toEqual('EUR')

    // @ts-expect-error types have no overlap
    converters.convertApiCurrency('EUR') === 'NOOP'
  })

  it('can convert an API country', () => {
    expect(converters.convertApiCountry('GB')).toEqual('GB')

    // @ts-expect-error types have no overlap
    converters.convertApiCurrency('GB') === 'NOOP'
  })

  it('can convert an API payment method', () => {
    expect(converters.convertApiPaymentMethod('card')).toEqual('CARD')
    expect(converters.convertApiPaymentMethod('paypal')).toEqual('PAYPAL')
    expect(converters.convertApiPaymentMethod('apple-pay')).toEqual('APPLE_PAY')
    expect(converters.convertApiPaymentMethod('wire-transfer')).toEqual('WIRE_TRANSFER')
    expect(converters.convertApiPaymentMethod('free')).toEqual('FREE')
  })

  it('can convert an API card type', () => {
    expect(converters.convertApiCardBrand('visa')).toEqual('VISA')
    expect(converters.convertApiCardBrand('american_express')).toEqual('AMERICAN_EXPRESS')
    expect(converters.convertApiCardBrand('discover')).toEqual('DISCOVER')
    expect(converters.convertApiCardBrand('jcb')).toEqual('JCB')
    expect(converters.convertApiCardBrand('elo')).toEqual('ELO')
    expect(converters.convertApiCardBrand('master')).toEqual('MASTERCARD')
    expect(converters.convertApiCardBrand('mastercard')).toEqual('MASTERCARD')
    expect(converters.convertApiCardBrand('maestro')).toEqual('MAESTRO')
    expect(converters.convertApiCardBrand('diners_club')).toEqual('DINERS_CLUB')
    expect(converters.convertApiCardBrand('xxx')).toEqual('UNKNOWN')
  })

  it('can convert an SDK price list', () => {
    expect(
      converters.convertSdkPriceList([
        [PaddleSdkCurrency.EUR, 7.99],
        [PaddleSdkCurrency.USD, 9.99],
      ])
    ).toEqual(['EUR:7.99', 'USD:9.99'])
  })
})
