import {
  RawPaddleSubscriptionCreatedAlert,
  RawPaddleSubscriptionUpdatedAlert,
  RawPaddleSubscriptionPaymentSucceededAlert,
} from './__generated__/webhook-alert-interfaces'
import {
  PaddleSdkSubscriptionStatus,
  PaddleSdkPausedReason,
  PaddleSdkPaymentMethod,
} from './interfaces'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export function atsDate(dateString: string, type: 'DATE' | 'DATE_TIME' | 'EXPIRY_DATE'): Date {
  switch (type) {
    case 'DATE':
      return dayjs.utc(dateString, 'YYYY-MM-DD').toDate()
    case 'DATE_TIME':
      return dayjs.utc(dateString, 'YYYY-MM-DD HH:mm:ss').toDate()
    case 'EXPIRY_DATE':
      return dayjs.utc(dateString, 'MM/YYYY').toDate()
  }
}

export function atsStatus(
  status: RawPaddleSubscriptionCreatedAlert['status']
): PaddleSdkSubscriptionStatus {
  switch (status) {
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

export function staStatus(
  status: PaddleSdkSubscriptionStatus
): RawPaddleSubscriptionCreatedAlert['status'] {
  switch (status) {
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

export function atsPausedReason(
  pausedReason: RawPaddleSubscriptionUpdatedAlert['paused_reason']
): PaddleSdkPausedReason {
  switch (pausedReason) {
    case 'delinquent':
      return 'DELINQUENT'
    case 'voluntary':
      return 'VOLUNTARY'
  }
}

export function atsPaymentMethod(
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
