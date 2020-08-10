import { createVerify } from 'crypto'
import { stableSerialize } from './helpers'
import {
  RawPaddleWebhookAlert,
  RawPaddleSubscriptionCreatedAlert,
  RawPaddleSubscriptionUpdatedAlert,
  RawPaddleSubscriptionCancelledAlert,
  RawPaddleSubscriptionPaymentSucceededAlert,
} from './__generated__/webhook-alert-interfaces'
import { PaddleSdkException, PaddleSdkApiException } from './exceptions'
import {
  PaddleSdkSubscriptionCreatedAlert,
  PaddleSdkSubscriptionUpdatedAlert,
  PaddleSdkSubscriptionCancelledAlert,
  PaddleSdkSubscriptionPaymentSucceededAlert,
  PaddleSdkCreateProductPayLinkRequest,
  PaddleSdkListSubscriptionsRequest,
  PaddleSdkUpdateSubscriptionRequest,
  PaddleSdkCancelSubscriptionRequest,
  PaddleSdkCreateSubscriptionModifierRequest,
  PaddleSdkCreateProductPayLinkResponse,
  PaddleSdkListSubscriptionsResponse,
  PaddleSdkUpdateSubscriptionResponse,
  PaddleSdkCancelSubscriptionResponse,
  PaddleSdkCreateSubscriptionModifierResponse,
  PaddleSdkCurrency,
} from './interfaces'
import {
  RawPaddlePostProductGeneratePayLinkRequest,
  RawPaddlePostProductGeneratePayLinkResponse,
  PADDLE_PRODUCT_GENERATE_PAY_LINK,
  RawPaddlePostSubscriptionUsersUpdateRequest,
  RawPaddlePostSubscriptionUsersUpdateResponse,
  PADDLE_SUBSCRIPTION_USERS_UPDATE,
  RawPaddlePostSubscriptionModifiersCreateRequest,
  RawPaddlePostSubscriptionModifiersCreateResponse,
  PADDLE_SUBSCRIPTION_MODIFIERS_CREATE,
  RawPaddlePostSubscriptionUsersCancelRequest,
  RawPaddlePostSubscriptionUsersCancelResponse,
  PADDLE_SUBSCRIPTION_USERS_CANCEL,
  RawPaddlePostSubscriptionUsersRequest,
  RawPaddlePostSubscriptionUsersResponse,
  PADDLE_SUBSCRIPTION_USERS,
} from './__generated__/api-route-interfaces'
import { encrypt, decrypt } from '@devoxa/aes-encryption'
import * as parser from './parser'
import { fetch } from './helpers/fetch'

export * from './interfaces'

export interface PaddleSdkOptions {
  publicKey: string
  vendorId: number
  vendorAuthCode: string
  passthroughEncryptionKey: string
}

export class PaddleSdk<TPassthrough = any> {
  private readonly publicKey: string
  private readonly vendorId: number
  private readonly vendorAuthCode: string
  private readonly passthroughEncryptionKey: string

