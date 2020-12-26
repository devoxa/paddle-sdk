import {
  RawPaddleSubscriptionCreatedAlert,
  RawPaddleSubscriptionUpdatedAlert,
  RawPaddleSubscriptionPaymentSucceededAlert,
  RawPaddlePaymentRefundedAlert,
} from '../__generated__/webhook-alerts'
import {
  PaddleSdkSubscriptionStatus,
  PaddleSdkPausedReason,
  PaddleSdkPaymentMethod,
  PaddleSdkCurrency,
  PaddleSdkCountry,
  PaddleSdkCardBrand,
  PaddleSdkRefundType,
} from '../interfaces'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export function convertApiInteger(integerString: string): number {
  return parseInt(integerString, 10)
}

export function convertApiFloat(floatString: string): number {
  return parseFloat(floatString)
}

export function convertApiBoolean(booleanString: '0' | '1' | 'false' | 'true'): boolean {
  return booleanString === '1' || booleanString === 'true'
}

export function convertSdkBoolean(boolean: boolean): 0 | 1 {
  return boolean ? 1 : 0
}

export function convertApiDate(
  dateString: string,
  type: 'DATE' | 'DATE_TIME' | 'EXPIRY_DATE'
): Date {
  switch (type) {
    case 'DATE':
      return dayjs.utc(dateString, 'YYYY-MM-DD').toDate()
    case 'DATE_TIME':
      return dayjs.utc(dateString, 'YYYY-MM-DD HH:mm:ss').toDate()
    case 'EXPIRY_DATE':
      return dayjs.utc(dateString, 'MM/YYYY').toDate()
  }
}

export function convertSdkDate(date: Date, type: 'DATE' | 'DATE_TIME' | 'EXPIRY_DATE'): string {
  switch (type) {
    case 'DATE':
      return dayjs.utc(date).format('YYYY-MM-DD')
    case 'DATE_TIME':
      return dayjs.utc(date).format('YYYY-MM-DD HH:mm:ss')
    case 'EXPIRY_DATE':
      return dayjs.utc(date).format('MM/YYYY')
  }
}

export function convertApiSubscriptionStatus(
  subscriptionStatus: RawPaddleSubscriptionCreatedAlert['status']
): PaddleSdkSubscriptionStatus {
  switch (subscriptionStatus) {
    case 'active':
      return PaddleSdkSubscriptionStatus.ACTIVE
    case 'trialing':
      return PaddleSdkSubscriptionStatus.TRIALING
    case 'past_due':
      return PaddleSdkSubscriptionStatus.PAST_DUE
    case 'paused':
      return PaddleSdkSubscriptionStatus.PAUSED
    case 'deleted':
      return PaddleSdkSubscriptionStatus.CANCELLED
  }
}

export function convertSdkSubscriptionStatus(
  subscriptionStatus: PaddleSdkSubscriptionStatus
): RawPaddleSubscriptionCreatedAlert['status'] {
  switch (subscriptionStatus) {
    case PaddleSdkSubscriptionStatus.ACTIVE:
      return 'active'
    case PaddleSdkSubscriptionStatus.TRIALING:
      return 'trialing'
    case PaddleSdkSubscriptionStatus.PAST_DUE:
      return 'past_due'
    case PaddleSdkSubscriptionStatus.PAUSED:
      return 'paused'
    case PaddleSdkSubscriptionStatus.CANCELLED:
      return 'deleted'
  }
}

export function convertApiPausedReason(
  pausedReason: Exclude<RawPaddleSubscriptionUpdatedAlert['paused_reason'], undefined>
): PaddleSdkPausedReason {
  switch (pausedReason) {
    case 'delinquent':
      return PaddleSdkPausedReason.DELINQUENT
    case 'voluntary':
      return PaddleSdkPausedReason.VOLUNTARY
  }
}

export function convertApiCurrency(currency: string): PaddleSdkCurrency {
  // These are the currencies already returned by paddle, we just make them type-safe
  return currency as PaddleSdkCurrency
}

export function convertApiCountry(country: string): PaddleSdkCountry {
  // These are the countries already returned by paddle, we just make them type-safe
  return country as PaddleSdkCountry
}

export function convertApiPaymentMethod(
  paymentMethod: RawPaddleSubscriptionPaymentSucceededAlert['payment_method']
): PaddleSdkPaymentMethod {
  switch (paymentMethod) {
    case 'card':
      return PaddleSdkPaymentMethod.CARD
    case 'paypal':
      return PaddleSdkPaymentMethod.PAYPAL
    case 'apple-pay':
      return PaddleSdkPaymentMethod.APPLE_PAY
    case 'wire-transfer':
      return PaddleSdkPaymentMethod.WIRE_TRANSFER
    case 'free':
      return PaddleSdkPaymentMethod.FREE
  }
}

export function convertApiCardBrand(cardBrand: string): PaddleSdkCardBrand {
  switch (cardBrand) {
    case 'visa':
      return PaddleSdkCardBrand.VISA
    case 'american_express':
      return PaddleSdkCardBrand.AMERICAN_EXPRESS
    case 'discover':
      return PaddleSdkCardBrand.DISCOVER
    case 'jcb':
      return PaddleSdkCardBrand.JCB
    case 'elo':
      return PaddleSdkCardBrand.ELO
    case 'master':
    case 'mastercard':
      return PaddleSdkCardBrand.MASTERCARD
    case 'maestro':
      return PaddleSdkCardBrand.MAESTRO
    case 'diners_club':
      return PaddleSdkCardBrand.DINERS_CLUB
  }

  return PaddleSdkCardBrand.UNKNOWN
}

export function convertApiRefundType(
  refundType: RawPaddlePaymentRefundedAlert['refund_type']
): PaddleSdkRefundType {
  switch (refundType) {
    case 'full':
      return PaddleSdkRefundType.FULL
    case 'vat':
      return PaddleSdkRefundType.VAT
    case 'partial':
      return PaddleSdkRefundType.PARTIAL
  }
}

export function convertSdkPriceList(
  currencyList: Array<[PaddleSdkCurrency, number]>
): Array<string> {
  return currencyList.map(([currency, amount]) => `${currency}:${amount}`)
}
