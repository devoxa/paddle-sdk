import {
  RawPaddleSubscriptionCreatedAlert,
  RawPaddleSubscriptionUpdatedAlert,
  RawPaddleSubscriptionPaymentSucceededAlert,
} from '../__generated__/webhook-alert-interfaces'
import {
  PaddleSdkSubscriptionStatus,
  PaddleSdkPausedReason,
  PaddleSdkPaymentMethod,
  PaddleSdkCurrency,
  PaddleSdkCountry,
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
  pausedReason: RawPaddleSubscriptionUpdatedAlert['paused_reason']
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

export function convertApiCardType(cardType: string): string {
  // TODO Add exact types here
  return cardType.toUpperCase()
}
