import { createVerify } from 'crypto'
import { stableSerialize } from './helpers/stableSerialize'
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
import { fetch } from './helpers/fetch'
import {
  convertApiInteger,
  convertApiCurrency,
  convertApiDate,
  convertApiBoolean,
  convertApiSubscriptionStatus,
  convertApiFloat,
  convertApiPausedReason,
  convertApiPaymentMethod,
  convertApiCardType,
  convertSdkSubscriptionStatus,
} from './helpers/converters'

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
      alert_id: convertApiInteger(body.alert_id),
      alert_name: 'SUBSCRIPTION_CREATED',
      cancel_url: body.cancel_url,
      checkout_id: body.checkout_id,
      currency: convertApiCurrency(body.currency),
      email: body.email,
      event_time: convertApiDate(body.event_time, 'DATE_TIME'),
      marketing_consent: convertApiBoolean(body.marketing_consent),
      next_bill_date: convertApiDate(body.next_bill_date, 'DATE'),
      passthrough: this.parsePassthrough(body.passthrough),
      quantity: convertApiInteger(body.quantity),
      source: body.source,
      status: convertApiSubscriptionStatus(body.status),
      subscription_id: convertApiInteger(body.subscription_id),
      subscription_plan_id: convertApiInteger(body.subscription_plan_id),
      unit_price: convertApiFloat(body.unit_price),
      update_url: body.update_url,
      user_id: convertApiInteger(body.user_id),
    }
  }

  private parseSubscriptionUpdatedWebhookAlert(
    body: RawPaddleSubscriptionUpdatedAlert
  ): PaddleSdkSubscriptionUpdatedAlert<TPassthrough> {
    return {
      alert_id: convertApiInteger(body.alert_id),
      alert_name: 'SUBSCRIPTION_UPDATED',
      cancel_url: body.cancel_url,
      checkout_id: body.checkout_id,
      currency: convertApiCurrency(body.currency),
      email: body.email,
      event_time: convertApiDate(body.event_time, 'DATE_TIME'),
      marketing_consent: convertApiBoolean(body.marketing_consent),
      new_next_bill_date: convertApiDate(body.next_bill_date, 'DATE'),
      new_price: convertApiFloat(body.new_price),
      new_quantity: convertApiInteger(body.new_quantity),
      new_status: convertApiSubscriptionStatus(body.status),
      new_subscription_plan_id: convertApiInteger(body.subscription_plan_id),
      new_unit_price: convertApiFloat(body.new_unit_price),
      old_next_bill_date: convertApiDate(body.old_next_bill_date, 'DATE'),
      old_price: convertApiFloat(body.old_price),
      old_quantity: convertApiInteger(body.old_quantity),
      old_status: convertApiSubscriptionStatus(body.old_status),
      old_subscription_plan_id: convertApiInteger(body.old_subscription_plan_id),
      old_unit_price: convertApiFloat(body.old_unit_price),
      passthrough: this.parsePassthrough(body.passthrough),
      paused_at: body.paused_at ? convertApiDate(body.paused_at, 'DATE_TIME') : null,
      paused_from: body.paused_from ? convertApiDate(body.paused_from, 'DATE_TIME') : null,
      paused_reason: body.paused_reason ? convertApiPausedReason(body.paused_reason) : null,
      subscription_id: convertApiInteger(body.subscription_id),
      update_url: body.update_url,
      user_id: convertApiInteger(body.user_id),
    }
  }

  private parseSubscriptionCancelledWebhookAlert(
    body: RawPaddleSubscriptionCancelledAlert
  ): PaddleSdkSubscriptionCancelledAlert<TPassthrough> {
    return {
      alert_id: convertApiInteger(body.alert_id),
      alert_name: 'SUBSCRIPTION_CANCELLED',
      cancellation_effective_date: convertApiDate(body.cancellation_effective_date, 'DATE'),
      checkout_id: body.checkout_id,
      currency: convertApiCurrency(body.currency),
      email: body.email,
      event_time: convertApiDate(body.event_time, 'DATE_TIME'),
      marketing_consent: convertApiBoolean(body.marketing_consent),
      passthrough: this.parsePassthrough(body.passthrough),
      quantity: convertApiInteger(body.quantity),
      status: convertApiSubscriptionStatus(body.status),
      subscription_id: convertApiInteger(body.subscription_id),
      subscription_plan_id: convertApiInteger(body.subscription_plan_id),
      unit_price: convertApiFloat(body.unit_price),
      user_id: convertApiInteger(body.user_id),
    }
  }

  private parseSubscriptionPaymentSucceededWebhookAlert(
    body: RawPaddleSubscriptionPaymentSucceededAlert
  ): PaddleSdkSubscriptionPaymentSucceededAlert<TPassthrough> {
    return {
      alert_id: convertApiInteger(body.alert_id),
      alert_name: 'SUBSCRIPTION_PAYMENT_SUCCEEDED',
      balance_currency: convertApiCurrency(body.balance_currency),
      balance_earnings: convertApiFloat(body.balance_earnings),
      balance_fee: convertApiFloat(body.balance_fee),
      balance_gross: convertApiFloat(body.balance_gross),
      balance_tax: convertApiFloat(body.balance_tax),
      checkout_id: body.checkout_id,
      country: body.country,
      coupon: body.coupon,
      currency: convertApiCurrency(body.currency),
      customer_name: body.customer_name,
      earnings: convertApiFloat(body.earnings),
      email: body.email,
      event_time: convertApiDate(body.event_time, 'DATE_TIME'),
      fee: convertApiFloat(body.fee),
      initial_payment: convertApiBoolean(body.initial_payment),
      instalments: convertApiInteger(body.instalments),
      marketing_consent: convertApiBoolean(body.marketing_consent),
      next_bill_date: convertApiDate(body.next_bill_date, 'DATE'),
      next_payment_amount: convertApiFloat(body.next_payment_amount),
      order_id: body.order_id,
      passthrough: this.parsePassthrough(body.passthrough),
      payment_method: convertApiPaymentMethod(body.payment_method),
      payment_tax: convertApiFloat(body.payment_tax),
      plan_name: body.plan_name,
      quantity: convertApiInteger(body.quantity),
      receipt_url: body.receipt_url,
      sale_gross: convertApiFloat(body.sale_gross),
      status: convertApiSubscriptionStatus(body.status),
      subscription_id: convertApiInteger(body.subscription_id),
      subscription_payment_id: convertApiInteger(body.subscription_payment_id),
      subscription_plan_id: convertApiInteger(body.subscription_plan_id),
      unit_price: convertApiFloat(body.unit_price),
      user_id: convertApiInteger(body.user_id),
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
      if (paymentInformation.payment_method === 'card') {
        return {
          payment_method: 'CARD' as const,
          card_type: convertApiCardType(paymentInformation.card_type),
          last_four_digits: paymentInformation.last_four_digits,
          expiry_date: convertApiDate(paymentInformation.expiry_date, 'EXPIRY_DATE'),
        }
      }

      if (paymentInformation.payment_method === 'paypal') {
        return {
          payment_method: 'PAYPAL' as const,
        }
      }

      // @ts-expect-error TS error here because we handled all types that should exist according to the API docs
      const message = `Unknown payment method "${paymentInformation.payment_method}" for subscriptions`
      throw new PaddleSdkException(message)
    }

    function formatPayment(payment: RawPaddlePostSubscriptionUsersResponse[0]['last_payment']) {
      return {
        amount: payment.amount,
        currency: convertApiCurrency(payment.currency),
        date: convertApiDate(payment.date, 'DATE'),
      }
    }

    const formatSubscription = (subscription: RawPaddlePostSubscriptionUsersResponse[0]) => {
      return {
        subscription_id: subscription.subscription_id,
        plan_id: subscription.plan_id,
        user_id: subscription.user_id,
        user_email: subscription.user_email,
        marketing_consent: subscription.marketing_consent,
        status: convertApiSubscriptionStatus(subscription.state),
        signup_date: convertApiDate(subscription.signup_date, 'DATE_TIME'),
        update_url: subscription.update_url,
        cancel_url: subscription.cancel_url,
        paused_at: subscription.paused_at
          ? convertApiDate(subscription.paused_at, 'DATE_TIME')
          : null,
        paused_from: subscription.paused_from
          ? convertApiDate(subscription.paused_from, 'DATE_TIME')
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
      state: data.status ? convertSdkSubscriptionStatus(data.status) : undefined,
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
