import { createVerify } from 'crypto'
import { stableSerialize, parseUtcDate } from './helpers'
import {
  RawPaddleWebhookAlert,
  RawPaddleSubscriptionCreatedAlert,
  RawPaddleSubscriptionUpdatedAlert,
  RawPaddleSubscriptionCancelledAlert,
  RawPaddleSubscriptionPaymentSucceededAlert,
} from './__generated__/webhook-alerts.interface'
import { PaddleSdkException } from './exceptions'
import {
  PaddleSdkSubscriptionCreatedAlert,
  PaddleSdkSubscriptionUpdatedAlert,
  PaddleSdkSubscriptionCancelledAlert,
  PaddleSdkSubscriptionPaymentSucceededAlert,
} from './interfaces'

export * from './interfaces'

export interface PaddleSdkOptions {
  publicKey: string
}

export class PaddleSdk {
  private readonly publicKey: string

  constructor(options: PaddleSdkOptions) {
    if (!options.publicKey) {
      throw new PaddleSdkException('PaddleSdk was called without a publicKey')
    }

    this.publicKey = options.publicKey
  }

  verifyWebhookAlert(body: any): body is RawPaddleWebhookAlert {
    if (typeof body !== 'object') return false

    const { p_signature: signature, ...postBodyRest } = body || {}
    if (!signature || typeof signature !== 'string') return false

    const serializedPostBody = stableSerialize(postBodyRest)

    const verifier = createVerify('sha1')
    verifier.update(serializedPostBody)
    verifier.end()

    return verifier.verify(this.publicKey, signature, 'base64')
  }

  parseWebhookAlert<T extends any>(body: any) {
    if (!this.verifyWebhookAlert(body)) {
      throw new PaddleSdkException('Failed validating alert body')
    }

    switch (body.alert_name) {
      case 'subscription_created':
        return this.parseSubscriptionCreatedWebhookAlert<T>(body)
      case 'subscription_updated':
        return this.parseSubscriptionUpdatedWebhookAlert<T>(body)
      case 'subscription_cancelled':
        return this.parseSubscriptionCancelledWebhookAlert<T>(body)
      case 'subscription_payment_succeeded':
        return this.parseSubscriptionPaymentSucceededWebhookAlert<T>(body)
    }

    throw new PaddleSdkException(
      `Implementation missing: Can not parse alert of type ${body.alert_name}`
    )
  }

  private parsePassthrough(passthrough: string) {
    try {
      return JSON.parse(passthrough)
    } catch (err) {
      throw new PaddleSdkException('Failed parsing passthrough: ' + err.message)
    }
  }

