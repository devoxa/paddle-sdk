// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

/** An alert fired by Paddle through a configured webhook */
export type RawPaddleWebhookAlert =
  | RawPaddleSubscriptionCreatedAlert
  | RawPaddleSubscriptionUpdatedAlert
  | RawPaddleSubscriptionCancelledAlert
  | RawPaddleSubscriptionPaymentSucceededAlert
  | RawPaddleSubscriptionPaymentFailedAlert
  | RawPaddleSubscriptionPaymentRefundedAlert
  | RawPaddleLockerProcessedAlert
  | RawPaddlePaymentRefundedAlert
  | RawPaddlePaymentSucceededAlert
  | RawPaddleHighRiskTransactionCreatedAlert
  | RawPaddleHighRiskTransactionUpdatedAlert
  | RawPaddlePaymentDisputeCreatedAlert
  | RawPaddlePaymentDisputeClosedAlert
  | RawPaddleTransferCreatedAlert
  | RawPaddleTransferPaidAlert
  | RawPaddleNewAudienceMemberAlert
  | RawPaddleUpdateAudienceMemberAlert
  | RawPaddleInvoiceSentV2Alert
  | RawPaddleInvoicePaidV2Alert
  | RawPaddleInvoiceOverdueV2Alert
  | RawPaddleInvoiceCancelledV2Alert

/**
 * A `subscription_created` event is fired when a customer subscribes to a new subscription, successfully.
 * @source https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-created
 */
export type RawPaddleSubscriptionCreatedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'subscription_created'

  /**
   * The unique identifier for this paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * A URL for the 'Cancel Subscription' page. [See this documentation](https://developer.paddle.com/guides/how-tos/subscriptions/cancel-and-pause#cancel-subscription-url) for further information about cancelation URLs. Store this url together with the subscribed customer in your database. Max length: `<=200 characters`
   * @format uri
   */
  cancel_url: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The three-letter iso currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this subscription
   */
  custom_data: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (coordinated universal time).
   * @format date-time
   */
  event_time: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The date the next payment is due for this subscription.
   * @format date
   */
  next_bill_date: string

  /**
   * Contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * Contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max length: `<=1000 characters`
   */
  passthrough: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * Referrer website url(s) from where the traffic originated.
   */
  source: string

  /**
   * The current status of the subscription. A list of possible values and their meanings can be found in [Event Statuses](https://developer.paddle.com/reference/platform-parameters/event-statuses).
   */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'

  /**
   * The unique Subscription ID for this customer’s subscription. Store this with the customer in your database, as it is needed for making API calls.
   */
  subscription_id: string

  /**
   * The ID of the Subscription Plan to which the customer is subscribed. This value changes if the plan changes.
   */
  subscription_plan_id: string

  /**
   * The price per unit of the subscription.
   */
  unit_price: string

  /**
   * The URL for the Update Payment Details page. [See this documentation](https://developer.paddle.com/guides/how-tos/subscriptions/update-payment-details#update-payment-details-url) regarding update URLs. Store this URL together with the subscribed customer in your database.
   * @format uri
   */
  update_url: string

  /**
   * The customer User ID.
   */
  user_id: string
}

/**
 * A `subscription_updated` event is fired when there is a change to the plan, price, quantity or status for a customer's existing subscription - or if the payment date is rescheduled manually.
 * @source https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-updated
 */
export type RawPaddleSubscriptionUpdatedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'subscription_updated'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * A URL for the 'Cancel Subscription' page. [See this documentation](https://developer.paddle.com/guides/how-tos/subscriptions/cancel-and-pause#cancel-subscription-url) on cancelation URLs. Store this URL together with the subscribed customer in your database. Max Length: `<=200 characters`
   * @format uri
   */
  cancel_url: string

  /**
   * The unique checkout id for the order created.
   */
  checkout_id: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our  [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this subscription
   */
  custom_data: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The new total recurring price of the subscription. Decimal sent as a string.
   */
  new_price: string

  /**
   * The new quantity applied to a quantity enabled subscription.
   */
  new_quantity: string

  /**
   * The new price per unit of the subscription. Decimal sent as a string.
   */
  new_unit_price: string

  /**
   * The date the next payment is due on this subscription. Note: this will be empty if the subscription is in past due and all payment retry attempts have failed.
   * @format date
   */
  next_bill_date: string

  /**
   * The next bill date before the subscription was updated. Note: this will be empty if the subscription was in past due and all payment retry attempts previously failed.
   * @format date
   */
  old_next_bill_date: string

  /**
   * The previous total recurring price of the subscription. Decimal sent as a string.
   */
  old_price: string

  /**
   * The previous quantity applied to the subscription.
   */
  old_quantity: string

  /**
   * The subscription status before the subscription was updated. A list of possible values and their meanings can be found under [Event Statuses](https://developer.paddle.com/reference/platform-parameters/event-statuses).
   */
  old_status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'

  /**
   * The ID of the subscription plan before the subscription was updated.
   */
  old_subscription_plan_id: string

  /**
   * The previous price per unit of the subscription. Decimal sent as a string.
   */
  old_unit_price: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters`
   */
  passthrough: string

  /**
   * This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](https://developer.paddle.com/reference/platform-parameters/event-statuses).
   */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'

  /**
   * This is the unique Subscription ID for this customer’s subscription. Store this with the customer in your database, as it is needed for making API calls.
   */
  subscription_id: string

  /**
   * The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
   */
  subscription_plan_id: string

  /**
   * A URL of the ‘Update Payment Details’ page. [See this documentation](https://developer.paddle.com/guides/how-tos/subscriptions/update-payment-details#update-payment-details-url) on update URLs. Store this URL along with the subscribed customer in your database. Max Length: `<=200 characters`
   * @format uri
   */
  update_url: string

  /**
   * The customer user ID.
   */
  user_id: string

  /**
   * The date and time when the subscription was requested to be paused. The subscription will be paused on the `paused_from` date.
   * @format date-time
   */
  paused_at: string

  /**
   * The date when the subscription payment is paused. The customer should be able to use the service they’ve subscribed to up until this date.
   * @format date-time
   */
  paused_from: string

  /**
   * The reason why the subscription was paused. For example, `delinquent` if the payment failed and the rule specified in the [recover settings](https://vendors.paddle.com/recover-settings) was to pause the subscription.
   */
  paused_reason: 'delinquent' | 'voluntary'
}

/**
 * A `subscription_cancelled` event is fired when an existing customer subscription is cancelled.
 * @source https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-cancelled
 */
export type RawPaddleSubscriptionCancelledAlert = {
  /**
   * The alert name.
   */
  alert_name: 'subscription_cancelled'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The date the cancellation should come into effect, taking the customer’s most recent payment into account. The customer should be able to use the service they've subscribed to up until this date.
   * @format date
   */
  cancellation_effective_date: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this subscription
   */
  custom_data: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max length: `<=1000 characters`
   */
  passthrough: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](https://developer.paddle.com/reference/platform-parameters/event-statuses).
   */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted`.'

  /**
   * This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.
   */
  subscription_id: string

  /**
   * The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
   */
  subscription_plan_id: string

  /**
   * The price per unit of the subscription.
   */
  unit_price: string

  /**
   * The customer user ID.
   */
  user_id: string
}

/**
 * A `subscription_payment_succeeded` event is fired when a subscription payment is received successfully.
 * @source https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-succeeded
 */
export type RawPaddleSubscriptionPaymentSucceededAlert = {
  /**
   * The alert name.
   */
  alert_name: 'subscription_payment_succeeded'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The three-letter ISO currency code of the vendor’s account balance at the time of the transaction.
   */
  balance_currency: string

  /**
   * The amount of revenue added to the vendor’s balance as a result of this payment, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_earnings: string

  /**
   * The fee amount taken from the vendor, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_fee: string

  /**
   * The total amount received from the customer as a result of the payment, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_gross: string

  /**
   * The amount of tax received from the customer, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_tax: string

  /**
   * The unique checkout id for the order created.
   */
  checkout_id: string

  /**
   * The two-letter ISO country code of the customer. For a full list of supported countries, see our [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries) page.
   */
  country: string

  /**
   * The coupon code that was used for this order. Min length:`>=5 characters` Max length:`>=300 characters`
   */
  coupon: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this subscription
   */
  custom_data: string

  /**
   * The name of the customer. For card payments, the cardholder's name (entered by the buyer during the checkout) is returned. For PayPal payments, the name from the PayPal account used during the checkout is returned. For all other payment methods where the name is not collected (including Apple Pay and Wire Transfer), this field is empty.
   */
  customer_name: string

  /**
   * The total amount (after taxes and fees) you earned from this payment.
   */
  earnings: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The total amount in Paddle fees for this payment.
   */
  fee: string

  /**
   * The value of this field `0` or `1` indicates whether it is the customer’s first payment for this subscription.
   */
  initial_payment: '0' | '1'

  /**
   * Number of payments made to date, starting from `1` for the customer's first payment. Integer sent as string.
   */
  instalments: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The date the next payment is due for this subscription.
   * @format date
   */
  next_bill_date: string

  /**
   * The total amount that the customer will be charged for on their upcoming payment, in the subscription’s currency.
   */
  next_payment_amount: string

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See our [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters`
   */
  passthrough: string

  /**
   * Payment method used to make the transaction.
   */
  payment_method: 'card' | 'paypal'

  /**
   * Amount of tax paid as a result of this payment.
   */
  payment_tax: string

  /**
   * Subscription plan name.
   */
  plan_name: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * URL containing the customer receipt.
   * @format uri
   */
  receipt_url: string

  /**
   * The total amount the customer was charged for this payment. Decimal sent as string.
   */
  sale_gross: string

  /**
   * This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](https://developer.paddle.com/reference/platform-parameters/event-statuses).
   */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted`.'

  /**
   * This is the unique Subscription ID for this customer’s subscription. Store this with the customer in your database, as it is needed for making API calls.
   */
  subscription_id: string

  /**
   * The unique ID of the subscription payment.
   */
  subscription_payment_id: string

  /**
   * The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
   */
  subscription_plan_id: string

  /**
   * The price per unit of the subscription.
   */
  unit_price: string

  /**
   * The customer user ID.
   */
  user_id: string
}

/**
 * A `subscription_payment_failed` event is fired when a payment for an existing subscription fails.
 * @source https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-failed
 */
export type RawPaddleSubscriptionPaymentFailedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'subscription_payment_failed'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The amount that we tried to charge for this payment. Decimal value sent as a string.
   */
  amount: string

  /**
   * Number of failed payment attempts made so far for this instalment. This number will reset back to 1 if the “Reset Attempts” button in the subscription management page is clicked.
   */
  attempt_number: string

  /**
   * A URL for the 'Cancel Subscription' page. [See this documentation](https://developer.paddle.com/guides/how-tos/subscriptions/cancel-and-pause#cancel-subscription-url) on cancelation URLs. Store this URL along with the subscribed customer in your database. Max Length: `<=200 characters`
   * @format uri
   */
  cancel_url: string

  /**
   * The unique checkout id for the order created.
   */
  checkout_id: string

  /**
   * The three-letter ISO currency code.  For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this subscription
   */
  custom_data: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * Number of payments made to date, starting from `1` for the customer's first payment. Integer sent as string.
   */
  instalments: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The date that we will next try to process this failed payment. Note: this will be empty if the subscription is in past due and all payment retry attempts have failed.
   * @format date
   */
  next_retry_date: string

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
   */
  order_id: string

  /**
   * The customer user ID.
   */
  user_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters`
   */
  passthrough: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](https://developer.paddle.com/reference/platform-parameters/event-statuses).
   */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted`.'

  /**
   * This is the unique Subscription ID for this customer’s subscription. Store this with the customer in your database, as it is needed for making API calls.
   */
  subscription_id: string

  /**
   * The unique ID of the subscription payment.
   */
  subscription_payment_id: string

  /**
   * The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
   */
  subscription_plan_id: string

  /**
   * The price per unit of the subscription.
   */
  unit_price: string

  /**
   * A URL of the ‘Update Payment Details’ page. [See this documentation](https://developer.paddle.com/guides/how-tos/subscriptions/update-payment-details#update-payment-details-url) on update URLs. Store this URL along with the subscribed customer in your database. Max Length: `<=200 characters`
   * @format uri
   */
  update_url: string
}

/**
 * A `subscription_payment_refunded` event is fired when a refund for an existing subscription is issued.
 * @source https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-refunded
 */
export type RawPaddleSubscriptionPaymentRefundedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'subscription_payment_refunded'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The amount refunded, partial refunds are possible. Decimal value sent as a string.
   */
  amount: string

  /**
   * The three-letter ISO currency code of the vendor’s account balance at the time of the transaction.
   */
  balance_currency: string

  /**
   * The amount of revenue taken from the vendor’s balance as a result of this refund, in the vendor’s `balance_currency` at the time of the transaction. It returns a positive or negative value. For example, if you issue a VAT-only refund, this increases the vendor’s earnings instead of decreasing them; to reflect this we use a negative value. Also note that if the earnings of the order being refunded are split between vendors, the decreased amount will not include the other vendor’s fee - only yours. So: if you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings are reduced only by 85%).
   */
  balance_earnings_decrease: string

  /**
   * The fee amount returned to the vendor, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_fee_refund: string

  /**
   * The total amount returned to the customer as a result of this refund, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_gross_refund: string

  /**
   * The amount of tax returned to the customer, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_tax_refund: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this purchase
   */
  custom_data: string

  /**
   * The amount of revenue taken from the vendor’s earnings as a result of this refund, in the currency of the original transaction. It returns a positive or negative value. E.g: if you issue a VAT-only refund, this will increase the vendor’s earnings instead of decreasing it, to reflect this we use a negative value. Please also note that if the earnings of the order being refunded are being split between vendors, the earnings decrease amount will not include the other vendor’s fee, only yours: for example if you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings will only be reduced by 85%.
   */
  earnings_decrease: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The fee amount returned to the vendor, in the currency of the original transaction.
   */
  fee_refund: string

  /**
   * The total amount returned to the customer as a result of this refund, in the currency of the original transaction.
   */
  gross_refund: string

  /**
   * The value of this field `0` or `1` indicates whether it is the customer’s first payment for this subscription.
   */
  initial_payment: '0' | '1'

  /**
   * Number of payments made to date, starting from `1` for the customer's first payment. Integer sent as string.
   */
  instalments: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters
   */
  passthrough: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * Refund reason note.
   */
  refund_reason: string

  /**
   * The type of refund.
   */
  refund_type: 'full' | 'vat' | 'partial'

  /**
   * This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](https://developer.paddle.com/reference/platform-parameters/event-statuses).
   */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'

  /**
   * This is the unique Subscription ID for this customer’s subscription. Store this with the customer in your database, as it is needed for making API calls.
   */
  subscription_id: string

  /**
   * The unique ID of the subscription payment.
   */
  subscription_payment_id: string

  /**
   * The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
   */
  subscription_plan_id: string

  /**
   * The amount of tax returned to the customer, in the currency of the original transaction.
   */
  tax_refund: string

  /**
   * The price per unit of the subscription.
   */
  unit_price: string

  /**
   * The customer user ID.
   */
  user_id: string
}

