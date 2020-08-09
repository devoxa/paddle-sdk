export type PaddleSdkSubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted' // TODO Update with better enum
export type PaddleSdkCurrency = string // TODO Update with union
export type PaddleSdkCountry = string // TODO Update with union
export type PaddleSdkPauseReason = 'delinquent' | 'voluntary' // TODO Update with better enum
export type PaddleSdkPaymentMethod = 'card' | 'paypal' | 'free' | 'apple-pay' | 'wire-transfer' // TODO Update with better enum

// TODO Make properties snakeCase
// TODO Make alert type an enum (SUBSCRIPTION_CREATED, ...)

export type PaddleSdkSubscriptionCreatedAlert<T> = {
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

export type PaddleSdkSubscriptionUpdatedAlert<T> = {
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

export type PaddleSdkSubscriptionCancelledAlert<T> = {
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

export type PaddleSdkSubscriptionPaymentSucceededAlert<T> = {
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

export type PaddleSdkCreateProductPayLinkRequest<T> = {
  product_id?: number
  title?: string
  webhook_url?: string
  prices?: Array<string>
  recurring_prices?: Array<string>
  trial_days?: number
  custom_message?: string
  coupon_code?: string
  discountable?: 0 | 1
  image_url?: string
  return_url?: string
  quantity_variable?: 0 | 1
  quantity?: number
  expires?: string
  affiliates?: Array<string>
  recurring_affiliate_limit?: number
  marketing_consent?: 0 | 1
  customer_email?: string
  customer_country?: string
  customer_postcode?: string
  passthrough?: T
  vat_number?: string
  vat_company_name?: string
  vat_street?: string
  vat_city?: string
  vat_state?: string
  vat_country?: string
  vat_postcode?: string
}

export type PaddleSdkCreateProductPayLinkResponse = {
  url: string
}

export type PaddleSdkListSubscriptionsRequest = {
  subscription_id?: string
  plan_id?: string
  state?: 'active' | 'past_due' | 'trialing' | 'paused' | 'deleted'
  page?: number
  results_per_page?: number
}

export type PaddleSdkListSubscriptionsResponse = Array<{
  subscription_id: number
  plan_id: number
  user_id: number
  user_email: string
  marketing_consent: boolean
  status: PaddleSdkSubscriptionStatus
  signup_date: Date
  update_url: string
  cancel_url: string
  paused_at: Date
  paused_from: Date
  payment_information:
    | {
        payment_method: 'card'
        card_type: string
        last_four_digits: string
        expiry_date: Date
      }
    | {
        payment_method: 'paypal'
      }
  last_payment: {
    amount: number
    currency: string
    date: Date
  }
  next_payment: {
    amount: number
    currency: string
    date: Date
  } | null
}>

export type PaddleSdkUpdateSubscriptionRequest<T> = {
  subscription_id: number
  quantity?: number
  currency?: string
  recurring_price?: number
  bill_immediately?: boolean
  plan_id?: number
  prorate?: boolean
  keep_modifiers?: boolean
  passthrough?: T
  pause?: boolean
}

export type PaddleSdkUpdateSubscriptionResponse = {
  subscription_id: number
  user_id: number
  plan_id: number
  next_payment: {
    amount: number
    currency: string
    date: string
  }
}

export type PaddleSdkCancelSubscriptionRequest = {
  subscription_id: number
}

export type PaddleSdkCancelSubscriptionResponse = void

export type PaddleSdkCreateSubscriptionModifierRequest = {
  subscription_id: number
  modifier_recurring?: true | false
  modifier_amount: number
  modifier_description?: string
}

export type PaddleSdkCreateSubscriptionModifierResponse = {
  subscription_id: number
  modifier_id: number
}
