import {
  RawPaddleSubscriptionCreatedAlert,
  RawPaddleSubscriptionUpdatedAlert,
  RawPaddleSubscriptionPaymentSucceededAlert,
} from '../__generated__/webhook-alerts'
import {
  PaddleSdkSubscriptionStatus,
  PaddleSdkPausedReason,
  PaddleSdkPaymentMethod,
  PaddleSdkCurrency,
  PaddleSdkCountry,
  PaddleSdkCardBrand,
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

export function convertApiBoolean(booleanString: '0' | '1'): boolean {
  return booleanString === '1'
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
      return dayjs(date).format('YYYY-MM-DD')
    case 'DATE_TIME':
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    case 'EXPIRY_DATE':
      return dayjs(date).format('MM/YYYY')
  }
}

export function convertApiSubscriptionStatus(
  subscriptionStatus: RawPaddleSubscriptionCreatedAlert['status']
): PaddleSdkSubscriptionStatus {
  switch (subscriptionStatus) {
    case 'active':
      return 'ACTIVE'
    case 'trialing':
      return 'TRIALING'
    case 'past_due':
      return 'PAST_DUE'
    case 'paused':
      return 'PAUSED'
    case 'deleted':
      return 'CANCELLED'
  }
}

export function convertSdkSubscriptionStatus(
  subscriptionStatus: PaddleSdkSubscriptionStatus
): RawPaddleSubscriptionCreatedAlert['status'] {
  switch (subscriptionStatus) {
    case 'ACTIVE':
      return 'active'
    case 'TRIALING':
      return 'trialing'
    case 'PAST_DUE':
      return 'past_due'
    case 'PAUSED':
      return 'paused'
    case 'CANCELLED':
      return 'deleted'
  }
}

export function convertApiPausedReason(
  pausedReason: Exclude<RawPaddleSubscriptionUpdatedAlert['paused_reason'], undefined>
): PaddleSdkPausedReason {
  switch (pausedReason) {
    case 'delinquent':
      return 'DELINQUENT'
    case 'voluntary':
      return 'VOLUNTARY'
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
      return 'CARD'
    case 'paypal':
      return 'PAYPAL'
    case 'apple-pay':
      return 'APPLE_PAY'
    case 'wire-transfer':
      return 'WIRE_TRANSFER'
    case 'free':
      return 'FREE'
  }
}

export function convertApiCardBrand(cardBrand: string): PaddleSdkCardBrand {
  switch (cardBrand) {
    case 'visa':
      return 'VISA'
    case 'american_express':
      return 'AMERICAN_EXPRESS'
    case 'discover':
      return 'DISCOVER'
    case 'jcb':
      return 'JCB'
    case 'elo':
      return 'ELO'
    case 'master':
    case 'mastercard':
      return 'MASTERCARD'
    case 'maestro':
      return 'MAESTRO'
    case 'diners_club':
      return 'DINERS_CLUB'
  }

  return 'UNKNOWN'
}
