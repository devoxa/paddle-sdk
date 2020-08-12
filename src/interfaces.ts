import { RawPaddleEnumCountries, RawPaddleEnumCurrencies } from './__generated__/enums'

/**
 * A status of a subscription
 *
 * - ACTIVE: Indicates an active subscription, payments are up-to-date.
 * - TRIALING: Indicates the subscription is in the trial period, will change to ACTIVE once the first recurring payment is successfully completed.
 * - PAST_DUE: Indicates a payment for this subscription has failed. The payment will be retried and the status will change to ACTIVE, PAUSED or CANCELLED depending on your dunning settings.
 * - PAUSED: Indicates that this subscription has been paused. The customer will not be charged for subsequent payments. The status will change to ACTIVE once the subscription is restarted.
 * - CANCELLED: Indicates that this subscription has been cancelled.
 */
export type PaddleSdkSubscriptionStatus =
  | 'ACTIVE'
  | 'TRIALING'
  | 'PAST_DUE'
  | 'PAUSED'
  | 'CANCELLED'

/** A three-letter ISO currency code */
export type PaddleSdkCurrency = RawPaddleEnumCurrencies

/** A two letter ISO country code */
export type PaddleSdkCountry = RawPaddleEnumCountries

/**
 * A reason why a subscription was paused
 *
 * - DELINQUENT: The payment failed and the rule specified in the dunning settings was to pause the subscription.
 * - VOLUNTARY: The subscription was paused via the API.
 */
export type PaddleSdkPausedReason = 'DELINQUENT' | 'VOLUNTARY'

/** A payment method used to make a transaction */
export type PaddleSdkPaymentMethod = 'CARD' | 'PAYPAL' | 'APPLE_PAY' | 'WIRE_TRANSFER' | 'FREE'

// ----------------------------------------------------------------------------
// WEBHOOKS
// ----------------------------------------------------------------------------

/** An event fired when a subscription is created */
export type PaddleSdkSubscriptionCreatedEvent<TMetadata> = {
  // EVENT ---

  /** The type of this event */
  eventType: 'SUBSCRIPTION_CREATED'

  /** The unique ID for this event */
  eventId: number

  /** The date and time the event was fired */
  eventTime: Date

  // ORDER ---

  /** The value passed into the pay link using the `metadata` parameter */
  metadata: TMetadata

  /** The unique checkout ID of the order */
  checkoutId: string

  /** The currency of the order */
  currency: PaddleSdkCurrency

  /** The referrer URL(s) from where the order originated from */
  referrerUrl: string

  // SUBSCRIPTION ---

  /** The unique ID of the subscription */
  subscriptionId: number

  /** The ID of the product the subscription is for */
  productId: number

  /** The status of the subscription */
  status: PaddleSdkSubscriptionStatus

  /** The number of subscription seats */
  quantity: number

  /** The price per seat of the subscription */
  unitPrice: number

  /** The total price of the subscription */
  price: number

  /** The date the next payment is due for the subscription */
  nextPaymentDate: Date

  /** The URL of the "Update Billing Information" page for the subscription */
  updateUrl: string

  /** The URL of the "Cancellation" page for the subscription */
  cancelUrl: string

  // CUSTOMER ---

  /** The unique ID of the customer */
  customerId: number

  /** The email address of the customer */
  customerEmail: string

  /** Whether the customer has agreed to receive marketing messages */
  hasMarketingConsent: boolean
}

