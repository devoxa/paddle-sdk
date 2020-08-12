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
  PaddleSdkSubscriptionCreatedEvent,
  PaddleSdkSubscriptionUpdatedEvent,
  PaddleSdkSubscriptionCancelledEvent,
  PaddleSdkSubscriptionPaymentSucceededEvent,
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
  convertSdkBoolean,
  convertSdkDate,
  convertApiCountry,
} from './helpers/converters'

export * from './interfaces'

export interface PaddleSdkOptions {
  publicKey: string
  vendorId: number
  vendorAuthCode: string
  metadataEncryptionKey: string
}

export class PaddleSdk<TMetadata = any> {
  private readonly publicKey: string
  private readonly vendorId: number
  private readonly vendorAuthCode: string
  private readonly metadataEncryptionKey: string

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

    if (!options.metadataEncryptionKey || options.metadataEncryptionKey.length !== 32) {
      throw new PaddleSdkException('PaddleSdk was called with an invalid metadataEncryptionKey')
    }

    this.publicKey = options.publicKey
    this.vendorId = options.vendorId
    this.vendorAuthCode = options.vendorAuthCode
    this.metadataEncryptionKey = options.metadataEncryptionKey
  }

  verifyWebhookEvent(body: any): body is RawPaddleWebhookAlert {
    if (typeof body !== 'object') return false

    const { p_signature: signature, ...postBodyRest } = body || {}
    if (!signature || typeof signature !== 'string') return false

    const serializedPostBody = stableSerialize(postBodyRest)

    const verifier = createVerify('sha1')
    verifier.update(serializedPostBody)
    verifier.end()

    return verifier.verify(this.publicKey, signature, 'base64')
  }

  parseWebhookEvent(body: any) {
    if (!this.verifyWebhookEvent(body)) {
      throw new PaddleSdkException('Failed validating webhook event body')
    }

    switch (body.alert_name) {
      case 'subscription_created':
        return this.parseSubscriptionCreatedWebhookEvent(body)
      case 'subscription_updated':
        return this.parseSubscriptionUpdatedWebhookEvent(body)
      case 'subscription_cancelled':
        return this.parseSubscriptionCancelledWebhookEvent(body)
      case 'subscription_payment_succeeded':
        return this.parseSubscriptionPaymentSucceededWebhookEvent(body)
    }

    // istanbul ignore next
    throw new PaddleSdkException(
      `Implementation missing: Can not parse event of type ${body.alert_name}`
    )
  }

  private stringifyMetadata(metadata?: any) {
    if (typeof metadata === 'undefined') {
      metadata = null
    }

    return encrypt(this.metadataEncryptionKey, JSON.stringify(metadata))
  }

  private parseMetadata(metadata: string): TMetadata {
    try {
      return JSON.parse(decrypt(this.metadataEncryptionKey, metadata))
    } catch (err) {
      throw new PaddleSdkException('Failed parsing metadata: ' + err.message)
    }
  }

  private parseSubscriptionCreatedWebhookEvent(
    body: RawPaddleSubscriptionCreatedAlert
  ): PaddleSdkSubscriptionCreatedEvent<TMetadata> {
    const quantity = convertApiInteger(body.quantity)
    const unitPrice = convertApiFloat(body.unit_price)

    return {
      eventId: convertApiInteger(body.alert_id),
      eventType: 'SUBSCRIPTION_CREATED',
      cancelUrl: body.cancel_url,
      checkoutId: body.checkout_id,
      currency: convertApiCurrency(body.currency),
      customerEmail: body.email,
      eventTime: convertApiDate(body.event_time, 'DATE_TIME'),
      hasMarketingConsent: convertApiBoolean(body.marketing_consent),
      nextPaymentDate: convertApiDate(body.next_bill_date, 'DATE'),
      metadata: this.parseMetadata(body.passthrough),
      quantity,
      referrerUrl: body.source,
      status: convertApiSubscriptionStatus(body.status),
      subscriptionId: convertApiInteger(body.subscription_id),
      productId: convertApiInteger(body.subscription_plan_id),
      unitPrice,
      price: quantity * unitPrice,
      updateUrl: body.update_url,
      customerId: convertApiInteger(body.user_id),
    }
  }

  private parseSubscriptionUpdatedWebhookEvent(
    body: RawPaddleSubscriptionUpdatedAlert
  ): PaddleSdkSubscriptionUpdatedEvent<TMetadata> {
    return {
      eventId: convertApiInteger(body.alert_id),
      eventType: 'SUBSCRIPTION_UPDATED',
      cancelUrl: body.cancel_url,
      checkoutId: body.checkout_id,
      currency: convertApiCurrency(body.currency),
      customerEmail: body.email,
      eventTime: convertApiDate(body.event_time, 'DATE_TIME'),
      hasMarketingConsent: convertApiBoolean(body.marketing_consent),
      nextPaymentDate: convertApiDate(body.next_bill_date, 'DATE'),
      price: convertApiFloat(body.new_price),
      quantity: convertApiInteger(body.new_quantity),
      status: convertApiSubscriptionStatus(body.status),
      productId: convertApiInteger(body.subscription_plan_id),
      unitPrice: convertApiFloat(body.new_unit_price),
      oldNextPaymentDate: convertApiDate(body.old_next_bill_date, 'DATE'),
      oldPrice: convertApiFloat(body.old_price),
      oldQuantity: convertApiInteger(body.old_quantity),
      oldStatus: convertApiSubscriptionStatus(body.old_status),
      oldProductId: convertApiInteger(body.old_subscription_plan_id),
      oldUnitPrice: convertApiFloat(body.old_unit_price),
      metadata: this.parseMetadata(body.passthrough),
      pausedAt: body.paused_at ? convertApiDate(body.paused_at, 'DATE_TIME') : null,
      pausedFrom: body.paused_from ? convertApiDate(body.paused_from, 'DATE_TIME') : null,
      pausedReason: body.paused_reason ? convertApiPausedReason(body.paused_reason) : null,
      subscriptionId: convertApiInteger(body.subscription_id),
      updateUrl: body.update_url,
      customerId: convertApiInteger(body.user_id),
    }
  }

  private parseSubscriptionCancelledWebhookEvent(
    body: RawPaddleSubscriptionCancelledAlert
  ): PaddleSdkSubscriptionCancelledEvent<TMetadata> {
    const quantity = convertApiInteger(body.quantity)
    const unitPrice = convertApiFloat(body.unit_price)

    return {
      eventId: convertApiInteger(body.alert_id),
      eventType: 'SUBSCRIPTION_CANCELLED',
      cancelledFrom: convertApiDate(body.cancellation_effective_date, 'DATE'),
      checkoutId: body.checkout_id,
      currency: convertApiCurrency(body.currency),
      customerEmail: body.email,
      eventTime: convertApiDate(body.event_time, 'DATE_TIME'),
      hasMarketingConsent: convertApiBoolean(body.marketing_consent),
      metadata: this.parseMetadata(body.passthrough),
      quantity,
      status: convertApiSubscriptionStatus(body.status),
      subscriptionId: convertApiInteger(body.subscription_id),
      productId: convertApiInteger(body.subscription_plan_id),
      unitPrice,
      price: quantity * unitPrice,
      customerId: convertApiInteger(body.user_id),
    }
  }

  private parseSubscriptionPaymentSucceededWebhookEvent(
    body: RawPaddleSubscriptionPaymentSucceededAlert
  ): PaddleSdkSubscriptionPaymentSucceededEvent<TMetadata> {
    const quantity = convertApiInteger(body.quantity)
    const unitPrice = convertApiFloat(body.unit_price)

    return {
      eventId: convertApiInteger(body.alert_id),
      eventType: 'SUBSCRIPTION_PAYMENT_SUCCEEDED',
      balanceCurrency: convertApiCurrency(body.balance_currency),
      balanceEarnings: convertApiFloat(body.balance_earnings),
      balanceFee: convertApiFloat(body.balance_fee),
      balanceGross: convertApiFloat(body.balance_gross),
      balanceTax: convertApiFloat(body.balance_tax),
      checkoutId: body.checkout_id,
      customerCountry: convertApiCountry(body.country),
      coupon: body.coupon,
      currency: convertApiCurrency(body.currency),
      customerName: body.customer_name,
      earnings: convertApiFloat(body.earnings),
      customerEmail: body.email,
      eventTime: convertApiDate(body.event_time, 'DATE_TIME'),
      fee: convertApiFloat(body.fee),
      isInitialPayment: convertApiBoolean(body.initial_payment),
      installments: convertApiInteger(body.instalments),
      hasMarketingConsent: convertApiBoolean(body.marketing_consent),
      nextPaymentDate: convertApiDate(body.next_bill_date, 'DATE'),
      nextPaymentAmount: convertApiFloat(body.next_payment_amount),
      orderId: body.order_id,
      metadata: this.parseMetadata(body.passthrough),
      paymentMethod: convertApiPaymentMethod(body.payment_method),
      tax: convertApiFloat(body.payment_tax),
      quantity,
      receiptUrl: body.receipt_url,
      gross: convertApiFloat(body.sale_gross),
      status: convertApiSubscriptionStatus(body.status),
      subscriptionId: convertApiInteger(body.subscription_id),
      subscriptionPaymentId: convertApiInteger(body.subscription_payment_id),
      productId: convertApiInteger(body.subscription_plan_id),
      unitPrice,
      price: quantity * unitPrice,
      customerId: convertApiInteger(body.user_id),
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
    data: PaddleSdkCreateProductPayLinkRequest<TMetadata>
  ): Promise<PaddleSdkCreateProductPayLinkResponse> {
    const formatRequest = (
      request: PaddleSdkCreateProductPayLinkRequest<TMetadata>
    ): RawPaddlePostProductGeneratePayLinkRequest => {
      return {
        product_id: request.productId,
        title: request.title,
        webhook_url: request.webhookUrl,
        prices: request.prices?.map((x) => `${x[0]}:${x[1]}`),
        recurring_prices: request.recurringPrices?.map((x) => `${x[0]}:${x[1]}`),
        trial_days: request.trialDays,
        custom_message: request.customMessage,
        coupon_code: request.populateCoupon,
        discountable: convertSdkBoolean(request.isDiscountable),
        image_url: request.imageUrl,
        return_url: request.returnUrl,
        quantity_variable: convertSdkBoolean(request.isQuantityVariable),
        quantity: request.populateQuantity,
        expires: request.expirationDate
          ? convertSdkDate(request.expirationDate, 'DATE')
          : undefined,
        affiliates: request.affiliates?.map((x) => x.toString()),
        recurring_affiliate_limit: request.recurringAffiliateLimit,
        marketing_consent: convertSdkBoolean(request.populateHasMarketingConsent),
        customer_email: request.populateCustomerEmail,
        customer_country: request.populateCustomerCountry,
        customer_postcode: request.populateCustomerPostcode,
        vat_number: request.populateVatNumber,
        vat_company_name: request.populateVatCompanyName,
        vat_street: request.populateVatStreet,
        vat_city: request.populateVatCity,
        vat_state: request.populateVatState,
        vat_country: request.populateVatCountry,
        vat_postcode: request.populateVatPostcode,
        passthrough: this.stringifyMetadata(request.metadata),
      }
    }

    return this.apiRequest<
      RawPaddlePostProductGeneratePayLinkRequest,
      RawPaddlePostProductGeneratePayLinkResponse
    >(
      PADDLE_PRODUCT_GENERATE_PAY_LINK.url,
      PADDLE_PRODUCT_GENERATE_PAY_LINK.method,
      formatRequest(data)
    )
  }

  async listSubscriptions(
    data: PaddleSdkListSubscriptionsRequest
  ): Promise<PaddleSdkListSubscriptionsResponse> {
    function formatRequest(
      request: PaddleSdkListSubscriptionsRequest
    ): RawPaddlePostSubscriptionUsersRequest {
      return {
        subscription_id: request.subscriptionId?.toString(),
        plan_id: request.productId?.toString(),
        state: request.status ? convertSdkSubscriptionStatus(request.status) : undefined,
        page: request.page,
        results_per_page: request.resultsPerPage,
      }
    }

    function formatPaymentInformation(
      paymentInformation: RawPaddlePostSubscriptionUsersResponse[0]['payment_information']
    ) {
      if (paymentInformation.payment_method === 'card') {
        return {
          paymentMethod: 'CARD' as const,
          cardBrand: convertApiCardType(paymentInformation.card_type),
          cardLastFour: paymentInformation.last_four_digits,
          cardExpirationDate: convertApiDate(paymentInformation.expiry_date, 'EXPIRY_DATE'),
        }
      }

      // istanbul ignore else
      if (paymentInformation.payment_method === 'paypal') {
        return {
          paymentMethod: 'PAYPAL' as const,
          cardBrand: null,
          cardLastFour: null,
          cardExpirationDate: null,
        }
      }

      // @ts-expect-error TS error here because we handled all types that should exist according to the API docs
      // istanbul ignore next
      const message = `Unknown payment method "${paymentInformation.payment_method}" for subscriptions`
      // istanbul ignore next
      throw new PaddleSdkException(message)
    }

    const formatSubscription = (subscription: RawPaddlePostSubscriptionUsersResponse[0]) => {
      return {
        subscriptionId: subscription.subscription_id,
        productId: subscription.plan_id,
        customerId: subscription.user_id,
        customerEmail: subscription.user_email,
        hasMarketingConsent: subscription.marketing_consent,
        status: convertApiSubscriptionStatus(subscription.state),
        quantity: subscription.quantity || 1,
        signupDate: convertApiDate(subscription.signup_date, 'DATE_TIME'),
        updateUrl: subscription.update_url,
        cancelUrl: subscription.cancel_url,
        pausedAt: subscription.paused_at
          ? convertApiDate(subscription.paused_at, 'DATE_TIME')
          : null,
        pausedFrom: subscription.paused_from
          ? convertApiDate(subscription.paused_from, 'DATE_TIME')
          : null,

        ...formatPaymentInformation(subscription.payment_information),

        lastPaymentAmount: subscription.last_payment.amount,
        lastPaymentCurrency: convertApiCurrency(subscription.last_payment.currency),
        lastPaymentDate: convertApiDate(subscription.last_payment.date, 'DATE'),
        nextPaymentAmount: subscription.next_payment ? subscription.next_payment.amount : null,
        nextPaymentCurrency: subscription.next_payment
          ? convertApiCurrency(subscription.next_payment.currency)
          : null,
        nextPaymentDate: subscription.next_payment
          ? convertApiDate(subscription.next_payment.date, 'DATE')
          : null,
      }
    }

    return this.apiRequest<
      RawPaddlePostSubscriptionUsersRequest,
      RawPaddlePostSubscriptionUsersResponse
    >(
      PADDLE_SUBSCRIPTION_USERS.url,
      PADDLE_SUBSCRIPTION_USERS.method,
      formatRequest(data)
    ).then((subscriptions) => subscriptions.map(formatSubscription))
  }

  async updateSubscription(
    data: PaddleSdkUpdateSubscriptionRequest<TMetadata>
  ): Promise<PaddleSdkUpdateSubscriptionResponse> {
    const formatRequest = (
      request: PaddleSdkUpdateSubscriptionRequest<TMetadata>
    ): RawPaddlePostSubscriptionUsersUpdateRequest => {
      return {
        subscription_id: request.subscriptionId,
        quantity: request.quantity,
        currency: request.currency,
        recurring_price: request.unitPrice,
        bill_immediately: request.shouldMakeImmediatePayment,
        plan_id: request.productId,
        prorate: request.shouldProrate,
        keep_modifiers: request.shouldKeepModifiers,
        passthrough: this.stringifyMetadata(request.metadata),
        pause: request.shouldPause,
      }
    }

    const formatResponse = (
      response: RawPaddlePostSubscriptionUsersUpdateResponse
    ): PaddleSdkUpdateSubscriptionResponse => {
      return {
        subscriptionId: response.subscription_id,
        customerId: response.user_id,
        productId: response.plan_id,
        nextPaymentAmount: response.next_payment.amount,
        nextPaymentCurrency: convertApiCurrency(response.next_payment.currency),
        nextPaymentDate: convertApiDate(response.next_payment.date, 'DATE'),
      }
    }

    return this.apiRequest<
      RawPaddlePostSubscriptionUsersUpdateRequest,
      RawPaddlePostSubscriptionUsersUpdateResponse
    >(
      PADDLE_SUBSCRIPTION_USERS_UPDATE.url,
      PADDLE_SUBSCRIPTION_USERS_UPDATE.method,
      formatRequest(data)
    ).then((x) => formatResponse(x))
  }

  async cancelSubscription(
    data: PaddleSdkCancelSubscriptionRequest
  ): Promise<PaddleSdkCancelSubscriptionResponse> {
    const formatRequest = (
      request: PaddleSdkCancelSubscriptionRequest
    ): RawPaddlePostSubscriptionUsersCancelRequest => {
      return {
        subscription_id: request.subscriptionId,
      }
    }

    return this.apiRequest<
      RawPaddlePostSubscriptionUsersCancelRequest,
      RawPaddlePostSubscriptionUsersCancelResponse
    >(
      PADDLE_SUBSCRIPTION_USERS_CANCEL.url,
      PADDLE_SUBSCRIPTION_USERS_CANCEL.method,
      formatRequest(data)
    )
  }

  async createSubscriptionModifier(
    data: PaddleSdkCreateSubscriptionModifierRequest
  ): Promise<PaddleSdkCreateSubscriptionModifierResponse> {
    const formatRequest = (
      request: PaddleSdkCreateSubscriptionModifierRequest
    ): RawPaddlePostSubscriptionModifiersCreateRequest => {
      return {
        subscription_id: request.subscriptionId,
        modifier_recurring: request.isRecurring,
        modifier_amount: request.amount,
        modifier_description: request.description,
      }
    }

    const formatResponse = (
      response: RawPaddlePostSubscriptionModifiersCreateResponse
    ): PaddleSdkCreateSubscriptionModifierResponse => {
      return {
        subscriptionId: response.subscription_id,
        modifierId: response.modifier_id,
      }
    }

    return this.apiRequest<
      RawPaddlePostSubscriptionModifiersCreateRequest,
      RawPaddlePostSubscriptionModifiersCreateResponse
    >(
      PADDLE_SUBSCRIPTION_MODIFIERS_CREATE.url,
      PADDLE_SUBSCRIPTION_MODIFIERS_CREATE.method,
      formatRequest(data)
    ).then((response) => formatResponse(response))
  }
}
