export type PaddleSdkSubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted' // TODO Update with better enum
export type PaddleSdkCurrency = string // TODO Update with union
export type PaddleSdkCountry = string // TODO Update with union
export type PaddleSdkPauseReason = 'delinquent' | 'voluntary' // TODO Update with better enum
export type PaddleSdkPaymentMethod = 'card' | 'paypal' | 'free' | 'apple-pay' | 'wire-transfer' // TODO Update with better enum

// TODO Make properties snakeCase
// TODO Make alert type an enum (SUBSCRIPTION_CREATED, ...)

export interface PaddleSdkSubscriptionCreatedAlert<T> {
  alert_id: number
  alert_name: 'subscription_created'
  cancel_url: string
  checkout_id: string
  currency: PaddleSdkCurrency
  email: string
  event_time: Date
  marketing_consent: boolean
  next_bill_date: Date
  passthrough: T
  quantity: number
  source: string
  status: PaddleSdkSubscriptionStatus
  subscription_id: number
  subscription_plan_id: number
  unit_price: number
  update_url: string
  user_id: number
}

export interface PaddleSdkSubscriptionUpdatedAlert<T> {
  alert_id: number
  alert_name: 'subscription_updated'
  cancel_url: string
  checkout_id: string
  currency: PaddleSdkCurrency
  email: string
  event_time: Date
  marketing_consent: boolean
  new_next_bill_date: Date
  new_price: number
  new_quantity: number
  new_status: PaddleSdkSubscriptionStatus
  new_subscription_plan_id: number
  new_unit_price: number
  old_next_bill_date: Date
  old_price: number
  old_quantity: number
  old_status: PaddleSdkSubscriptionStatus
  old_subscription_plan_id: number
  old_unit_price: number
  passthrough: T
  paused_at: Date | null
  paused_from: Date | null
  paused_reason: PaddleSdkPauseReason | null
  subscription_id: number
  update_url: string
  user_id: number
}

export interface PaddleSdkSubscriptionCancelledAlert<T> {
  alert_id: number
  alert_name: 'subscription_cancelled'
  cancellation_effective_date: Date
  checkout_id: string
  currency: PaddleSdkCurrency
  email: string
  event_time: Date
  marketing_consent: boolean
  passthrough: T
  quantity: number
  status: PaddleSdkSubscriptionStatus
  subscription_id: number
  subscription_plan_id: number
  unit_price: number
  user_id: number
}

export interface PaddleSdkSubscriptionPaymentSucceededAlert<T> {
  alert_id: number
  alert_name: 'subscription_payment_succeeded'
  balance_currency: PaddleSdkCurrency
  balance_earnings: number
  balance_fee: number
  balance_gross: number
  balance_tax: number
  checkout_id: string
  country: string
  coupon: string
  currency: PaddleSdkCurrency
  customer_name: string
  earnings: number
  email: string
  event_time: Date
  fee: number
  initial_payment: boolean
  instalments: number
  marketing_consent: boolean
  next_bill_date: Date
  next_payment_amount: number
  order_id: string
  passthrough: T
  payment_method: PaddleSdkPaymentMethod
  payment_tax: number
  plan_name: string
  quantity: number
  receipt_url: string
  sale_gross: number
  status: PaddleSdkSubscriptionStatus
  subscription_id: number
  subscription_payment_id: number
  subscription_plan_id: number
  unit_price: number
  user_id: number
}