/**
 * A `locker_processed` event is fired when an order is created after a successful payment event.
 * @source https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/order-processing-completed
 */
export type RawPaddleLockerProcessedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'locker_processed'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The value of this field `0` or `1` indicates whether the order originated from a checkout recovery email.
   */
  checkout_recovery: '0' | '1'

  /**
   * The coupon code that was used on this order. Min Length: `>=5 characters ` Max Length: `<=300 characters `
   */
  coupon: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this purchase
   */
  custom_data: string

  /**
   * The download URL of the purchased product.
   * @format uri
   */
  download: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * Instructions that have been sent to the customer.
   */
  instructions: string

  /**
   * The license number associated with the order (when applicable).
   */
  licence: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Vendor Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * The dashboard ID of the product purchased in this order.
   */
  product_id: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * Referrer website URL(s) from where the traffic originated from.
   */
  source: string
}

/**
 * A `payment_refunded` event is fired when a payment is refunded.
 * @source https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-refunded
 */
export type RawPaddlePaymentRefundedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'payment_refunded'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The amount refunded, partial refunds are possible.
   */
  amount: string

  /**
   * The three-letter ISO currency code of the vendor’s account balance at the time of the transaction.
   */
  balance_currency: string

  /**
   * The amount of revenue taken from the vendor’s earnings as a result of this refund, in the currency of the original transaction. It returns a positive or negative value. E.g: if you issue a VAT-only refund, this will increase the vendor’s earnings instead of decreasing it, to reflect this we use a negative value. Please also note that if the earnings of the order being refunded are being split between vendors, the earnings decrease amount will not include the other vendor’s fee, only yours: for example if you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings will only be reduced by 85%.
   */
  balance_earnings_decrease: string

  /**
   * The fee amount returned to the vendor, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_fee_refund: string

  /**
   * The total amount returned to the customer as a result of this refund, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_gross_refund: string

  /**
   * The amount of tax returned to the customer, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_tax_refund: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this purchase
   */
  custom_data: string

  /**
   * The amount of revenue taken from the vendor’s earnings as a result of this refund, in the currency of the original transaction. It returns a positive or negative value. E.g: if you issue a VAT-only refund, this will increase the vendor’s earnings instead of decreasing it, to reflect this we use a negative value. Please also note that if the earnings of the order being refunded are being split between vendors, the earnings decrease amount will not include the other vendor’s fee, only yours: for example if you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings will only be reduced by 85%.
   */
  earnings_decrease: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The fee amount returned to the vendor, in the currency of the original transaction.
   */
  fee_refund: string

  /**
   * The total amount returned to the customer as a result of this refund, in the currency of the original transaction.
   */
  gross_refund: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Vendor Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters`
   */
  passthrough: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * Refund reason note.
   */
  refund_reason: string

  /**
   * The type of refund.
   */
  refund_type: 'full' | 'vat' | 'partial'

  /**
   * The amount of tax returned to the customer, in the currency of the original transaction.
   */
  tax_refund: string
}

/**
 * A `payment_succeeded` event is fired when a payment is made into your Paddle account.
 * @source https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-succeeded
 */
export type RawPaddlePaymentSucceededAlert = {
  /**
   * The alert name.
   */
  alert_name: 'payment_succeeded'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The three-letter ISO currency code of the vendor’s account balance at the time of the transaction.
   */
  balance_currency: string

  /**
   * The amount of revenue added to the vendor’s balance as a result of this payment, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_earnings: string

  /**
   * The fee amount taken from the vendor, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_fee: string

  /**
   * The total amount received from the customer as a result of the payment, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_gross: string

  /**
   * The amount of tax received from the customer, in the vendor’s `balance_currency` at the time of the transaction.
   */
  balance_tax: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The two-letter ISO country code of the customer. For a full list of supported countries, see our [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries) page.
   */
  country: string

  /**
   * The coupon code that was used on this order.  Min Length: `>=5 characters` Max Length: `<=300 characters`
   */
  coupon: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this purchase
   */
  custom_data: string

  /**
   * The name of the customer. For card payments, this will return the cardholder name entered by the buyer during the checkout. For PayPal payments, this will return the name from the PayPal account used during the checkout. For all other payment methods where the name is not collected (including Apple Pay and Wire Transfer), this will be empty.
   */
  customer_name: string

  /**
   * The amount of this payment that was credited to your balance.
   */
  earnings: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The fee taken by Paddle for this payment.
   */
  fee: string

  /**
   * This field is deprecated and will be removed in a future update.
   */
  ip: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Vendor Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters`
   */
  passthrough: string

  /**
   * Payment method used to make the transaction.
   */
  payment_method:
    | 'free'
    | 'card'
    | 'paypal'
    | 'wire-transfer'
    | 'apple-pay'
    | 'google-pay'
    | 'ideal'
    | 'alipay'

  /**
   * The amount of this payment that was paid in tax/VAT.
   */
  payment_tax: string

  /**
   * The dashboard ID of the product purchased in this order.
   */
  product_id: string

  /**
   * The name of the product included in the transaction.
   */
  product_name: string

  /**
   * The number of products or subscription seats sold in the transaction.
   */
  quantity: string

  /**
   * A URL where the receipt for the transaction can be retrieved.
   * @format uri
   */
  receipt_url: string

  /**
   * The total value of the sale (including tax) in the sale currency.
   */
  sale_gross: string

  /**
   * Determines whether the Dashboard price was overridden.
   */
  used_price_override: '1' | '0'
}