/** An event fired when a subscription is updated */
export type PaddleSdkSubscriptionUpdatedEvent<TMetadata> = {
  // EVENT ---

  /** The type of this event */
  eventType: 'SUBSCRIPTION_UPDATED'

  /** The unique ID for this event */
  eventId: number

  /** The date and time the event was fired */
  eventTime: Date

  // ORDER ---

  /** The value passed into the pay link / set via the API using the `metadata` parameter */
  metadata: TMetadata

  /** The unique checkout ID of the order */
  checkoutId: string

  /** The currency of the order */
  currency: PaddleSdkCurrency

  // SUBSCRIPTION ---

  /** The unique ID of the subscription */
  subscriptionId: number

  /** The old ID of the product the subscription was for */
  oldProductId: number

  /** The ID of the product the subscription is for */
  productId: number

  /** The old status of the subscription */
  oldStatus: PaddleSdkSubscriptionStatus

  /** The status of the subscription */
  status: PaddleSdkSubscriptionStatus

  /** The old number of subscription seats */
  oldQuantity: number

  /** The number of subscription seats */
  quantity: number

  /** The old price per seat of the subscription */
  oldUnitPrice: number

  /** The price per seat of the subscription */
  unitPrice: number

  /** The old total price of the subscription */
  oldPrice: number

  /** The total price of the subscription */
  price: number

  /** The old date the next payment was due for the subscription */
  oldNextPaymentDate: Date

  /** The date the next payment is due for the subscription */
  nextPaymentDate: Date

  /** The URL of the "Update Billing Information" page for the subscription */
  updateUrl: string

  /** The URL of the "Cancellation" page for the subscription */
  cancelUrl: string

  /** The date and time when the subscription was requested to be paused */
  pausedAt: Date | null

  /**
   * The date the pause comes into effect, taking the customer’s balance into account.
   * The customer should be able to use the service they've subscribed to up until this date.
   */
  pausedFrom: Date | null

  /** The reason why the subscription is paused */
  pausedReason: PaddleSdkPausedReason | null

  // CUSTOMER ---

  /** The unique ID of the customer */
  customerId: number

  /** The email address of the customer */
  customerEmail: string

  /** Whether the customer has agreed to receive marketing messages */
  hasMarketingConsent: boolean
}

/** An event fired when a subscription is cancelled */
export type PaddleSdkSubscriptionCancelledEvent<TMetadata> = {
  // EVENT ---

  /** The type of this event */
  eventType: 'SUBSCRIPTION_CANCELLED'

  /** The unique ID for this event */
  eventId: number

  /** The date and time the event was fired */
  eventTime: Date

  // ORDER ---

  /** The value passed into the pay link / set via the API using the `metadata` parameter */
  metadata: TMetadata

  /** The unique checkout ID of the order */
  checkoutId: string

  /** The currency of the order */
  currency: PaddleSdkCurrency

  // SUBSCRIPTION ---

  /** The unique ID of the subscription */
  subscriptionId: number

  /** The ID of the product the subscription is for */
  productId: number

  /** The status of the subscription */
  status: PaddleSdkSubscriptionStatus

  /** The number of subscription seats */
  quantity: number

  /** The price per seat of the subscription */
  unitPrice: number

  /** The total price of the subscription */
  price: number

  /**
   * The date the cancellation comes into effect, taking the customer’s balance into account.
   * The customer should be able to use the service they've subscribed to up until this date.
   */
  cancelledFrom: Date

  // CUSTOMER ---

  /** The unique ID of the customer */
  customerId: number

  /** The email address of the customer */
  customerEmail: string

  /** Whether the customer has agreed to receive marketing messages */
  hasMarketingConsent: boolean
}

/**
 * An event fired when a subscription payment is made
 * Both the normal recurring subscription payment as well as extra charges trigger this event
 */
