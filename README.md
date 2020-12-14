<!-- Title -->
<h1 align="center">
  paddle-sdk
</h1>

<!-- Description -->
<h4 align="center"> 
  An SDK to interface with the API and webhooks from <a href="https://paddle.com">Paddle</a>
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@devoxa/paddle-sdk">
    <img
      src="https://img.shields.io/npm/v/@devoxa/paddle-sdk?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://github.com/devoxa/paddle-sdk/actions?query=branch%3Amaster+workflow%3A%22Continuous+Integration%22">
    <img
      src="https://img.shields.io/github/workflow/status/devoxa/paddle-sdk/Continuous%20Integration?style=flat-square"
      alt="Build Status"
    />
  </a>

  <a href="https://codecov.io/github/devoxa/paddle-sdk">
    <img
      src="https://img.shields.io/codecov/c/github/devoxa/paddle-sdk/master?style=flat-square"
      alt="Code Coverage"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

```bash
yarn add @devoxa/paddle-sdk
```

## Usage

> :warning: This package does **not** implement all available webhook events and API routes. It
> should have the ones required for 90% of subscription based applications, but if you are missing
> something feel free to add them via a pull request!

```ts
import { PaddleSdk } from '@devoxa/paddle-sdk'

// The metadata you want to attach to subscriptions, to link them to your application entities
type PaddleMetadata = { userId: 123 }

const paddleSdk = new PaddleSdk<PaddleMetadata>({
  publicKey: '...', // Your public key from the paddle dashboard
  vendorId: 123, // Your vendor ID from the paddle dashboard
  vendorAuthCode: 'AAA', // Your vendor auth code from the paddle dashboard
  metadataEncryptionKey: '...', // A 32 character string used to encrypt your metadata
})
```

**Available Methods:**

- `paddleSdk.verifyWebhookEvent(body: any): boolean`
- `paddleSdk.parseWebhookEvent(body: any): PaddleSdkSubscriptionCreatedEvent | PaddleSdkSubscriptionUpdatedEvent | ...`
- `async createProductPayLink(data: PaddleSdkCreateProductPayLinkRequest): Promise<PaddleSdkCreateProductPayLinkResponse>`
- `async listSubscriptions(data: PaddleSdkListSubscriptionsRequest): Promise<PaddleSdkListSubscriptionsResponse>`
- `async updateSubscription(data: PaddleSdkUpdateSubscriptionRequest): Promise<PaddleSdkUpdateSubscriptionResponse>`
- `async cancelSubscription(data: PaddleSdkCancelSubscriptionRequest): Promise<PaddleSdkCancelSubscriptionResponse>`
- `async createSubscriptionModifier(data: PaddleSdkCreateSubscriptionModifierRequest): Promise<PaddleSdkCreateSubscriptionModifierResponse>`

**A note on parsing webhooks:**

If you are using `parseWebhookEvent` on raw events, only enable the following events in your
dashboard to prevent `ImplementationMissing` errors being thrown.

- [Payment Succeeded](https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-succeeded)
- [Payment Refunded](https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-refunded)
- [Subscription Created](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-created)
- [Subscription Updated](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-updated)
- [Subscription Cancelled](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-cancelled)
- [Subscription Payment Succeeded](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-succeeded)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/devoxa/paddle-sdk/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/devoxa/paddle-sdk/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/devoxa/paddle-sdk/commits?author=queicherius" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/atjeff"><img src="https://avatars1.githubusercontent.com/u/10563763?v=4" width="75px;" alt=""/><br /><sub><b>Jeff Hage</b></sub></a><br /><a href="https://github.com/devoxa/paddle-sdk/pulls?q=is%3Apr+reviewed-by%3Aatjeff" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
