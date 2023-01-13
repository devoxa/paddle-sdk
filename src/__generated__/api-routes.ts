// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

export const PADDLE_PRODUCT_GENERATE_PAY_LINK = {
  method: 'POST' as const,
  url: '/2.0/product/generate_pay_link' as const,
}

export type RawPaddlePostProductGeneratePayLinkRequest = {
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
  passthrough?: string
  vat_number?: string
  vat_company_name?: string
  vat_street?: string
  vat_city?: string
  vat_state?: string
  vat_country?: string
  vat_postcode?: string
}

export type RawPaddlePostProductGeneratePayLinkResponse = {
  url: string
}

export const PADDLE_SUBSCRIPTION_USERS = {
  method: 'POST' as const,
  path: '/2.0/subscription/users' as const,
}

export type RawPaddlePostSubscriptionUsersRequest = {
  subscription_id?: string
  plan_id?: string
  state?: 'active' | 'past_due' | 'trialing' | 'paused' | 'deleted'
  page?: number
  results_per_page?: number
}

export type RawPaddlePostSubscriptionUsersResponse = Array<{
  subscription_id: number
  plan_id: number
  user_id: number
  user_email: string
  marketing_consent: boolean
  state: 'active' | 'past_due' | 'trialing' | 'deleted' | 'paused'
  signup_date: string
  last_payment: {
    amount: number
    currency: string
    date: string
  }
  next_payment?: {
    amount: number
    currency: string
    date: string
  }
  update_url: string
  cancel_url: string
  paused_at?: string
  paused_from?: string
  payment_information:
    | {
        payment_method: 'card'
        card_type: string
        last_four_digits: string
        expiry_date: string
      }
    | {
        payment_method: 'paypal'
      }
  quantity?: number
}>

export const PADDLE_SUBSCRIPTION_USERS_UPDATE = {
  method: 'POST' as const,
  path: '/2.0/subscription/users/update' as const,
}

export type RawPaddlePostSubscriptionUsersUpdateRequest = {
  subscription_id: number
  quantity?: number
  currency?: string
  recurring_price?: number
  bill_immediately?: boolean
  plan_id?: number
  prorate?: boolean
  keep_modifiers?: boolean
  passthrough?: string
  pause?: boolean
}

export type RawPaddlePostSubscriptionUsersUpdateResponse = {
  subscription_id: number
  user_id: number
  plan_id: number
  next_payment: {
    amount: number
    currency: string
    date: string
  }
}

export const PADDLE_SUBSCRIPTION_USERS_CANCEL = {
  method: 'POST' as const,
  path: '/2.0/subscription/users_cancel' as const,
}

export type RawPaddlePostSubscriptionUsersCancelRequest = {
  subscription_id: number
}

export type RawPaddlePostSubscriptionUsersCancelResponse = void

export const PADDLE_SUBSCRIPTION_MODIFIERS_CREATE = {
  method: 'POST' as const,
  path: '/2.0/subscription/modifiers/create' as const,
}

export type RawPaddlePostSubscriptionModifiersCreateRequest = {
  subscription_id: number
  modifier_recurring?: true | false
  modifier_amount: number
  modifier_description?: string
}

export type RawPaddlePostSubscriptionModifiersCreateResponse = {
  subscription_id: number
  modifier_id: number
}