/**
 * A `high_risk_transaction_created` event is fired when a transaction is flagged as high risk.
 * @source https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-created
 */
export type RawPaddleHighRiskTransactionCreatedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'high_risk_transaction_created'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The case id for the flagged order.
   */
  case_id: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * Date and time this order was flagged.
   * @format date-time
   */
  created_at: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this purchase
   */
  custom_data: string

  /**
   * The email address of the customer.
   * @format email
   */
  customer_email_address: string

  /**
   * The customer user ID.
   */
  customer_user_id: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters
   */
  passthrough: string

  /**
   * The dashboard ID of the product purchased in this order.
   */
  product_id: string

  /**
   * The status of the flagged order.
   */
  status: 'pending'
}

/**
 * A `high_risk_transaction_updated` event is fired when a transaction already flagged as high risk is accepted or rejected.
 * @source https://developer.paddle.com/webhook-reference/risk-dispute-alerts/high-risk-transaction-updated
 */
export type RawPaddleHighRiskTransactionUpdatedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'high_risk_transaction_updated'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The case id for the flagged order.
   */
  case_id: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * Date and time this order was flagged.
   * @format date-time
   */
  created_at: string

  /**
   * The email address of the customer.
   * @format email
   */
  customer_email_address: string

  /**
   * The customer user ID.
   */
  customer_user_id: string

  /**
   * A JSON encoded string of custom data that was passed into the checkout for this purchase
   */
  custom_data: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Vendor Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters
   */
  passthrough: string

  /**
   * The dashboard ID of the product purchased in this order.
   */
  product_id: string

  /**
   * The status of the flagged order.
   */
  status: 'accepted' | 'rejected'
}

