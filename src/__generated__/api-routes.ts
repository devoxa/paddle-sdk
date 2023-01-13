// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

export const PADDLE_PRODUCT_GENERATE_PAY_LINK = {
  method: 'POST' as const,
  path: '/2.0/product/generate_pay_link' as const,
}

export type RawPaddlePostProductGeneratePayLinkRequest = {
  /** The Paddle Product ID/Plan ID that you want to base this custom checkout on. Required if not using custom products.

If no `product_id` is set, custom non-subscription product checkouts can be generated instead by specifying the **required** fields: `title`, `webhook_url` and `prices`. */
  product_id?: number
  /** The name of the product/title of the checkout. Required if `product_id` is not set. */
  title?: string
  /** An endpoint that we will call with transaction information upon successful checkout, to allow you to fulfill the purchase. 

Only valid (and required) if `product_id` is not set.

Note: testing on localhost is not supported. Please use an internet-accessible URL. */
  webhook_url?: string
  /** Price(s) of the checkout for a one-time purchase or initial payment of a subscription. 

If `product_id` is set, you must also provide the price for the product’s default currency. If a given currency is enabled in the dashboard, it will default to a conversion of the product’s default currency price set in this field unless specified here as well.

Note: to use the HTTP tester and code generator tool below, pass in each array value on a separate line, for example: *prices[0]:"USD:19.99"*, *prices[1]:"EUR:15.99"* and so on. */
  prices?: Array<string>
  /** Recurring price(s) of the checkout (excluding the initial payment) only if the `product_id` specified is a subscription. To override the initial payment and all recurring payment amounts, both `prices` and `recurring_prices` must be set. 

You must also provide the price for the subscription’s default currency. If a given currency is enabled in the dashboard, it will default to a conversion of the subscription’s default currency price set in this field unless specified here as well.

Note: to use the HTTP tester and code generator tool below, pass in each array value on a separate line, for example: *recurring_prices[0]:"USD:19.99"*, *recurring_prices[1]:"EUR:15.99"* and so on. */
  recurring_prices?: Array<string>
  /** For subscription plans only. The number of days before Paddle starts charging the customer the recurring price. If you leave this field empty, the trial days of the plan will be used. */
  trial_days?: number
  /** A short message displayed below the product name on the checkout. */
  custom_message?: string
  /** A coupon to be applied to the checkout. */
  coupon_code?: string
  /** Specifies if a coupon can be applied to the checkout. "Add Coupon" button on the checkout will be hidden as well if set to `0`. */
  discountable?: 0 | 1
  /** A URL for the product image/icon displayed on the checkout. */
  image_url?: string
  /** A URL to redirect to once the checkout is completed. If the variable `{checkout_hash}` is included within the URL (e.g. *https://mysite.com/thanks?checkout={checkout_hash}*), the API will automatically populate the Paddle checkout ID in the redirected URL. */
  return_url?: string
  /** Specifies if the user is allowed to alter the quantity of the checkout. */
  quantity_variable?: 0 | 1
  /** Pre-fills the quantity selector on the checkout. Please note that free products/subscription plans are fixed to a quantity of 1. */
  quantity?: number
  /** Specifies if the checkout link should expire. The generated checkout URL will be accessible until 23:59:59 (UTC) on the date specified (date in format YYYY-MM-DD). */
  expires?: string
  /** Other Paddle vendor IDs whom you would like to split the funds from this checkout with. */
  affiliates?: Array<string>
  /** Limit the number of times other Paddle vendors will receive funds from the recurring payments (for subscription products). The initial checkout payment is included in the limit. If you leave this field empty, the limit will not be applied.<br><br>Note: if your plan has a trial period, set this to `2` or greater in order for your affiliates to correctly receive their commission on paid payments after the trial. */
  recurring_affiliate_limit?: number
  /** Whether you have gathered consent to market to the customer. `customer_email` is required if this property is set and you want to opt the customer into marketing. */
  marketing_consent?: 0 | 1
  /** Pre-fills the customer email field on the checkout. */
  customer_email?: string
  /** Pre-fills the customer country field on the checkout. See [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries) for the list of supported ISO country codes. */
  customer_country?: string
  /** Pre-fills the customer postcode field on the checkout. 

This field is required if the `customer_country` requires postcode. See the [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries#countries-requiring-postcode) for countries requiring this field. */
  customer_postcode?: string
  /** A string of metadata you wish to store with the checkout. Will be sent alongside all webhooks associated with the order. See the [Pass Parameters](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) documentation for more information. */
  passthrough?: string
  /** Pre-fills the sales tax identifier (VAT number) field on the checkout. */
  vat_number?: string
  /** Pre-fills the Company Name field on the checkout. Required if `vat_number` is set. */
  vat_company_name?: string
  /** Pre-fills the Street field on the checkout. Required if `vat_number` is set. */
  vat_street?: string
  /** Pre-fills the Town/City field on the checkout. Required if `vat_number` is set. */
  vat_city?: string
  /** Pre-fills the State field on the checkout. */
  vat_state?: string
  /** Pre-fills the Country field on the checkout. Required if `vat_number` is set. See [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries) for the list of supported ISO country codes. */
  vat_country?: string
  /** Pre-fills the Postcode field on the checkout.

This field is required if `vat_number` is set ***and*** the `vat_country` requires postcode. See the [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries#countries-requiring-postcode) for countries requiring this field. */
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
  /** Filter: A specific user subscription ID */
  subscription_id?: string
  /** Filter: The subscription plan ID */
  plan_id?: string
  /** Filter: The user subscription status. Returns all `active`, `past_due`, `trialing` and `paused` subscription plans if not specified. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  state?: 'active' | 'past_due' | 'trialing' | 'paused' | 'deleted'
  /** Paginate return results */
  page?: number
  /** Number of subscription records to return per page. */
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
  /** The ID of the subscription you’re updating. */
  subscription_id: number
  /** The new quantity to be applied to a quantity enabled subscription. */
  quantity?: number
  /** Optional, but required if setting `recurring_price`. The currency that the recurring price should be charged in. E.g. `USD`, `GBP`, `EUR`, etc. This must be the same as the currency of the existing subscription. */
  currency?: string
  /** The new recurring price per unit to apply to a quantity enabled subscription. Please note this is a singular price, i.e `11.00`. */
  recurring_price?: number
  /** If the subscription should bill for the next interval at the revised figures immediately. */
  bill_immediately?: boolean
  /** The new plan ID to move the subscription to. */
  plan_id?: number
  /** Whether the change in subscription should be prorated. */
  prorate?: boolean
  /** Retain the existing modifiers on the user subscription. */
  keep_modifiers?: boolean
  /** Update the additional data associated with this subscription, like additional features, add-ons and seats. This will be included in all subsequent webhooks, and is often a JSON string of relevant data. */
  passthrough?: string
  /** Whether a subscription should be paused or restarted. If the subscription is not paused and this is set to `true`, the [subscription status](/reference/platform-parameters/event-statuses) will be changed to "paused" when the subscription's next payment date is reached. */
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
  /** The specific user subscription ID. */
  subscription_id: number
}

export type RawPaddlePostSubscriptionUsersCancelResponse = void

export const PADDLE_SUBSCRIPTION_MODIFIERS_CREATE = {
  method: 'POST' as const,
  path: '/2.0/subscription/modifiers/create' as const,
}

export type RawPaddlePostSubscriptionModifiersCreateRequest = {
  /** The ID of the subscription that you want to add a modifier for */
  subscription_id: number
  /** Whether to retain the modifiers on the subscription. By default we retain them, but you can specify this field as false to  */
  modifier_recurring?: true | false
  /** The amount will be in the currency of the subscription. */
  modifier_amount: number
  /** A description text to be displayed on the buyer's receipt email and invoice. */
  modifier_description?: string
}

export type RawPaddlePostSubscriptionModifiersCreateResponse = {
  subscription_id: number
  modifier_id: number
}