  private parseSubscriptionCreatedWebhookAlert<T>(
    body: RawPaddleSubscriptionCreatedAlert
  ): PaddleSdkSubscriptionCreatedAlert<T> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: body.alert_name,
      cancel_url: body.cancel_url,
      checkout_id: body.checkout_id,
      currency: body.currency,
      email: body.email,
      event_time: parseUtcDate(body.event_time, 'DATE_TIME'),
      marketing_consent: body.marketing_consent === '1',
      next_bill_date: parseUtcDate(body.next_bill_date, 'DATE'),
      passthrough: this.parsePassthrough(body.passthrough),
      quantity: parseInt(body.quantity),
      source: body.source,
      status: body.status,
      subscription_id: parseInt(body.subscription_id),
      subscription_plan_id: parseInt(body.subscription_plan_id),
      unit_price: parseFloat(body.unit_price),
      update_url: body.update_url,
      user_id: parseInt(body.user_id),
    }
  }

  private parseSubscriptionUpdatedWebhookAlert<T>(
    body: RawPaddleSubscriptionUpdatedAlert
  ): PaddleSdkSubscriptionUpdatedAlert<T> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: body.alert_name,
      cancel_url: body.cancel_url,
      checkout_id: body.checkout_id,
      currency: body.currency,
      email: body.email,
      event_time: parseUtcDate(body.event_time, 'DATE_TIME'),
      marketing_consent: body.marketing_consent === '1',
      new_next_bill_date: parseUtcDate(body.next_bill_date, 'DATE'),
      new_price: parseFloat(body.new_price),
      new_quantity: parseInt(body.new_quantity),
      new_status: body.status,
      new_subscription_plan_id: parseInt(body.subscription_plan_id),
      new_unit_price: parseFloat(body.new_unit_price),
      old_next_bill_date: parseUtcDate(body.old_next_bill_date, 'DATE'),
      old_price: parseFloat(body.old_price),
      old_quantity: parseInt(body.old_quantity),
      old_status: body.old_status,
      old_subscription_plan_id: parseInt(body.old_subscription_plan_id),
      old_unit_price: parseFloat(body.old_unit_price),
      passthrough: this.parsePassthrough(body.passthrough),
      paused_at: body.paused_at ? parseUtcDate(body.paused_at, 'DATE_TIME') : null,
      paused_from: body.paused_from ? parseUtcDate(body.paused_from, 'DATE_TIME') : null,
      paused_reason: body.paused_reason ? body.paused_reason : null,
      subscription_id: parseInt(body.subscription_id),
      update_url: body.update_url,
      user_id: parseInt(body.user_id),
    }
  }

  private parseSubscriptionCancelledWebhookAlert<T>(
    body: RawPaddleSubscriptionCancelledAlert
  ): PaddleSdkSubscriptionCancelledAlert<T> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: body.alert_name,
      cancellation_effective_date: parseUtcDate(body.cancellation_effective_date, 'DATE'),
      checkout_id: body.checkout_id,
      currency: body.currency,
      email: body.email,
      event_time: parseUtcDate(body.event_time, 'DATE_TIME'),
      marketing_consent: body.marketing_consent === '1',
      passthrough: this.parsePassthrough(body.passthrough),
      quantity: parseInt(body.quantity),
      status: body.status,
      subscription_id: parseInt(body.subscription_id),
      subscription_plan_id: parseInt(body.subscription_plan_id),
      unit_price: parseFloat(body.unit_price),
      user_id: parseInt(body.user_id),
    }
  }

  private parseSubscriptionPaymentSucceededWebhookAlert<T>(
    body: RawPaddleSubscriptionPaymentSucceededAlert
  ): PaddleSdkSubscriptionPaymentSucceededAlert<T> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: body.alert_name,
      balance_currency: body.balance_currency,
      balance_earnings: parseFloat(body.balance_earnings),
      balance_fee: parseFloat(body.balance_fee),
      balance_gross: parseFloat(body.balance_gross),
      balance_tax: parseFloat(body.balance_tax),
      checkout_id: body.checkout_id,
      country: body.country,
      coupon: body.coupon,
      currency: body.currency,
      customer_name: body.customer_name,
      earnings: parseFloat(body.earnings),
      email: body.email,
      event_time: parseUtcDate(body.event_time, 'DATE_TIME'),
      fee: parseFloat(body.fee),
      initial_payment: body.initial_payment === '1',
      instalments: parseInt(body.instalments),
      marketing_consent: body.marketing_consent === '1',
      next_bill_date: parseUtcDate(body.next_bill_date, 'DATE'),
      next_payment_amount: parseFloat(body.next_payment_amount),
      order_id: body.order_id,
      passthrough: this.parsePassthrough(body.passthrough),
      payment_method: body.payment_method,
      payment_tax: parseFloat(body.payment_tax),
      plan_name: body.plan_name,
      quantity: parseInt(body.quantity),
      receipt_url: body.receipt_url,
      sale_gross: parseFloat(body.sale_gross),
      status: body.status,
      subscription_id: parseInt(body.subscription_id),
      subscription_payment_id: parseInt(body.subscription_payment_id),
      subscription_plan_id: parseInt(body.subscription_plan_id),
      unit_price: parseFloat(body.unit_price),
      user_id: parseInt(body.user_id),
    }
  }
}
