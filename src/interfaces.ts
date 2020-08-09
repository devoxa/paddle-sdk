export type PaddleSdkSubscriptionStatus =
  | 'ACTIVE'
  | 'TRIALING'
  | 'PAST_DUE'
  | 'PAUSED'
  | 'CANCELLED'

export type PaddleSdkCurrency =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'ARS'
  | 'AUD'
  | 'BRL'
  | 'CAD'
  | 'CHF'
  | 'CNY'
  | 'CZK'
  | 'DKK'
  | 'HKD'
  | 'HUF'
  | 'INR'
  | 'JPY'
  | 'KRW'
  | 'MXN'
  | 'NOK'
  | 'NZD'
  | 'PLN'
  | 'RUB'
  | 'SEK'
  | 'SGD'
  | 'THB'
  | 'TWD'
  | 'ZAR'

export type PaddleSdkCountry =
  | 'AF'
  | 'AL'
  | 'DZ'
  | 'AS'
  | 'AD'
  | 'AO'
  | 'AI'
  | 'AG'
  | 'AR'
  | 'AM'
  | 'AW'
  | 'AU'
  | 'AT'
  | 'AZ'
  | 'BS'
  | 'BH'
  | 'BD'
  | 'BB'
  | 'BY'
  | 'BE'
  | 'BZ'
  | 'BJ'
  | 'BM'
  | 'BT'
  | 'BO'
  | 'BA'
  | 'BW'
  | 'BV'
  | 'BR'
  | 'IO'
  | 'VG'
  | 'BN'
  | 'BG'
  | 'BF'
  | 'BI'
  | 'KH'
  | 'CM'
  | 'CA'
  | 'CV'
  | 'KY'
  | 'CF'
  | 'TD'
  | 'CL'
  | 'CN'
  | 'CX'
  | 'CC'
  | 'CO'
  | 'KM'
  | 'CG'
  | 'CK'
  | 'CR'
  | 'CI'
  | 'HR'
  | 'CU'
  | 'CW'
  | 'CY'
  | 'CZ'
  | 'DK'
  | 'DJ'
  | 'DM'
  | 'DO'
  | 'EC'
  | 'EG'
  | 'SV'
  | 'GQ'
  | 'ER'
  | 'EE'
  | 'ET'
  | 'FK'
  | 'FO'
  | 'FJ'
  | 'FI'
  | 'FR'
  | 'GF'
  | 'PF'
  | 'TF'
  | 'GA'
  | 'GM'
  | 'GE'
  | 'DE'
  | 'GH'
  | 'GI'
  | 'GR'
  | 'GL'
  | 'GD'
  | 'GP'
  | 'GU'
  | 'GT'
  | 'GG'
  | 'GN'
  | 'GW'
  | 'GY'
  | 'HT'
  | 'HM'
  | 'VA'
  | 'HN'
  | 'HK'
  | 'HU'
  | 'IS'
  | 'IN'
  | 'ID'
  | 'IR'
  | 'IQ'
  | 'IE'
  | 'IL'
  | 'IT'
  | 'JM'
  | 'JP'
  | 'JE'
  | 'JO'
  | 'KZ'
  | 'KE'
  | 'KI'
  | 'KW'
  | 'KG'
  | 'LA'
  | 'LV'
  | 'LB'
  | 'LS'
  | 'LR'
  | 'LY'
  | 'LI'
  | 'LT'
  | 'LU'
  | 'MO'
  | 'MK'
  | 'MG'
  | 'MW'
  | 'MY'
  | 'MV'
  | 'ML'
  | 'MT'
  | 'MH'
  | 'MQ'
  | 'MR'
  | 'MU'
  | 'YT'
  | 'MX'
  | 'FM'
  | 'MD'
  | 'MC'
  | 'MN'
  | 'ME'
  | 'MS'
  | 'MA'
  | 'MZ'
  | 'MM'
  | 'NA'
  | 'NR'
  | 'NP'
  | 'NL'
  | 'AN'
  | 'NC'
  | 'NZ'
  | 'NI'
  | 'NE'
  | 'NG'
  | 'NU'
  | 'NF'
  | 'KP'
  | 'MP'
  | 'NO'
  | 'OM'
  | 'PK'
  | 'PW'
  | 'PS'
  | 'PA'
  | 'PG'
  | 'PY'
  | 'PE'
  | 'PH'
  | 'PN'
  | 'PL'
  | 'PT'
  | 'PR'
  | 'QA'
  | 'RS'
  | 'RE'
  | 'RO'
  | 'RU'
  | 'RW'
  | 'GS'
  | 'SH'
  | 'KN'
  | 'LC'
  | 'PM'
  | 'VC'
  | 'WS'
  | 'SM'
  | 'ST'
  | 'SA'
  | 'SN'
  | 'SC'
  | 'SL'
  | 'SG'
  | 'SK'
  | 'SI'
  | 'SB'
  | 'SO'
  | 'ZA'
  | 'KR'
  | 'ES'
  | 'LK'
  | 'SD'
  | 'SR'
  | 'SJ'
  | 'SZ'
  | 'SE'
  | 'CH'
  | 'SY'
  | 'TW'
  | 'TJ'
  | 'TZ'
  | 'TH'
  | 'TL'
  | 'TG'
  | 'TK'
  | 'TO'
  | 'TT'
  | 'TN'
  | 'TR'
  | 'TM'
  | 'TC'
  | 'TV'
  | 'VI'
  | 'UG'
  | 'UA'
  | 'AE'
  | 'GB'
  | 'US'
  | 'UM'
  | 'UY'
  | 'UZ'
  | 'VU'
  | 'VE'
  | 'VN'
  | 'WF'
  | 'EH'
  | 'YE'
  | 'ZM'
  | 'ZW'
  | 'AU'
  | 'CA'
  | 'FR'
  | 'DE'
  | 'IN'
  | 'IT'
  | 'NL'
  | 'ES'
  | 'GB'
  | 'US'

export type PaddleSdkPausedReason = 'DELINQUENT' | 'VOLUNTARY'

export type PaddleSdkPaymentMethod = 'CARD' | 'PAYPAL' | 'APPLE_PAY' | 'WIRE_TRANSFER' | 'FREE'

export type PaddleSdkSubscriptionCreatedAlert<T> = {
  alert_id: number
  alert_name: 'SUBSCRIPTION_CREATED'
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
  alert_name: 'SUBSCRIPTION_UPDATED'
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
  paused_reason: PaddleSdkPausedReason | null
  subscription_id: number
  update_url: string
  user_id: number
}

export type PaddleSdkSubscriptionCancelledAlert<T> = {
  alert_id: number
  alert_name: 'SUBSCRIPTION_CANCELLED'
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
  alert_name: 'SUBSCRIPTION_PAYMENT_SUCCEEDED'
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
    currency: PaddleSdkCurrency
    date: Date
  }
  next_payment: {
    amount: number
    currency: PaddleSdkCurrency
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