/**
 * A `payment_dispute_created` event is fired when a dispute/chargeback is raised for a card transaction.
 * @source https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-created
 */
export type RawPaddlePaymentDisputeCreatedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'payment_dispute_created'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The total amount (transaction amount and fee) you were charged for this dispute being raised.
   */
  amount: string

  /**
   * The transaction amount you were charged for this dispute being raised, in the vendor’s `balance_currency`.
   */
  balance_amount: string

  /**
   * The three-letter ISO currency code of the vendor’s account balance at the time of the transaction.
   */
  balance_currency: string

  /**
   * The fee you were charged for this dispute being raised, in the vendor’s `balance_currency`.
   */
  balance_fee: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The fee you were charged for this dispute being raised (in USD).
   */
  fee_usd: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters`
   */
  passthrough: string

  /**
   * The status of this dispute.
   */
  status: 'open'
}

/**
 * A `payment_dispute_closed` event is fired when a dispute/chargeback is closed for a card transaction. This indicates that the dispute/chargeback was contested and won by Paddle.
 * @source https://developer.paddle.com/webhook-reference/risk-dispute-alerts/payment-dispute-closed
 */
export type RawPaddlePaymentDisputeClosedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'payment_dispute_closed'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The total amount (transaction amount and fee) you were refunded for this dispute being closed.
   */
  amount: string

  /**
   * The transaction amount you were refunded for this dispute being closed, in the vendor’s `balance_currency`.
   */
  balance_amount: string

  /**
   * The three-letter ISO currency code of the vendor’s account balance at the time of the transaction.
   */
  balance_currency: string

  /**
   * The fee you were refunded for this dispute being closed, in the vendor’s `balance_currency`.
   */
  balance_fee: string

  /**
   * The checkout id of the order created.
   */
  checkout_id: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The fee you were refunded for this dispute being closed (in USD).
   */
  fee_usd: string

  /**
   * The value of this field `0` or `1` indicates whether the user has agreed to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * The Paddle Order ID for this payment. This can be used to look up the order within your Vendor Dashboard.
   */
  order_id: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. Max Length: `<=1000 characters`
   */
  passthrough: string

  /**
   * The status of this dispute.
   */
  status: 'closed'
}

/**
 * A `transfer_created` event is fired when a new transfer/payout is created for your account.
 * @source https://developer.paddle.com/webhook-reference/payout-alerts/transfer-created
 */
export type RawPaddleTransferCreatedAlert = {
  /**
   * The alert name.
   */
  alert_name: 'transfer_created'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The amount of the payout.
   */
  amount: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * The ID of the payout. Can be used to lookup the payout within your Vendor Dashboard.
   */
  payout_id: string

  /**
   * The payout status.
   */
  status: 'unpaid'
}

/**
 * A `transfer_paid` event is fired when a new transfer/payout is marked as paid for your account.
 * @source https://developer.paddle.com/webhook-reference/payout-alerts/transfer-paid
 */
export type RawPaddleTransferPaidAlert = {
  /**
   * The alert name.
   */
  alert_name: 'transfer_paid'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The amount of the payout.
   */
  amount: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * The ID of the payout. Can be used to lookup the payout within your Vendor Dashboard.
   */
  payout_id: string

  /**
   * The payout status.
   */
  status: 'paid'
}

/**
 * A `new_audience_member` event is fired when a customer opts in to receive marketing communication from you.
 * @source https://developer.paddle.com/webhook-reference/audience-alerts/new-audience-member
 */
export type RawPaddleNewAudienceMemberAlert = {
  /**
   * The alert name.
   */
  alert_name: 'new_audience_member'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The date and time the customer has been added.
   * @format date-time
   */
  created_at: string

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The value of this field `0` or `1` indicates whether the user has consented to receive marketing messages from the vendor.
   */
  marketing_consent: '0' | '1'

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * Comma-separated list of Paddle IDs of the products the customer has purchased.
   */
  products: string

  /**
   * Source of customer acquisition.
   */
  source: 'checkout' | 'trial' | 'order' | 'activation' | 'import' | 'application'

  /**
   * This field is deprecated and will be removed in a future update. Please refer to the `marketing_consent` field instead.
   */
  subscribed: string

  /**
   * The customer user ID.
   */
  user_id: string
}

/**
 * An `update_audience_member` event is fired when information for an existing audience member is updated.
 * @source https://developer.paddle.com/webhook-reference/audience-alerts/update-audience-member
 */
export type RawPaddleUpdateAudienceMemberAlert = {
  /**
   * The alert name.
   */
  alert_name: 'update_audience_member'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The date and time the event was triggered in UTC (Coordinated Universal Time).
   * @format date-time
   */
  event_time: string

  /**
   * The customer’s new email address.
   * @format email
   */
  new_customer_email: string

  /**
   * The new marketing consent which will be `0` or `1` depending on whether the customer has provided consent to be contacted with marketing messages.
   */
  new_marketing_consent: '0' | '1'

  /**
   * The customer’s previous email address.
   * @format email
   */
  old_customer_email: string

  /**
   * The previous marketing consent which will be `0` or `1` depending on whether the customer has consented to be contacted with marketing messages.
   */
  old_marketing_consent: '0' | '1'

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * A comma-separated list of the Paddle IDs of the products the customer has purchased.
   */
  products: string

  /**
   * Source of customer acquisition.
   */
  source: 'checkout' | 'trial' | 'order' | 'activation' | 'import' | 'application'

  /**
   * Date and time this update occurred.
   * @format date-time
   */
  updated_at: string

  /**
   * The customer user ID.
   */
  user_id: string
}

/**
 *
 * @source https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-sent
 */
export type RawPaddleInvoiceSentV2Alert = {
  /**
   * The alert name.
   */
  alert_name: 'invoice_sent_v2'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The two-letter ISO country code of the customer. For a full list of supported countries, see our [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries) page.
   */
  country: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * Custom data sent as key value pairs. JSON array sent as a string.
   */
  custom_data: string

  /**
   * The address of the customer for whom this invoice is issued.
   */
  customer_address: string

  /**
   * The city the customer is from.
   */
  customer_city: string

  /**
   * The unique identifier for this customer. Integer value sent as a string.
   */
  customer_id: string

  /**
   * The name of the customer for whom this invoice is issued.
   */
  customer_name: string

  /**
   * The ZIP code of the customer.
   */
  customer_zipcode: string

  /**
   * Invoice issue date. Sent as a string.
   */
  date_issued: string

  /**
   * Invoice payment terms in days.
   */
  days_until_overdue: number

  /**
   * The email address of the customer for whom this invoice is issued.
   * @format email
   */
  email: string

  /**
   * Gross invoice amount (amount including tax).
   */
  gross_amount: number

  /**
   * Invoice line items. JSON array sent as a string.
   */
  issued_items: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * Custom order number specified for this invoice.
   */
  purchase_order_number: string

  /**
   * Status of the invoice.
   */
  status: 'unpaid' | 'pending_acceptance'
}

/**
 *
 * @source https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-paid
 */
export type RawPaddleInvoicePaidV2Alert = {
  /**
   * The alert name.
   */
  alert_name: 'invoice_paid_v2'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The two-letter ISO country code of the customer. For a full list of supported countries, see our  [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries) page.
   */
  country: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * Custom data sent as key value pairs. JSON array sent as a string.
   */
  custom_data: string

  /**
   * The address of the customer for whom this invoice is was issued.
   */
  customer_address: string

  /**
   * The city the customer is from.
   */
  customer_city: string

  /**
   * The unique identifier for this customer. Integer value sent as a string.
   */
  customer_id: string

  /**
   * The name of the customer for whom this invoice was issued.
   */
  customer_name: string

  /**
   * The ZIP code of the customer.
   */
  customer_zipcode: string

  /**
   * Invoice issue date. Sent as a string.
   */
  date_issued: string

  /**
   * Invoice payment terms in days.
   */
  days_until_overdue: number

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * Gross invoice amount (amount including tax).
   */
  gross_amount: number

  /**
   * Invoice line items. JSON array sent as a string.
   */
  issued_items: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * Custom order number specified for this invoice. Max Length: `<=255 characters
   */
  purchase_order_number: string

  /**
   * Status of the invoice.
   */
  status: 'paid'
}