  constructor(options: PaddleSdkOptions) {
    if (!options.publicKey) {
      throw new PaddleSdkException('PaddleSdk was called without a publicKey')
    }

    if (!options.vendorId) {
      throw new PaddleSdkException('PaddleSdk was called without a vendorId')
    }

    if (!options.vendorAuthCode) {
      throw new PaddleSdkException('PaddleSdk was called without a vendorAuthCode')
    }

    if (!options.passthroughEncryptionKey || options.passthroughEncryptionKey.length !== 32) {
      throw new PaddleSdkException('PaddleSdk was called with an invalid passthroughEncryptionKey')
    }

    this.publicKey = options.publicKey
    this.vendorId = options.vendorId
    this.vendorAuthCode = options.vendorAuthCode
    this.passthroughEncryptionKey = options.passthroughEncryptionKey
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

  parseWebhookAlert(body: any) {
    if (!this.verifyWebhookAlert(body)) {
      throw new PaddleSdkException('Failed validating alert body')
    }

    switch (body.alert_name) {
      case 'subscription_created':
        return this.parseSubscriptionCreatedWebhookAlert(body)
      case 'subscription_updated':
        return this.parseSubscriptionUpdatedWebhookAlert(body)
      case 'subscription_cancelled':
        return this.parseSubscriptionCancelledWebhookAlert(body)
      case 'subscription_payment_succeeded':
        return this.parseSubscriptionPaymentSucceededWebhookAlert(body)
    }

    throw new PaddleSdkException(
      `Implementation missing: Can not parse alert of type ${body.alert_name}`
    )
  }

  private stringifyPassthrough(passthrough: any) {
    return encrypt(this.passthroughEncryptionKey, JSON.stringify(passthrough))
  }

  private parsePassthrough(passthrough: string): TPassthrough {
    try {
      return JSON.parse(decrypt(this.passthroughEncryptionKey, passthrough))
    } catch (err) {
      throw new PaddleSdkException('Failed parsing passthrough: ' + err.message)
    }
  }

  private parseSubscriptionCreatedWebhookAlert(
    body: RawPaddleSubscriptionCreatedAlert
  ): PaddleSdkSubscriptionCreatedAlert<TPassthrough> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: 'SUBSCRIPTION_CREATED',
      cancel_url: body.cancel_url,
      checkout_id: body.checkout_id,
      currency: body.currency as PaddleSdkCurrency,
      email: body.email,
      event_time: parser.atsDate(body.event_time, 'DATE_TIME'),
      marketing_consent: body.marketing_consent === '1',
      next_bill_date: parser.atsDate(body.next_bill_date, 'DATE'),
      passthrough: this.parsePassthrough(body.passthrough),
      quantity: parseInt(body.quantity),
      source: body.source,
      status: parser.atsStatus(body.status),
      subscription_id: parseInt(body.subscription_id),
      subscription_plan_id: parseInt(body.subscription_plan_id),
      unit_price: parseFloat(body.unit_price),
      update_url: body.update_url,
      user_id: parseInt(body.user_id),
    }
  }

  private parseSubscriptionUpdatedWebhookAlert(
    body: RawPaddleSubscriptionUpdatedAlert
  ): PaddleSdkSubscriptionUpdatedAlert<TPassthrough> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: 'SUBSCRIPTION_UPDATED',
      cancel_url: body.cancel_url,
      checkout_id: body.checkout_id,
      currency: body.currency as PaddleSdkCurrency,
      email: body.email,
      event_time: parser.atsDate(body.event_time, 'DATE_TIME'),
      marketing_consent: body.marketing_consent === '1',
      new_next_bill_date: parser.atsDate(body.next_bill_date, 'DATE'),
      new_price: parseFloat(body.new_price),
      new_quantity: parseInt(body.new_quantity),
      new_status: parser.atsStatus(body.status),
      new_subscription_plan_id: parseInt(body.subscription_plan_id),
      new_unit_price: parseFloat(body.new_unit_price),
      old_next_bill_date: parser.atsDate(body.old_next_bill_date, 'DATE'),
      old_price: parseFloat(body.old_price),
      old_quantity: parseInt(body.old_quantity),
      old_status: parser.atsStatus(body.old_status),
      old_subscription_plan_id: parseInt(body.old_subscription_plan_id),
      old_unit_price: parseFloat(body.old_unit_price),
      passthrough: this.parsePassthrough(body.passthrough),
      paused_at: body.paused_at ? parser.atsDate(body.paused_at, 'DATE_TIME') : null,
      paused_from: body.paused_from ? parser.atsDate(body.paused_from, 'DATE_TIME') : null,
      paused_reason: body.paused_reason ? parser.atsPausedReason(body.paused_reason) : null,
      subscription_id: parseInt(body.subscription_id),
      update_url: body.update_url,
      user_id: parseInt(body.user_id),
    }
  }

  private parseSubscriptionCancelledWebhookAlert(
    body: RawPaddleSubscriptionCancelledAlert
  ): PaddleSdkSubscriptionCancelledAlert<TPassthrough> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: 'SUBSCRIPTION_CANCELLED',
      cancellation_effective_date: parser.atsDate(body.cancellation_effective_date, 'DATE'),
      checkout_id: body.checkout_id,
      currency: body.currency as PaddleSdkCurrency,
      email: body.email,
      event_time: parser.atsDate(body.event_time, 'DATE_TIME'),
      marketing_consent: body.marketing_consent === '1',
      passthrough: this.parsePassthrough(body.passthrough),
      quantity: parseInt(body.quantity),
      status: parser.atsStatus(body.status),
      subscription_id: parseInt(body.subscription_id),
      subscription_plan_id: parseInt(body.subscription_plan_id),
      unit_price: parseFloat(body.unit_price),
      user_id: parseInt(body.user_id),
    }
  }

  private parseSubscriptionPaymentSucceededWebhookAlert(
    body: RawPaddleSubscriptionPaymentSucceededAlert
  ): PaddleSdkSubscriptionPaymentSucceededAlert<TPassthrough> {
    return {
      alert_id: parseInt(body.alert_id),
      alert_name: 'SUBSCRIPTION_PAYMENT_SUCCEEDED',
      balance_currency: body.balance_currency as PaddleSdkCurrency,
      balance_earnings: parseFloat(body.balance_earnings),
      balance_fee: parseFloat(body.balance_fee),
      balance_gross: parseFloat(body.balance_gross),
      balance_tax: parseFloat(body.balance_tax),
      checkout_id: body.checkout_id,
      country: body.country,
      coupon: body.coupon,
      currency: body.currency as PaddleSdkCurrency,
      customer_name: body.customer_name,
      earnings: parseFloat(body.earnings),
      email: body.email,
      event_time: parser.atsDate(body.event_time, 'DATE_TIME'),
      fee: parseFloat(body.fee),
      initial_payment: body.initial_payment === '1',
      instalments: parseInt(body.instalments),
      marketing_consent: body.marketing_consent === '1',
      next_bill_date: parser.atsDate(body.next_bill_date, 'DATE'),
      next_payment_amount: parseFloat(body.next_payment_amount),
      order_id: body.order_id,
      passthrough: this.parsePassthrough(body.passthrough),
      payment_method: parser.atsPaymentMethod(body.payment_method),
      payment_tax: parseFloat(body.payment_tax),
      plan_name: body.plan_name,
      quantity: parseInt(body.quantity),
      receipt_url: body.receipt_url,
      sale_gross: parseFloat(body.sale_gross),
      status: parser.atsStatus(body.status),
      subscription_id: parseInt(body.subscription_id),
      subscription_payment_id: parseInt(body.subscription_payment_id),
      subscription_plan_id: parseInt(body.subscription_plan_id),
      unit_price: parseFloat(body.unit_price),
      user_id: parseInt(body.user_id),
    }
  }

  private async apiRequest<TRequest, TResponse>(
    url: string,
    method: 'GET' | 'POST',
    body: TRequest
  ): Promise<TResponse> {
    const json = await fetch(url, {
      method,
      body: {
        vendor_id: this.vendorId,
        vendor_auth_code: this.vendorAuthCode,
        ...body,
      },
    })

    // Turn errors from the Paddle API into a unique exception with the error message
    if (json.success === false) {
      throw new PaddleSdkApiException(json.error.message)
    }

    return json.response
  }

  async createProductPayLink(
    data: PaddleSdkCreateProductPayLinkRequest<TPassthrough>
  ): Promise<PaddleSdkCreateProductPayLinkResponse> {
    return this.apiRequest<
      RawPaddlePostProductGeneratePayLinkRequest,
      RawPaddlePostProductGeneratePayLinkResponse
    >(PADDLE_PRODUCT_GENERATE_PAY_LINK.url, PADDLE_PRODUCT_GENERATE_PAY_LINK.method, {
      ...data,
      passthrough: this.stringifyPassthrough(data.passthrough),
    })
  }

  async listSubscriptions(
    data: PaddleSdkListSubscriptionsRequest
  ): Promise<PaddleSdkListSubscriptionsResponse> {
    function formatPaymentInformation(
      paymentInformation: RawPaddlePostSubscriptionUsersResponse[0]['payment_information']
    ) {
      if (paymentInformation.payment_method !== 'card') {
        // Only card & paypal are enabled for subscriptions, but there might be more options in the future
        return { payment_method: paymentInformation.payment_method }
      }

      return {
        payment_method: 'card' as const,
        card_type: paymentInformation.card_type, // TODO Would be nice to have strict types here
        last_four_digits: paymentInformation.last_four_digits,
        expiry_date: parser.atsDate(paymentInformation.expiry_date, 'EXPIRY_DATE'),
      }
    }

    function formatPayment(payment: RawPaddlePostSubscriptionUsersResponse[0]['last_payment']) {
      return {
        amount: payment.amount,
        currency: payment.currency as PaddleSdkCurrency,
        date: parser.atsDate(payment.date, 'DATE'),
      }
    }

    const formatSubscription = (subscription: RawPaddlePostSubscriptionUsersResponse[0]) => {
      return {
        subscription_id: subscription.subscription_id,
        plan_id: subscription.plan_id,
        user_id: subscription.user_id,
        user_email: subscription.user_email,
        marketing_consent: subscription.marketing_consent,
        status: parser.atsStatus(subscription.state),
        signup_date: parser.atsDate(subscription.signup_date, 'DATE_TIME'),
        update_url: subscription.update_url,
        cancel_url: subscription.cancel_url,
        paused_at: subscription.paused_at
          ? parser.atsDate(subscription.paused_at, 'DATE_TIME')
          : null,
        paused_from: subscription.paused_from
          ? parser.atsDate(subscription.paused_from, 'DATE_TIME')
          : null,
        payment_information: formatPaymentInformation(subscription.payment_information),
        last_payment: formatPayment(subscription.last_payment),
        next_payment: subscription.next_payment ? formatPayment(subscription.next_payment) : null,
      }
    }

    return this.apiRequest<
      RawPaddlePostSubscriptionUsersRequest,
      RawPaddlePostSubscriptionUsersResponse
    >(PADDLE_SUBSCRIPTION_USERS.url, PADDLE_SUBSCRIPTION_USERS.method, {
      subscription_id: data.subscription_id?.toString(),
      plan_id: data.plan_id?.toString(),
      state: data.status ? parser.staStatus(data.status) : undefined,
      page: data.page,
      results_per_page: data.results_per_page,
    }).then((subscriptions) => subscriptions.map(formatSubscription))
  }

  async updateSubscription(
    data: PaddleSdkUpdateSubscriptionRequest<TPassthrough>
  ): Promise<PaddleSdkUpdateSubscriptionResponse> {
    return this.apiRequest<
      RawPaddlePostSubscriptionUsersUpdateRequest,
      RawPaddlePostSubscriptionUsersUpdateResponse
    >(PADDLE_SUBSCRIPTION_USERS_UPDATE.url, PADDLE_SUBSCRIPTION_USERS_UPDATE.method, {
      ...data,
      passthrough: this.stringifyPassthrough(data.passthrough),
    })
  }

  async cancelSubscription(
    data: PaddleSdkCancelSubscriptionRequest
  ): Promise<PaddleSdkCancelSubscriptionResponse> {
    return this.apiRequest<
      RawPaddlePostSubscriptionUsersCancelRequest,
      RawPaddlePostSubscriptionUsersCancelResponse
    >(PADDLE_SUBSCRIPTION_USERS_CANCEL.url, PADDLE_SUBSCRIPTION_USERS_CANCEL.method, data)
  }

  async createSubscriptionModifier(
    data: PaddleSdkCreateSubscriptionModifierRequest
  ): Promise<PaddleSdkCreateSubscriptionModifierResponse> {
    return this.apiRequest<
      RawPaddlePostSubscriptionModifiersCreateRequest,
      RawPaddlePostSubscriptionModifiersCreateResponse
    >(PADDLE_SUBSCRIPTION_MODIFIERS_CREATE.url, PADDLE_SUBSCRIPTION_MODIFIERS_CREATE.method, data)
  }
}