export type PaddleSdkSubscriptionPaymentSucceededEvent<TMetadata> = {
  // EVENT ---

  /** The type of this event */
  eventType: 'SUBSCRIPTION_PAYMENT_SUCCEEDED'

  /** The unique ID for this event */
  eventId: number

  /** The date and time the event was fired */
  eventTime: Date

  // ORDER ---

  /** The value passed into the pay link / set via the API using the `metadata` parameter */
  metadata: TMetadata

  /** The unique order ID for this payment */
  orderId: string

  /** The unique checkout ID of the order */
  checkoutId: string

  /** The coupon code used on this order */
  coupon: string

  /** The URL containing the customer receipt for this order */
  receiptUrl: string

  /** Whether this is the customer’s first payment for this subscription */
  isInitialPayment: boolean

  /** The number of payments made to date */
  installments: number

  /** The payment method used to make the transaction */
  paymentMethod: PaddleSdkPaymentMethod

  /** The currency of the order */
  currency: PaddleSdkCurrency

  /** The total amount the customer was charged for this payment */
  gross: number

  /** The amount of tax paid for this payment */
  tax: number

  /** The amount of fees paid for this payment */
  fee: number

  /** The total amount (after taxes and fees) earned from this payment */
  earnings: number

  // SUBSCRIPTION ---

  /** The unique ID of the subscription */
  subscriptionId: number

  /** The unique ID of the subscription payment */
  subscriptionPaymentId: number

  /** The ID of the product the subscription is for */
  productId: number

  /** The status of the subscription */
  status: PaddleSdkSubscriptionStatus

  /** The number of subscription seats */
  quantity: number

  /** The price per seat of the subscription */
  unitPrice: number

  /** The total price of the subscription */
  price: number

  /** The date the next payment is due for the subscription */
  nextPaymentDate: Date

  /** The total amount charged for the next payment of the subscription */
  nextPaymentAmount: number

  // CUSTOMER ---

  /** The unique ID of the customer */
  customerId: number

  /** The name of the customer */
  customerName: string

  /** The email address of the customer */
  customerEmail: string

  /** The country of the customer */
  customerCountry: PaddleSdkCountry

  /** Whether the customer has agreed to receive marketing messages */
  hasMarketingConsent: boolean

  // BALANCE ---

  /** The currency of the vendor */
  balanceCurrency: PaddleSdkCurrency

  /** The total amount received from the customer (in the vendor's currency) */
  balanceGross: number

  /** The amount of tax received from the customer (in the vendor's currency) */
  balanceTax: number

  /** The amount of fees taken from the vendor (in the vendor's currency) */
  balanceFee: number

  /** The amount earned from this payment (in the vendor's currency) */
  balanceEarnings: number
}

// ----------------------------------------------------------------------------
// API REQUESTS
// ----------------------------------------------------------------------------

