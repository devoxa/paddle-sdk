// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

/** An alert fired by Paddle through a configured webhook */
export type RawPaddleWebhookAlert =
  | RawPaddleSubscriptionCreatedAlert
  | RawPaddleSubscriptionUpdatedAlert
  | RawPaddleSubscriptionCancelledAlert
  | RawPaddleSubscriptionPaymentSucceededAlert
  | RawPaddleSubscriptionPaymentFailedAlert
  | RawPaddleSubscriptionPaymentRefundedAlert
  | RawPaddlePaymentSucceededAlert
  | RawPaddlePaymentRefundedAlert
  | RawPaddleLockerProcessedAlert
  | RawPaddlePaymentDisputeCreatedAlert
  | RawPaddlePaymentDisputeClosedAlert
  | RawPaddleHighRiskTransactionCreatedAlert
  | RawPaddleHighRiskTransactionUpdatedAlert
  | RawPaddleTransferCreatedAlert
  | RawPaddleTransferPaidAlert
  | RawPaddleNewAudienceMemberAlert
  | RawPaddleUpdateAudienceMemberAlert
  | RawPaddleInvoicePaidAlert
  | RawPaddleInvoiceSentAlert
  | RawPaddleInvoiceOverdueAlert

/** Fired when a new subscription is created, and a customer has successfully subscribed. */
export type RawPaddleSubscriptionCreatedAlert = {
  alert_name: 'subscription_created'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** A URL of the ‘Cancellation’ page. [See the documentation](/guides/how-tos/subscriptions/cancel-and-pause) for update / cancellation URLs. You should store this URL along with the subscribed customer in your database. */
  cancel_url: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The date the next payment is due on this subscription.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  next_bill_date: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** Referrer website URL(s) from where the traffic originated from. */
  source: string
  /** This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'
  /** This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.
@pattern \d+ */
  subscription_id: string
  /** The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
@pattern \d+ */
  subscription_plan_id: string
  /** The price per unit of the subscription.
@pattern (\d+\.\d{1,2}) */
  unit_price: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  /** A URL of the ‘Update Billing Information’ page. [See the documentation](/guides/how-tos/subscriptions/update-payment-details) for update / cancellation URLs. You should store this URL along with the subscribed customer in your database. */
  update_url: string
  linked_subscriptions: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when the plan, price, quantity, status of a subscription changes, or if the payment date is rescheduled manually. */
export type RawPaddleSubscriptionUpdatedAlert = {
  alert_name: 'subscription_updated'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** A URL of the ‘Cancellation’ page. [See the documentation](/guides/how-tos/subscriptions/cancel-and-pause) for update / cancellation URLs. You should store this URL along with the subscribed customer in your database. */
  cancel_url: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The new total recurring price of the subscription. Please note that this will only be returned if the subscription has quantity enabled. Decimal sent as a string.
@pattern (\d+\.\d{1,3}) */
  new_price: string
  /** The new quantity applied to a quantity enabled subscription. Please note that this will only be returned if the subscription has quantity enabled.
@pattern \d+ */
  new_quantity: string
  /** The new price per unit of the subscription. Please note that this will only be returned if the subscription has quantity enabled. Decimal sent as a string.
@pattern (\d+\.\d{1,2}) */
  new_unit_price: string
  /** The date the next payment is due on this subscription.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  next_bill_date: string
  /** The previous total recurring price of the subscription. Decimal sent as a string.
@pattern (\d+\.\d{1,3}) */
  old_price: string
  /** The previous quantity applied to the subscription. Please note that this will only be returned if the subscription has quantity enabled.
@pattern \d+ */
  old_quantity: string
  /** The previous price per unit of the subscription. Please note that this will only be returned if the subscription has quantity enabled. Decimal sent as a string.
@pattern (\d+\.\d{1,2}) */
  old_unit_price: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'
  /** This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.
@pattern \d+ */
  subscription_id: string
  /** The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
@pattern \d+ */
  subscription_plan_id: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  /** A URL of the ‘Update Billing Information’ page. [See the documentation](/guides/how-tos/subscriptions/update-payment-details) for update / cancellation URLs. You should store this URL along with the subscribed customer in your database. */
  update_url: string
  /** The next bill date before the subscription was updated.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  old_next_bill_date: string
  /** The subscription status before the subscription was updated. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  old_status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'
  /** The ID of the subscription plan before the subscription was updated.
@pattern \d+ */
  old_subscription_plan_id: string
  /** The date and time when the subscription was requested to be paused. The subscription will be paused on the `paused_from` date.
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  paused_at?: string
  /** The date when the subscription payment is paused.
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  paused_from?: string
  /** The reason why the subscription was paused. For example, `delinquent` if the payment failed and the rule specified in the [dunning settings](https://vendors.paddle.com/subscription-settings) was to pause the subscription. */
  paused_reason?: 'delinquent' | 'voluntary'
  linked_subscriptions: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a subscription is cancelled. */
export type RawPaddleSubscriptionCancelledAlert = {
  alert_name: 'subscription_cancelled'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The date the cancellation should come into effect, taking the customer’s balance into account. The customer should be able to use the service they've subscribed to up until this date.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  cancellation_effective_date: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'
  /** This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.
@pattern \d+ */
  subscription_id: string
  /** The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
@pattern \d+ */
  subscription_plan_id: string
  /** The price per unit of the subscription.
@pattern (\d+\.\d{1,2}) */
  unit_price: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  linked_subscriptions: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a payment for a subscription is received successfully. */
export type RawPaddleSubscriptionPaymentSucceededAlert = {
  alert_name: 'subscription_payment_succeeded'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The three letter ISO currency code of the vendor’s default currency at the time of the transaction. Eg: `USD`, `GBP`.
@pattern [A-Z]{3} */
  balance_currency: string
  /** Amount of balance increase as a result of this payment.     
@pattern ^\d+(\.\d{1,2})?$ */
  balance_earnings: string
  /** The fee amount taken from the vendor, in the vendor’s default currency at the time of the transaction.    
@pattern ^\d+(\.\d{1,2})?$ */
  balance_fee: string
  /** The total amount received from the customer as a result of the payment, in the vendor’s default currency at the time of the transaction.      
@pattern ^\d+(\.\d{1,2})?$ */
  balance_gross: string
  /** The amount of tax received from the customer, in the vendor’s default currency at the time of the transaction.    
@pattern ^\d+(\.\d{1,2})?$ */
  balance_tax: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The two-letter ISO country code of the customer. Eg: `US`, `GB`. See [Supported Countries](/reference/platform-parameters/supported-countries).
@pattern [A-Z]{2} */
  country: string
  /** The coupon code that was used on this order */
  coupon: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The name of the customer (if collected). */
  customer_name: string
  /** The total amount (after taxes and fees) you earned from this payment.
@pattern ^\d+(\.\d{1,2})?$ */
  earnings: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The total amount in Paddle fees for this payment.
@pattern ^\d+(\.\d{1,2})?$ */
  fee: string
  /** The value of this field indicates whether it is the customer’s first payment for this subscription. */
  initial_payment: '0' | '1'
  /** Number of payments made to date. Integer sent as string.
@pattern \d+ */
  instalments: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The date the next payment is due on this subscription.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  next_bill_date: string
  /** The total amount that the customer will be charged for on their upcoming payment, in the subscription’s currency.
@pattern ^\d+(\.\d{1,2})?$ */
  next_payment_amount: string
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** Payment method used to make the transaction. */
  payment_method: 'card' | 'paypal' | 'free' | 'apple-pay' | 'wire-transfer'
  /** Amount of tax paid as a result of this payment.
@pattern ^\d+(\.\d{1,2})?$ */
  payment_tax: string
  /** Subscription plan name. */
  plan_name: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** URL containing the customer receipt. */
  receipt_url: string
  /** The total amount the customer was charged for this payment. Decimal sent as string.
@pattern ^\d+(\.\d{1,2})?$ */
  sale_gross: string
  /** This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'
  /** This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.
@pattern \d+ */
  subscription_id: string
  /** The unique ID of the subscription payment.
@pattern \d+ */
  subscription_payment_id: string
  /** The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
@pattern \d+ */
  subscription_plan_id: string
  /** The price per unit of the subscription.
@pattern (\d+\.\d{1,2}) */
  unit_price: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a payment for a subscription fails. */
export type RawPaddleSubscriptionPaymentFailedAlert = {
  alert_name: 'subscription_payment_failed'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The amount that we tried to charge for this payment. Decimal value sent as a string.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** A URL of the ‘Cancellation’ page. [See the documentation](/guides/how-tos/subscriptions/cancel-and-pause) for update / cancellation URLs. You should store this URL along with the subscribed customer in your database. */
  cancel_url: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The date that we will next try to process this failed payment.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  next_retry_date: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'
  /** This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.
@pattern \d+ */
  subscription_id: string
  /** The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
@pattern \d+ */
  subscription_plan_id: string
  /** The price per unit of the subscription.
@pattern (\d+\.\d{1,2}) */
  unit_price: string
  /** A URL of the ‘Update Billing Information’ page. [See the documentation](/guides/how-tos/subscriptions/update-payment-details) for update / cancellation URLs. You should store this URL along with the subscribed customer in your database. */
  update_url: string
  /** The unique ID of the subscription payment.
@pattern \d+ */
  subscription_payment_id: string
  /** Number of payments made to date. Integer sent as string.
@pattern \d+ */
  instalments: string
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  /** Number of failed payment attempts made so far for this instalment. This number will reset back to 1 if the “Reset Attempts” button in the subscription management page is clicked.
@pattern \d+ */
  attempt_number: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a refund for a subscription payment is issued. */
export type RawPaddleSubscriptionPaymentRefundedAlert = {
  alert_name: 'subscription_payment_refunded'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The amount refunded, partial refunds are possible. Decimal value sent as a string.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The three letter ISO currency code of the vendor’s default currency at the time of the transaction. Eg: `USD`, `GBP`.
@pattern [A-Z]{3} */
  balance_currency: string
  /** The amount of revenue taken from the vendor’s earnings as a result of this refund, in the vendor’s default currency at the time of the transaction. It returns a positive or negative value. Eg: If you issue a VAT-only refund, this will increase the vendor’s earnings instead of decreasing it, to reflect this we use a negative value. Please also note that if the earnings of the order being refunded are being split between vendors, the earnings decrease amount will not include the other vendor’s fee, only yours. (eg. If you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings will be reduced only by 85%).
@pattern ^-?\d+(\.\d{1,2})?$ */
  balance_earnings_decrease: string
  /** The fee amount returned to the vendor, in the vendor’s default currency at the time of the transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_fee_refund: string
  /** The total amount returned to the customer as a result of this refund, in the vendor’s default currency at the time of the transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_gross_refund: string
  /** The amount of tax returned to the customer, in the vendor’s default currency at the time of the transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_tax_refund: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The amount of revenue taken from the vendor’s earnings as a result of this refund, in the currency of the original transaction. It returns a positive or negative value. E.g: if you issue a VAT-only refund, this will increase the vendor’s earnings instead of decreasing it, to reflect this we use a negative value. Please also note that if the earnings of the order being refunded are being split between vendors, the earnings decrease amount will not include the other vendor’s fee, only yours: for example if you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings will only be reduced by 85%. 
@pattern ^-?\d+(\.\d{1,2})?$ */
  earnings_decrease: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The fee amount returned to the vendor, in the currency of the original transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  fee_refund: string
  /** The total amount returned to the customer as a result of this refund, in the currency of the original transaction. 
@pattern ^\d+(\.\d{1,2})?$ */
  gross_refund: string
  /** The value of this field indicates whether it is the customer’s first payment for this subscription. */
  initial_payment: '0' | '1'
  /** Number of payments made to date. Integer sent as string.
@pattern \d+ */
  instalments: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** Refund reason note. */
  refund_reason: string
  /** The type of refund. */
  refund_type: 'full' | 'vat' | 'partial'
  /** This is the current status of the subscription. A list of possible values and their meanings can be found under [Event Statuses](/reference/platform-parameters/event-statuses). */
  status: 'active' | 'trialing' | 'past_due' | 'paused' | 'deleted'
  /** This is the unique Subscription ID for this customer’s subscription. You should store this with the customer in your database, as it is needed for making API calls.
@pattern \d+ */
  subscription_id: string
  /** The unique ID of the subscription payment.
@pattern \d+ */
  subscription_payment_id: string
  /** The ID of the Subscription Plan the customer is subscribed to. (This is the value that will change upon plan change).
@pattern \d+ */
  subscription_plan_id: string
  /** The amount of tax returned to the customer, in the currency of the original transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  tax_refund: string
  /** The price per unit of the subscription.
@pattern (\d+\.\d{1,2}) */
  unit_price: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a payment is made into your Paddle account. */
export type RawPaddlePaymentSucceededAlert = {
  alert_name: 'payment_succeeded'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The three letter ISO currency code of the vendor’s default currency at the time of the transaction. Eg: `USD`, `GBP`.
@pattern [A-Z]{3} */
  balance_currency: string
  /** The amount credited to your balance in your default currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_earnings: string
  /** The fees taken by Paddle in your dashboard balance currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_fee: string
  /** The sale value in your dashboard balance currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_gross: string
  /** The amount paid in tax in your dashboard balance currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_tax: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The two letter ISO country code of the customer. Eg: `US`, `GB`.
@pattern [A-Z]{2} */
  country: string
  /** The coupon code that was used on this order */
  coupon: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The name of the customer this payment is from (if collected). */
  customer_name: string
  /** The amount of this payment that was credited to your balance.
@pattern ^\d+(\.\d{1,2})?$ */
  earnings: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The fee taken by Paddle for this payment.
@pattern ^\d+(\.\d{1,2})?$ */
  fee: string
  /** This field is deprecated and will be removed in a future update. */
  ip: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** Payment method used to make the transaction. */
  payment_method: 'card' | 'paypal' | 'free' | 'apple-pay' | 'wire-transfer'
  /** The amount of this payment that was paid in tax/VAT.
@pattern ^\d+(\.\d{1,2})?$ */
  payment_tax: string
  /** The dashboard ID of the product purchased in this order.
@pattern \d+ */
  product_id: string
  /** The name of the product included in the transaction. */
  product_name: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** A URL where the receipt for the transaction can be retrieved. */
  receipt_url: string
  /** The total value of the sale (including tax) in the sale currency.
@pattern ^\d+(\.\d{1,2})?$ */
  sale_gross: string
  /** Whether the dashboard price was overridden. */
  used_price_override: 'true' | 'false'
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a payment is refunded. */
export type RawPaddlePaymentRefundedAlert = {
  alert_name: 'payment_refunded'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The amount refunded, partial refunds are possible.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The three letter ISO currency code of the vendor’s default currency at the time of the transaction. Eg: `USD`, `GBP`.
@pattern [A-Z]{3} */
  balance_currency: string
  /** The amount of revenue taken from the vendor’s earnings as a result of this refund, in the vendor’s default currency at the time of the transaction. It returns a positive or negative value. Eg: If you issue a VAT-only refund, this will increase the vendor’s earnings instead of decreasing it, to reflect this we use a negative value. Please also note that if the earnings of the order being refunded are being split between vendors, the earnings decrease amount will not include the other vendor’s fee, only yours. (eg. If you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings will be reduced only by 85%).
@pattern ^-?\d+(\.\d{1,2})?$ */
  balance_earnings_decrease: string
  /** The fee amount returned to the vendor, in the vendor’s default currency at the time of the transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_fee_refund: string
  /** The total amount returned to the customer as a result of this refund, in the vendor’s default currency at the time of the transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_gross_refund: string
  /** The amount of tax returned to the customer, in the vendor’s default currency at the time of the transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_tax_refund: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The amount of revenue taken from the vendor’s earnings as a result of this refund, in the currency of the original transaction. It returns a positive or negative value. E.g: if you issue a VAT-only refund, this will increase the vendor’s earnings instead of decreasing it, to reflect this we use a negative value. Please also note that if the earnings of the order being refunded are being split between vendors, the earnings decrease amount will not include the other vendor’s fee, only yours: for example if you are giving 15% of your earnings to another vendor and keeping 85%, your balance earnings will only be reduced by 85%. 
@pattern ^-?\d+(\.\d{1,2})?$ */
  earnings_decrease: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The fee amount returned to the vendor, in the currency of the original transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  fee_refund: string
  /** The total amount returned to the customer as a result of this refund, in the currency of the original transaction. 
@pattern ^\d+(\.\d{1,2})?$ */
  gross_refund: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** Refund reason note. */
  refund_reason: string
  /** The type of refund. */
  refund_type: 'full' | 'vat' | 'partial'
  /** The amount of tax returned to the customer, in the currency of the original transaction.
@pattern ^\d+(\.\d{1,2})?$ */
  tax_refund: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when an order is created after a successful payment event. */
export type RawPaddleLockerProcessedAlert = {
  alert_name: 'locker_processed'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The value of this field `1` or `0` indicates whether the order originated from a checkout recovery email. */
  checkout_recovery: '0' | '1'
  /** The coupon code that was used on this order */
  coupon: string
  /** The download URL of the purchased product. */
  download: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The instructions that have been sent to the customer. */
  instructions: string
  /** The license number associated with the order (when applicable). */
  licence: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** The dashboard ID of the product purchased in this order.
@pattern \d+ */
  product_id: string
  /** The number of products or subscription seats sold in the transaction.
@pattern \d+ */
  quantity: string
  /** Referrer website URL(s) from where the traffic originated from. */
  source: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a dispute/chargeback is raised for a card transaction. */
export type RawPaddlePaymentDisputeCreatedAlert = {
  alert_name: 'payment_dispute_created'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The amount of the transaction in dispute.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The fee you were charged for this dispute (in USD).
@pattern ^\d+(\.\d{1,2})?$ */
  fee_usd: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The status of this dispute. */
  status: 'open'
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a dispute/chargeback is closed for a card transaction. This indicates that the dispute/chargeback was contested and won by Paddle. */
export type RawPaddlePaymentDisputeClosedAlert = {
  alert_name: 'payment_dispute_closed'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The amount of the dispute.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The fee you were refunded for this dispute being closed (in USD).
@pattern ^\d+(\.\d{1,2})?$ */
  fee_usd: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The status of this dispute. */
  status: 'closed'
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a transaction is flagged as high risk. */
export type RawPaddleHighRiskTransactionCreatedAlert = {
  alert_name: 'high_risk_transaction_created'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The case id for the flagged order.
@pattern \d+ */
  case_id: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** Date and time this order was flagged.
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  created_at: string
  /** The email address of the customer. */
  customer_email_address: string
  /** The customer user id.
@pattern \d+ */
  customer_user_id: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The dashboard ID of the product purchased in this order.
@pattern \d+ */
  product_id: string
  /** The risk value associated with the order ranging from 0.10 to 99.99: a higher value indicates a higher chance of the order being fraudulent.
@pattern ^\d+(\.\d{1,2})?$ */
  risk_score: string
  /** The status of the order. */
  status: 'pending'
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a flagged transaction is approved or rejected. */
export type RawPaddleHighRiskTransactionUpdatedAlert = {
  alert_name: 'high_risk_transaction_updated'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The case id for the flagged order.
@pattern \d+ */
  case_id: string
  /** The checkout id of the order created. */
  checkout_id: string
  /** Date and time this order was flagged.
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  created_at: string
  /** The email address of the customer. */
  customer_email_address: string
  /** The customer user id.
@pattern \d+ */
  customer_user_id: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** The Paddle Order ID for this payment. This can be used to look up the order within your Seller Dashboard.
@pattern ^\d+(-\d+)? */
  order_id: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The dashboard ID of the product purchased in this order.
@pattern \d+ */
  product_id: string
  /** The risk value associated with the order ranging from 0.10 to 99.99: a higher value indicates a higher chance of the order being fraudulent.
@pattern ^\d+(\.\d{1,2})?$ */
  risk_score: string
  /** Status of the flagged order. */
  status: 'accepted' | 'rejected'
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a new transfer/payout is created for your account. */
export type RawPaddleTransferCreatedAlert = {
  alert_name: 'transfer_created'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The amount of the payout.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The ID of the payout. Can be used to lookup the payout within your Paddle Dashboard.
@pattern \d+ */
  payout_id: string
  /** The payout status. */
  status: 'unpaid'
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a new transfer/payout is marked as paid for your account. */
export type RawPaddleTransferPaidAlert = {
  alert_name: 'transfer_paid'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The amount of the payout.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The ID of the payout. Can be used to lookup the payout within your Paddle Dashboard.
@pattern \d+ */
  payout_id: string
  /** The payout status. */
  status: 'paid'
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a customer opts in to receive marketing communication from you. */
export type RawPaddleNewAudienceMemberAlert = {
  alert_name: 'new_audience_member'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The date and time the customer has been added.
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  created_at: string
  /** The email address of the customer. */
  email: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The value of this field `1` or `0` indicates whether the user has agreed to receive marketing messages from the vendor. */
  marketing_consent: '0' | '1'
  /** Comma-separated list of Paddle IDs of the products the customer has purchased. */
  products: string
  /** Source of customer acquisition. */
  source: 'Checkout' | 'Trial' | 'Order' | 'Activation' | 'Import' | 'Application'
  /** This field is deprecated and will be removed in a future update. Please refer to the `marketing_consent` field instead. */
  subscribed: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when the information of an audience member is updated. */
export type RawPaddleUpdateAudienceMemberAlert = {
  alert_name: 'update_audience_member'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
  /** The customer’s new email address. */
  new_customer_email: string
  /** The new marketing consent which will be `0` or `1` depending on whether the customer has provided consent to be contacted with marketing messages. */
  new_marketing_consent: '0' | '1'
  /** The customer’s previous email address. */
  old_customer_email: string
  /** The previous marketing consent which will be `0` or `1` depending on whether the customer has provided consent to be contacted with marketing messages. */
  old_marketing_consent: '0' | '1'
  /** A comma-separated list of the Paddle IDs of the products the customer has purchased. */
  products: string
  /** Source of customer acquisition. */
  source: 'Checkout' | 'Trial' | 'Order' | 'Activation' | 'Import' | 'Application'
  /** Date and time this update occurred.
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  updated_at: string
  /** The customer user id.
@pattern \d+ */
  user_id: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
}

/** Fired when a manual invoice has been successfully paid by a customer. */
export type RawPaddleInvoicePaidAlert = {
  alert_name: 'invoice_paid'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The unique identifier for this invoice payment. Integer value sent as a string.
@pattern \d+ */
  payment_id: string
  /** The amount of the sale.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The total value of the sale (including tax) in the sale currency.
@pattern ^\d+(\.\d{1,2})?$ */
  sale_gross: string
  /** Number of days from the `invoiced_at` date before it becomes overdue.
@pattern \d+ */
  term_days: string
  /** Status of the invoice. */
  status: 'paid'
  /** Custom order number specified for this invoice. */
  purchase_order_number: string
  /** The date and time the buyer was invoiced at in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  invoiced_at: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The dashboard ID of the product purchased in this order.
@pattern \d+ */
  product_id: string
  /** The name of the product included in the invoice. */
  product_name: string
  /** Custom additional information included in the invoice. */
  product_additional_information: string
  /** The unique identifier for this customer. Integer value sent as a string.
@pattern \d+ */
  customer_id: string
  /** The name of the customer this invoice is for. */
  customer_name: string
  /** The email address of the customer. */
  email: string
  /** The sales tax identifier (VAT number) of the customer this invoice is for. */
  customer_vat_number: string
  /** The company number of the customer this invoice is for. */
  customer_company_number: string
  /** The address of the customer this invoice is for. */
  customer_address: string
  /** The city the customer is from. */
  customer_city: string
  /** The state the customer is from. */
  customer_state: string
  /** The ZIP code of the customer. */
  customer_zipcode: string
  /** The two-letter ISO country code of the customer. Eg: `US`, `GB`. See [Supported Countries](/reference/platform-parameters/supported-countries).
@pattern [A-Z]{2} */
  country: string
  /** The unique identifier for this contract. Integer value sent as a string.
@pattern \d+ */
  contract_id: string
  /** The start date of the contract.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  contract_start_date: string
  /** The end date of the contract.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  contract_end_date: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The date the contract was created.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  date_created: string
  /** The three letter ISO currency code of the vendor’s default currency at the time of the transaction. Eg: `USD`, `GBP`.
@pattern [A-Z]{3} */
  balance_currency: string
  /** The amount of this payment that was paid in tax/VAT.
@pattern ^\d+(\.\d{1,2})?$ */
  payment_tax: string
  /** Payment method used to make the transaction. */
  payment_method: 'wire-transfer'
  /** The fee taken by Paddle for this payment.
@pattern ^\d+(\.\d{1,2})?$ */
  fee: string
  /** The amount of this payment that was credited to your balance.
@pattern ^\d+(\.\d{1,2})?$ */
  earnings: string
  /** The amount credited to your balance in your default currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_earnings: string
  /** The fees taken by Paddle in your dashboard balance currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_fee: string
  /** The amount paid in tax in your dashboard balance currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_tax: string
  /** The sale value in your dashboard balance currency.
@pattern ^\d+(\.\d{1,2})?$ */
  balance_gross: string
  /** The date the payment was reconciled on.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  date_reconciled: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
}

/** Fired when a manual invoice has been successfully sent to a customer. */
export type RawPaddleInvoiceSentAlert = {
  alert_name: 'invoice_sent'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The unique identifier for this invoice payment. Integer value sent as a string.
@pattern \d+ */
  payment_id: string
  /** The amount of the sale.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The total value of the sale (including tax) in the sale currency.
@pattern ^\d+(\.\d{1,2})?$ */
  sale_gross: string
  /** Number of days from the `invoiced_at` date before it becomes overdue.
@pattern \d+ */
  term_days: string
  /** Status of the invoice. */
  status: 'unpaid'
  /** Custom order number specified for this invoice. */
  purchase_order_number: string
  /** The date and time the buyer was invoiced at in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  invoiced_at: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The dashboard ID of the product purchased in this order.
@pattern \d+ */
  product_id: string
  /** The name of the product included in the invoice. */
  product_name: string
  /** Custom additional information included in the invoice. */
  product_additional_information: string
  /** The unique identifier for this customer. Integer value sent as a string.
@pattern \d+ */
  customer_id: string
  /** The name of the customer this invoice is for. */
  customer_name: string
  /** The email address of the customer. */
  email: string
  /** The sales tax identifier (VAT number) of the customer this invoice is for. */
  customer_vat_number: string
  /** The company number of the customer this invoice is for. */
  customer_company_number: string
  /** The address of the customer this invoice is for. */
  customer_address: string
  /** The city the customer is from. */
  customer_city: string
  /** The state the customer is from. */
  customer_state: string
  /** The ZIP code of the customer. */
  customer_zipcode: string
  /** The two-letter ISO country code of the customer. Eg: `US`, `GB`. See [Supported Countries](/reference/platform-parameters/supported-countries).
@pattern [A-Z]{2} */
  country: string
  /** The unique identifier for this contract. Integer value sent as a string.
@pattern \d+ */
  contract_id: string
  /** The start date of the contract.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  contract_start_date: string
  /** The end date of the contract.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  contract_end_date: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The date the contract was created.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  date_created: string
  /** The three letter ISO currency code of the vendor’s default currency at the time of the transaction. Eg: `USD`, `GBP`.
@pattern [A-Z]{3} */
  balance_currency: string
  /** The amount of this payment that was paid in tax/VAT.
@pattern ^\d+(\.\d{1,2})?$ */
  payment_tax: string
  /** Payment method used to make the transaction. */
  payment_method: 'wire-transfer'
  /** The fee taken by Paddle for this payment.
@pattern ^\d+(\.\d{1,2})?$ */
  fee: string
  /** The amount of this payment that was credited to your balance.
@pattern ^\d+(\.\d{1,2})?$ */
  earnings: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
}

/** Fired when a manual invoice has exceeded the payment term and is now overdue. */
export type RawPaddleInvoiceOverdueAlert = {
  alert_name: 'invoice_overdue'
  /** The unique identifier for this Paddle webhook alert. Integer value sent as a string.
@pattern \d+ */
  alert_id: string
  /** The unique identifier for this invoice payment. Integer value sent as a string.
@pattern \d+ */
  payment_id: string
  /** The amount of the sale.
@pattern ^\d+(\.\d{1,2})?$ */
  amount: string
  /** The total value of the sale (including tax) in the sale currency.
@pattern ^\d+(\.\d{1,2})?$ */
  sale_gross: string
  /** Number of days from the `invoiced_at` date before it becomes overdue.
@pattern \d+ */
  term_days: string
  /** Status of the invoice. */
  status: 'overdue'
  /** Custom order number specified for this invoice. */
  purchase_order_number: string
  /** The date and time the buyer was invoiced at in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  invoiced_at: string
  /** The three-letter ISO currency code. Eg: `USD`, `GBP`. See [Supported Currencies](/reference/platform-parameters/supported-currencies).
@pattern [A-Z]{3} */
  currency: string
  /** The dashboard ID of the product purchased in this order.
@pattern \d+ */
  product_id: string
  /** The name of the product included in the invoice. */
  product_name: string
  /** Custom additional information included in the invoice. */
  product_additional_information: string
  /** The unique identifier for this customer. Integer value sent as a string.
@pattern \d+ */
  customer_id: string
  /** The name of the customer this invoice is for. */
  customer_name: string
  /** The email address of the customer. */
  email: string
  /** The sales tax identifier (VAT number) of the customer this invoice is for. */
  customer_vat_number: string
  /** The company number of the customer this invoice is for. */
  customer_company_number: string
  /** The address of the customer this invoice is for. */
  customer_address: string
  /** The city the customer is from. */
  customer_city: string
  /** The state the customer is from. */
  customer_state: string
  /** The ZIP code of the customer. */
  customer_zipcode: string
  /** The two-letter ISO country code of the customer. Eg: `US`, `GB`. See [Supported Countries](/reference/platform-parameters/supported-countries).
@pattern [A-Z]{2} */
  country: string
  /** The unique identifier for this contract. Integer value sent as a string.
@pattern \d+ */
  contract_id: string
  /** The start date of the contract.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  contract_start_date: string
  /** The end date of the contract.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  contract_end_date: string
  /** This field contains any values that you passed into the checkout using the `passthrough` parameter. See the [Pass Parameters documentation](/guides/how-tos/checkout/pass-parameters#sending-additional-user-data) for more information. */
  passthrough: string
  /** The date the contract was created.
@pattern ^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$ */
  date_created: string
  /** The three letter ISO currency code of the vendor’s default currency at the time of the transaction. Eg: `USD`, `GBP`.
@pattern [A-Z]{3} */
  balance_currency: string
  /** The amount of this payment that was paid in tax/VAT.
@pattern ^\d+(\.\d{1,2})?$ */
  payment_tax: string
  /** Payment method used to make the transaction. */
  payment_method: 'wire-transfer'
  /** The fee taken by Paddle for this payment.
@pattern ^\d+(\.\d{1,2})?$ */
  fee: string
  /** The amount of this payment that was credited to your balance.
@pattern ^\d+(\.\d{1,2})?$ */
  earnings: string
  /** This field contains an encrypted token that you can use to verify the request authenticity. See [Verifying Webhooks](/webhook-reference/verifying-webhooks). */
  p_signature: string
  /** The date and time the event was triggered in UTC (Coordinated Universal Time).
@pattern [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9] */
  event_time: string
}
