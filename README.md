# :no_entry: DEPRECATED :no_entry:

### This package has been archived and is no longer maintained. While we will not provide any updates or support, the code is still available for reference. If you need this package for your project, we encourage you to fork & republish the code following the license terms.

---

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
      src="https://img.shields.io/github/actions/workflow/status/devoxa/paddle-sdk/push.yml?branch=master&style=flat-square"
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
import { PaddleSdk, stringifyMetadata } from '@devoxa/paddle-sdk'

// The metadata you want to attach to subscriptions, to link them to your application entities
type PaddleMetadata = { userId: number }

const paddleSdk = new PaddleSdk<PaddleMetadata>({
  baseUrl: 'https://vendors.paddle.com/api', // (Optional) The base URL of the paddle API (e.g. to use the sandbox)
  publicKey: '...', // Your public key from the paddle dashboard
  vendorId: 123, // Your vendor ID from the paddle dashboard
  vendorAuthCode: 'AAA', // Your vendor auth code from the paddle dashboard
  metadataCodec: stringifyMetadata(), // JSON stringify and parse additional order data
})
```

### Available Methods

```
verifyWebhookEvent(body: any): boolean
parseWebhookEvent(body: any): PaddleSdkSubscriptionCreatedEvent | PaddleSdkSubscriptionUpdatedEvent | ...
async createProductPayLink(data: PaddleSdkCreateProductPayLinkRequest): Promise<PaddleSdkCreateProductPayLinkResponse>
async listSubscriptions(data: PaddleSdkListSubscriptionsRequest): Promise<PaddleSdkListSubscriptionsResponse>
async updateSubscription(data: PaddleSdkUpdateSubscriptionRequest): Promise<PaddleSdkUpdateSubscriptionResponse>
async cancelSubscription(data: PaddleSdkCancelSubscriptionRequest): Promise<PaddleSdkCancelSubscriptionResponse>
async createSubscriptionModifier(data: PaddleSdkCreateSubscriptionModifierRequest): Promise<PaddleSdkCreateSubscriptionModifierResponse>
```

**A note on parsing webhooks:**

If you are using `parseWebhookEvent` on raw events, only enable the following events in your
dashboard to prevent `ImplementationMissing` errors being thrown.

- [Payment Succeeded](https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-succeeded)
- [Payment Refunded](https://developer.paddle.com/webhook-reference/one-off-purchase-alerts/payment-refunded)
- [Subscription Created](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-created)
- [Subscription Updated](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-updated)
- [Subscription Cancelled](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-cancelled)
- [Subscription Payment Succeeded](https://developer.paddle.com/webhook-reference/subscription-alerts/subscription-payment-succeeded)

### Passthrough Data

During the checkout stage Paddle allows passing additional data to your webhooks in the passthrough
strings via either the client-side JavaScript API or the server-side Pay Link API. See the
[official documentation](https://developer.paddle.com/guides/how-tos/checkout/pass-parameters) for
more details. It's your responsibility to properly convert your data structures to/from such a
string. This project offers you a few such converters in the form of metadata codecs which
stringify/parse metadata values to/from passthrough strings:

- `ignoreMetadata` is a codec which ignores metadata values. It stringifies any value to an empty
  string, and parses any string to a `null` value.
- `passthroughMetadata` is a codec which assumes your metadata values are already strings and passes
  them unmodified.
- `stringifyMetadata` is a codec which JSON stringifies/parses your metadata values to/from
  passthrough strings.
- `encryptMetadata` is a wrapper which must be used to decorate any of the above codecs. It applies
  symmetric encryption to the passthrough strings generated by the wrapped codec to prevent users
  from tampering with your data.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/devoxa/paddle-sdk/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/devoxa/paddle-sdk/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/devoxa/paddle-sdk/commits?author=queicherius" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/atjeff"><img src="https://avatars1.githubusercontent.com/u/10563763?v=4" width="75px;" alt=""/><br /><sub><b>Jeff Hage</b></sub></a><br /><a href="https://github.com/devoxa/paddle-sdk/pulls?q=is%3Apr+reviewed-by%3Aatjeff" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/aradzie"><img src="https://avatars0.githubusercontent.com/u/44386?v=4" width="75px;" alt=""/><br /><sub><b>Aliaksandr Radzivanovich</b></sub></a><br /><a href="https://github.com/devoxa/paddle-sdk/commits?author=aradzie" title="Code">💻</a> <a href="https://github.com/devoxa/paddle-sdk/commits?author=aradzie" title="Documentation">📖</a> <a href="https://github.com/devoxa/paddle-sdk/commits?author=aradzie" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