/** The API request parameters for creating a product pay link */
export type PaddleSdkCreateProductPayLinkRequest<TMetadata> = {
  /** The ID of the product to base the pay link on */
  productId?: number

  /**
   * The metadata stored with the checkout, will be sent with all events associated with the order
   * This field is used to link payments/subscriptions to existing application entities
   */
  metadata?: TMetadata

  // CUSTOM PRODUCT ---

  /** The name of the product / title of the checkout, required if `productId` is not set */
  title?: string

  /** The short message displayed below the product name on the checkout */
  customMessage?: string

  /** The URL for the product image displayed on the checkout */
  imageUrl?: string

  /** The URL called with events upon successful checkout, only valid and required if `productId` is not set */
  webhookUrl?: string

  /**
   * The price(s) of the checkout for a one-time purchase or initial payment of a subscription.
   *
   * If `productId` is set, you must provide the price for the product’s default currency. If a
   * given currency is enabled in the dashboard, it will default to a conversion of the product’s
   * default currency price set in this field unless specified here as well.
   */
  prices?: Array<[PaddleSdkCurrency, number]>

  /**
   * The recurring price(s) of the checkout (excluding the initial payment), only valid if the `productId`
   * specified is a subscription.
   *
   * You must provide the price for the subscription’s default currency. If a given currency is enabled
   * in the dashboard, it will default to a conversion of the subscription’s default currency
   * price set in this field unless specified here as well.
   *
   * To override the initial payment and all recurring payment amounts, both `prices` and
   * `recurringPrices` must be set.
   */
  recurringPrices?: Array<[PaddleSdkCurrency, number]>

  /** The number of days before charging the customer the recurring price, only valid for subscriptions */
  trialDays?: number

  /** Whether a coupon can be applied to the checkout */
  isDiscountable?: boolean

  /** The URL to redirect to once the checkout is completed */
  returnUrl?: string

  /** Whether the customer is allowed to alter the quantity of the checkout */
  isQuantityVariable?: boolean

  /** The expiration date of the checkout link should expire */
  expirationDate?: Date

  /** The other vendor IDs whom you would like to split the funds from this checkout with */
  affiliates?: Array<number>

  /**
   * The number of times other vendors will receive funds from the recurring payments for subscription products
   *
   * The initial checkout payment is included in the limit. If this field is not set, a limit will not be applied.
   * If your product has a trial period, set this to `2` or greater in order for your affiliates to correctly receive
   * their commission on payments after the trial.
   */
  recurringAffiliateLimit?: number

  // POPULATE CHECKOUT ---

  /**
   * Populates the quantity selector on the checkout
   * Free products & subscription products are fixed to a quantity of 1
   */
  populateQuantity?: number

  /** Populates the "Coupon" field on the checkout */
  populateCoupon?: string

  /** Populates whether the customer has agreed to receive marketing messages */
  populateHasMarketingConsent?: boolean

  /** Populates the "Email" field on the checkout, required if `populateHasMarketingConsent` if set */
  populateCustomerEmail?: string

  /** Populates the "Country" field on the checkout */
  populateCustomerCountry?: PaddleSdkCountry

  /**
   * Populates the "Postcode" field on the checkout, required if the `populateCustomerCountry` requires a postcode
   *
   * See the [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries#countries-requiring-postcode) for countries requiring this field.
   */
  populateCustomerPostcode?: string

  /** Populates the "VAT Number" field on the checkout */
  populateVatNumber?: string

  /** Populates the "VAT Company Name" field on the checkout, required if `populateVatNumber` is set */
  populateVatCompanyName?: string

  /** Populates the "VAT Street" field on the checkout, required if `populateVatNumber` is set */
  populateVatStreet?: string

  /** Populates the "VAT Town/City" field on the checkout, required if `populateVatNumber` is set */
  populateVatCity?: string

  /** Populates the "VAT State" field on the checkout */
  populateVatState?: string

  /** Populates the "VAT Country" field on the checkout, required if `populateVatNumber` is set */
  populateVatCountry?: PaddleSdkCountry

  /**
   * Populates the "VAT Postcode" field on the checkout, required if `populateVatNumber` is set and
   * the `populateVatCountry` requires a postcode
   *
   * See the [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries#countries-requiring-postcode) for countries requiring this field.
   */
  populateVatPostcode?: string
}

/** The API response for creating a product pay link */
export type PaddleSdkCreateProductPayLinkResponse = {
  /** The generated product pay link URL */
  url: string
}

/** The API request parameters for listing subscriptions */
export type PaddleSdkListSubscriptionsRequest = {
  /** Filter by the unique ID of the subscription */
  subscriptionId?: number

  /** Filter by the ID of the product the subscription is for */
  productId?: number

  /** Filter by the subscription status */
  status?: PaddleSdkSubscriptionStatus

  /** The requested page of the result set */
  page?: number

  /** The number of records to return per page */
  resultsPerPage?: number
}