/**
 *
 * @source https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-overdue
 */
export type RawPaddleInvoiceOverdueV2Alert = {
  /**
   * The alert name.
   */
  alert_name: 'invoice_overdue_v2'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The two-letter ISO country code of the customer. For a full list of supported countries, see our  [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries)  page.
   */
  country: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * Custom data sent as key value pairs. JSON array sent as a string.
   */
  custom_data: string

  /**
   * The address of the customer for whom this invoice was issued.
   */
  customer_address: string

  /**
   * The city the customer is from.
   */
  customer_city: string

  /**
   * The unique identifier for this customer. Integer value sent as a string.
   */
  customer_id: string

  /**
   * The name of the customer for whom this invoice was issued.
   */
  customer_name: string

  /**
   * The ZIP code of the customer.
   */
  customer_zipcode: string

  /**
   * Invoice issue date. Sent as a string.
   */
  date_issued: string

  /**
   * Invoice payment terms in days.
   */
  days_until_overdue: number

  /**
   * The email address of the customer for whom this invoice was issued.
   * @format email
   */
  email: string

  /**
   * Gross invoice amount (amount including tax).
   */
  gross_amount: number

  /**
   * Invoice line items. JSON array sent as a string.
   */
  issued_items: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * Custom order number specified for this invoice. Max Length: `<=255 characters
   */
  purchase_order_number: string

  /**
   * Status of the invoice.
   */
  status: 'overdue'
}

/**
 *
 * @source https://developer.paddle.com/webhook-reference/manual-invoicing-alerts/invoice-cancelled
 */
export type RawPaddleInvoiceCancelledV2Alert = {
  /**
   * The alert name.
   */
  alert_name: 'invoice_cancelled_v2'

  /**
   * The unique identifier for this Paddle webhook alert. Integer value sent as a string.
   */
  alert_id: string

  /**
   * The two-letter ISO country code of the customer. For a full list of supported countries, see our [Supported Countries](https://developer.paddle.com/reference/platform-parameters/supported-countries) page.
   */
  country: string

  /**
   * The three-letter ISO currency code. For a full list of supported currencies, see our [Supported Currencies](https://developer.paddle.com/reference/platform-parameters/supported-currencies) page.
   */
  currency: string

  /**
   * Custom data sent as key value pairs. JSON array sent as a string.
   */
  custom_data: string

  /**
   * The address of the customer this invoice is for.
   */
  customer_address: string

  /**
   * The city the customer is from.
   */
  customer_city: string

  /**
   * The unique identifier for this customer. Integer value sent as a string.
   */
  customer_id: string

  /**
   * The name of the customer this invoice is for.
   */
  customer_name: string

  /**
   * The ZIP code of the customer.
   */
  customer_zipcode: string

  /**
   * Invoice issue date. Sent as a string.
   */
  date_issued: string

  /**
   * Invoice payment terms in days.
   */
  days_until_overdue: number

  /**
   * The email address of the customer.
   * @format email
   */
  email: string

  /**
   * Gross invoice amount (amount including tax).
   */
  gross_amount: number

  /**
   * Invoice line items. JSON array sent as a string.
   */
  issued_items: string

  /**
   * This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](https://developer.paddle.com/webhook-reference/verifying-webhooks).
   */
  p_signature: string

  /**
   * Custom order number specified for this invoice. Max Length: `<=255 characters`
   */
  purchase_order_number: string

  /**
   * Status of the invoice.
   */
  status: 'cancelled'
}