/** The API response for listing subscriptions */
export type PaddleSdkListSubscriptionsResponse = Array<{
  // ORDER ---

  /** The payment method used to make the transaction */
  paymentMethod: 'CARD' | 'PAYPAL'

  /** The brand of the card, set if `paymentMethod` is "CARD" */
  cardBrand: string | null

  /** The last four digits of the card, set if `paymentMethod` is "CARD" */
  cardLastFour: string | null

  /** The expiration date of the card, set if `paymentMethod` is "CARD" */
  cardExpirationDate: Date | null

  // SUBSCRIPTION ---

  /** The unique ID of the subscription */
  subscriptionId: number

  /** The ID of the product the subscription is for */
  productId: number

  /** The status of the subscription */
  status: PaddleSdkSubscriptionStatus

  /** The number of subscription seats */
  quantity: number

  /** The date and time the subscription was created */
  signupDate: Date

  /** The date the last payment was due for the subscription */
  lastPaymentDate: Date

  /** The currency of the last payment of the subscription */
  lastPaymentCurrency: PaddleSdkCurrency

  /** The total amount charged for the last payment of the subscription */
  lastPaymentAmount: number

  /** The date the next payment is due for the subscription */
  nextPaymentDate: Date | null

  /** The currency of the next payment of the subscription */
  nextPaymentCurrency: PaddleSdkCurrency | null

  /** The total amount charged for the next payment of the subscription */
  nextPaymentAmount: number | null

  /** The URL of the "Update Billing Information" page for the subscription */
  updateUrl: string

  /** The URL of the "Cancellation" page for the subscription */
  cancelUrl: string

  /** The date and time when the subscription was requested to be paused */
  pausedAt: Date | null

  /**
   * The date the pause comes into effect, taking the customer’s balance into account.
   * The customer should be able to use the service they've subscribed to up until this date.
   */
  pausedFrom: Date | null

  // CUSTOMER ---

  /** The unique ID of the customer */
  customerId: number

  /** The email address of the customer */
  customerEmail: string

  /** Whether the customer has agreed to receive marketing messages */
  hasMarketingConsent: boolean
}>

/** The API request parameters for updating a subscription */
export type PaddleSdkUpdateSubscriptionRequest<TMetadata> = {
  /** The unique ID of the subscription to be updated */
  subscriptionId: number

  /** The new ID of the product to move the subscription to */
  productId?: number

  /** The new number of subscription seats, only valid for quantity enabled subscriptions */
  quantity?: number

  /** The new price per unit to apply to a quantity enabled subscription */
  unitPrice?: number

  /**
   * The currency of the unit price, required if `unitPrice` is set
   * This must be the same as the currency of the existing subscription.
   */
  currency?: PaddleSdkCurrency

  /** Whether the subscription should make a payment for the next interval immediately */
  shouldMakeImmediatePayment?: boolean

  /** Whether the change in subscription should be prorated */
  shouldProrate?: boolean

  /** Whether to keep the existing modifiers on the subscription */
  shouldKeepModifiers?: boolean

  /**
   * The metadata data stored with the checkout, will be sent with all events associated with the order
   * This field is used to link payments/subscriptions to existing application entities
   */
  metadata?: TMetadata

  /**
   * Whether a subscription should be paused (true) or restarted (false)
   *
   * If the subscription is paused, the status will be changed to "PAUSED" when the subscription's
   * next payment date is reached.
   */
  shouldPause?: boolean
}

/** The API response for updating a subscription */
export type PaddleSdkUpdateSubscriptionResponse = {
  /** The unique ID of the subscription */
  subscriptionId: number

  /** The unique ID of the customer */
  customerId: number

  /** The ID of the product the subscription is for */
  productId: number

  /** The date the next payment is due for the subscription */
  nextPaymentDate: Date | null

  /** The currency of the next payment of the subscription */
  nextPaymentCurrency: PaddleSdkCurrency | null

  /** The total amount charged for the next payment of the subscription */
  nextPaymentAmount: number | null
}

/** The API request parameters for creating a subscription modifier */
export type PaddleSdkCreateSubscriptionModifierRequest = {
  /** The unique ID of the subscription to add a modifier for */
  subscriptionId: number

  /** Whether this modifier will be added to all future subscription payments */
  isRecurring: boolean

  /**
   * The amount this modifier adds to (positive) or removes from (negative) the subscription payment,
   * in the currency of the subscription
   */
  amount: number

  /** The text to be displayed on the buyer's receipt email and invoice */
  description: string
}

/** The API response for creating a subscription modifier */
export type PaddleSdkCreateSubscriptionModifierResponse = {
  /** The unique ID of the subscription */
  subscriptionId: number

  /** The unique ID of the modifier */
  modifierId: number
}

/** The API request parameters for cancelling a subscription */
export type PaddleSdkCancelSubscriptionRequest = {
  /** The unique ID of the subscription to be cancelled */
  subscriptionId: number
}

/** The API response for cancelling a subscription */
export type PaddleSdkCancelSubscriptionResponse = void
