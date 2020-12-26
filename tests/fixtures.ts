import {
  RawPaddlePostProductGeneratePayLinkResponse,
  RawPaddlePostSubscriptionModifiersCreateResponse,
  RawPaddlePostSubscriptionUsersCancelResponse,
  RawPaddlePostSubscriptionUsersResponse,
  RawPaddlePostSubscriptionUsersUpdateResponse,
} from '../src/__generated__/api-routes'
import {
  RawPaddlePaymentRefundedAlert,
  RawPaddlePaymentSucceededAlert,
  RawPaddleSubscriptionCancelledAlert,
  RawPaddleSubscriptionCreatedAlert,
  RawPaddleSubscriptionPaymentSucceededAlert,
  RawPaddleSubscriptionUpdatedAlert,
} from '../src/__generated__/webhook-alerts'

export const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvTyIlXs2V2WVVtIdl62o
sjghcb6yT1XjWvWgIYuv8bEY7PaYnSm32SWkwi50qsHxz0khDhPlsIf9nmkrzMJS
LI46PDE1ccfnCIlRkwEyr3Cc4vn1YLSBXuv+faSkcPWFZKcaBO4c+pE7ttoYxl12
Ft1dvDNyEe8qofWSuQg5/AfrBx73Csn7YxQCmOZQeN9TWpzNOq/hPgNL+icUJVfC
kkch3yg5j6epxUgM7EDP2UYYH7LlHWR4naA77d8bzIt80AeBnia+HwAwpHL0LN8L
biglrxzX5pIR+4lPkjiAfil6qfB1UuC1l1Xnsl4cXVhr760VYqTftvMT6bhWuzrt
MYyo97LfO8rb0k3uB9DLcJAgvCo/27J1ijoQMX9L/6Pf1q/hgmtJ0JVe8SwaFQTo
247L6m9tJFF/tsvAuFJTT9L7KQsoJB/sgUXvRJvcqVcaFeTSkw4uRKk0aGtG7S5i
zRoqnkJFHV71N59bZCgDMGhKwdKhr43W/E9E557y+GQmrqkfd8kHd5SRLbE6WruT
k/pePP6oiYQMFUMLn3OVlph/Wqt3sRUKVrDwJDPxw8GCzBNkKYPjyS/Ow0Em3JQ/
rZQd8jVtIZHUkZnggGsCHVgrp+n5wvc4EA3dsdaazV7u8oDfk1EpYraGlNjsjnTY
VpEfcjiOIG6t/VmGu32pCDECAwEAAQ==
-----END PUBLIC KEY-----`

export const vendorId = 123456

export const vendorAuthCode = 'FooBarBaz'

export const metadataEncryptionKey = 'ZtdDl3Ex7ycFfgdbAC3uTLNk8eLVDcEd'

export const paymentSucceededEvent: RawPaddlePaymentSucceededAlert = {
  alert_id: `123456789`,
  alert_name: `payment_succeeded`,
  balance_currency: `USD`,
  balance_earnings: `317.23`,
  balance_fee: `875.73`,
  balance_gross: `800.96`,
  balance_tax: `412.02`,
  checkout_id: `9-656d6c95693cd5b-77ea2a55f9`,
  country: `AU`,
  coupon: `Coupon 9`,
  currency: `EUR`,
  customer_name: `Customer Name`,
  earnings: `140.26`,
  email: `foo@bar.com`,
  event_time: `2020-08-12 21:01:30`,
  fee: `0.75`,
  ip: `89.207.217.18`,
  marketing_consent: `1`,
  order_id: `3`,
  p_signature: `GLv7wxZi4E1GLo+SmFnq3OAiZ7ib8wcU/WBh/8sXlmocTIBBx5yBjnvDbE0qaNgxMlew/esYfDv1ApHAnz93J/MziloBoLmu/8YCjDddVFs1R/Y+2sbIhkI5xu84Uz1BobkIPtR/+GVgI0k2XeLudG3weCc6/eUa/T3dxc0p9b9aenKGig1HxHpWTCBi5fnr121c7HDlly6eyPlGrmk5yrwtbfTGBmvrwU3c3X7Nh0lVGEMt1Y2KEqgfFsaGwdg9JnT/xDg33NyEKDPOu0asvb6cPmRS+q+ojUnzBldFCd/+/H9TjE/Qjoqy8bNNjAIKH3kReyZls42631Hf3DuqsTLg2uR6xQCXTxLvRukdkUKsidu2sadLJ5NgibpnWsplgptS7AFXwm7uwvarFmbwSrN1YgI3vvN/Hm3/3xWHlpbfhUKDeOu2O5JW8drsgFNY2DIdE57HqseutKypp0shgZBfDn+aYyk6o0GhbmkY54dmtFRqxCFNFiy5TXfKQcFKi71nvYdd6ILQOj43HKvNScKm4cuiCqoLNOtYs3kY1k8nlvgyTY6EV1vYf+I84bt/BbKDgwNTmJoHwAeRACwVg59wb1hV5upCbHFy/Qn3/M189Nl6FiutlGqnuTwEwxapdGbFegjAd062OA8Ye4yixIOnsPIWGsTGcIkHEQyRLN0=`,
  passthrough: `kLFV0ZkzYdTrYKIvFhQlkK9vccfQP0FxGpK10j563YK2zCGdhMij2aX/sblM`,
  payment_method: `paypal`,
  payment_tax: `0.48`,
  product_id: `4`,
  product_name: `Example Product Name`,
  quantity: `77`,
  receipt_url: `https://my.paddle.com/receipt/5/2fe1b313345427e-2e6b05993f`,
  sale_gross: `804.76`,
  used_price_override: `true`,
}

export const paymentRefundedEvent: RawPaddlePaymentRefundedAlert = {
  alert_id: `123456789`,
  alert_name: 'payment_refunded',
  amount: `414.43`,
  balance_currency: `USD`,
  balance_earnings_decrease: `0.34`,
  balance_fee_refund: `0.11`,
  balance_gross_refund: `0.28`,
  balance_tax_refund: `0.96`,
  checkout_id: `9-a568055ec8edc7b-e57313c2c0`,
  currency: `EUR`,
  earnings_decrease: `0.08`,
  email: `foo@bar.com`,
  event_time: `2020-08-12 21:01:30`,
  fee_refund: `0.86`,
  gross_refund: `0.61`,
  marketing_consent: `1`,
  order_id: `8`,
  p_signature: `GLv7wxZi4E1GLo+SmFnq3OAiZ7ib8wcU/WBh/8sXlmocTIBBx5yBjnvDbE0qaNgxMlew/esYfDv1ApHAnz93J/MziloBoLmu/8YCjDddVFs1R/Y+2sbIhkI5xu84Uz1BobkIPtR/+GVgI0k2XeLudG3weCc6/eUa/T3dxc0p9b9aenKGig1HxHpWTCBi5fnr121c7HDlly6eyPlGrmk5yrwtbfTGBmvrwU3c3X7Nh0lVGEMt1Y2KEqgfFsaGwdg9JnT/xDg33NyEKDPOu0asvb6cPmRS+q+ojUnzBldFCd/+/H9TjE/Qjoqy8bNNjAIKH3kReyZls42631Hf3DuqsTLg2uR6xQCXTxLvRukdkUKsidu2sadLJ5NgibpnWsplgptS7AFXwm7uwvarFmbwSrN1YgI3vvN/Hm3/3xWHlpbfhUKDeOu2O5JW8drsgFNY2DIdE57HqseutKypp0shgZBfDn+aYyk6o0GhbmkY54dmtFRqxCFNFiy5TXfKQcFKi71nvYdd6ILQOj43HKvNScKm4cuiCqoLNOtYs3kY1k8nlvgyTY6EV1vYf+I84bt/BbKDgwNTmJoHwAeRACwVg59wb1hV5upCbHFy/Qn3/M189Nl6FiutlGqnuTwEwxapdGbFegjAd062OA8Ye4yixIOnsPIWGsTGcIkHEQyRLN0=`,
  passthrough: `kLFV0ZkzYdTrYKIvFhQlkK9vccfQP0FxGpK10j563YK2zCGdhMij2aX/sblM`,
  quantity: `68`,
  refund_reason: `Example Reason`,
  refund_type: `full`,
  tax_refund: `0.76`,
}

export const subscriptionCreatedEvent: RawPaddleSubscriptionCreatedAlert = {
  alert_id: `2091557455`,
  alert_name: `subscription_created`,
  cancel_url: `https://checkout.paddle.com/subscription/cancel?user=6&subscription=1&hash=acb15fc760b9d4cb4fae9abf67b7b4d52f12441e`,
  checkout_id: `2-461ecbe710cab0e-f2e284ef00`,
  currency: `GBP`,
  email: `gordon35@example.org`,
  event_time: `2020-08-09 22:11:09`,
  linked_subscriptions: `8, 9, 4`,
  marketing_consent: `1`,
  next_bill_date: `2020-09-03`,
  passthrough: `kLFV0ZkzYdTrYKIvFhQlkK9vccfQP0FxGpK10j563YK2zCGdhMij2aX/sblM`,
  quantity: `23`,
  source: `https://genesis.devoxa.io/`,
  status: `trialing`,
  subscription_id: `6`,
  subscription_plan_id: `7`,
  unit_price: `9.99`,
  update_url: `https://checkout.paddle.com/subscription/update?user=3&subscription=3&hash=ce39e713407ccffbc867dba87e39e88324114274`,
  user_id: `9`,
  p_signature: `D2jcpJvuB1RWUR8nZvf9y6v3l7p3Mn1H5uBOmQ7VInYF1ZRnoIKliedaHWMEI6JG4NkfJewwzeNtEl4wMSd9W+c5MkccUAibvpFTY3yCm+PgyVTGcXxHNTab2bbJRuV+MBvV1h4MR9tGAgf4iAS+MjQN1y0YBv0WV+EFKhoFJsdHjatVLRFmpTkjdwsW75Sm7td7r76mccd2WqCGLyHpnn0wbDzs0xt3xNtS6YSdIKZw6y0G+Pu0vFSKvVYjlbSRbzvjGjNMhlTwcvbFDdya3aFmi0OC0xFhP0BG/iqk3amznshOotj4UMyW8GtTwMCFXAJSxkl1wDp/3H7mdl792g+Ui1fsnpMpMVLpxGMLzCcsUXy1FO2n9U6JrtckSHLmEFifls75e8hW6OOxn3RN8KLWOMi5HLjtxOGOPYYY/hd82QYVHYmDm3tWdK4jFUhc/lePoepzBFdnymGvSkE0s3V9KfMDDwjMAeEhy42KhlAGCCs1TCqsc7uJ8LQLKjGNzbuq2GXFE9TwCNH/iBGhKPPwFVFFKOr6++SJnRHLoqRWo8+jFBl8P4tGwYkFjAOD3sFXWRJQqEFVZ5Qvre/F1OnfCdY/wOKUDOLPrXMIgXde9ROhmgMaFNOZEr6ePzpiTDJ5uH0Qy4ghYghxlCEGUoRKdBFIDJq/0pwbDWUQhi0=`,
}

export const subscriptionUpdatedEvent: RawPaddleSubscriptionUpdatedAlert = {
  alert_id: `1251568959`,
  alert_name: `subscription_updated`,
  cancel_url: `https://checkout.paddle.com/subscription/cancel?user=7&subscription=1&hash=539134462da7ff8bce9581704ff3f462994caf05`,
  checkout_id: `6-1d95a8cd27317a6-f8810efc48`,
  currency: `USD`,
  email: `rconnelly@example.org`,
  event_time: `2020-08-12 02:12:03`,
  linked_subscriptions: `6, 7, 1`,
  marketing_consent: `1`,
  new_price: `19.98`,
  new_quantity: `2`,
  new_unit_price: `9.99`,
  next_bill_date: `2020-09-04`,
  old_next_bill_date: `2020-08-02`,
  old_price: `4.99`,
  old_quantity: `1`,
  old_status: `trialing`,
  old_subscription_plan_id: `2`,
  old_unit_price: `4.99`,
  passthrough: `kLFV0ZkzYdTrYKIvFhQlkK9vccfQP0FxGpK10j563YK2zCGdhMij2aX/sblM`,
  status: `active`,
  subscription_id: `1`,
  subscription_plan_id: `3`,
  update_url: `https://checkout.paddle.com/subscription/update?user=7&subscription=9&hash=89fc4d8da91884f626157cc6095dc857510a1d21`,
  user_id: `3`,
  p_signature: `axnbEGrHYKeCbHPnoYsrKcqWQ7kho8mLJofDORDCA1JP9Ur7/DfG7PWCxAYDRGvlmUCXA1JgjUZ96J+oDtcLqchX6yWuUBb3N9fhz9mt0j7P4Om0p5pFh3tB5iMjNoRm4uh8fZxRnGSZzdaWnA0pj6Iz3M3lk8Uzcj5dfZiEq0bJ9MxL24eB0CmeP8fCN7mhExaaDXu1BmchpJxJhjuG5yiZgwow2P+ccSvHfDjD6MkEMfEk4LvHt6MI99afQxUo92XBiLX0tqfQ3KRqBjEnY6SRXvFq8PbhvetdHwNP02h1qa57Re25Io7KN2lEe3B5uc27g4aicwojCRLzuSHUlnokghbmkg5Vb4vpo62F3ZmQArxd0RuMFHHje5Q+gpN83D/liVR3XtrdDoNSsSMib9Uu7jRpFpJkWgnwScOvh4jMUoHQgWaa6hSJzgj1dAhBwN9y/cKnjkSJijBvj93883XNaNPNZ63BD/LsHFBWtcKdn10DmlJcJ0355IeUb4YHYWqHma3eAud5xxbtwJ5Yz1njaDnn0mLHfifN2tTVfUAYa2xaxCadoUJ06RRCgkve/DbGCHUJ8g7KjXkyq33JUdx204sx0rH0pg5koU5/T7lfDw7CpUDULhWXgTIWVbRecR6f0a66RHOYlF7qDT0vWRbI5BGpRyk2QR5N1XRfEpA=`,
}

export const subscriptionCancelledEvent: RawPaddleSubscriptionCancelledAlert = {
  alert_id: `1523571645`,
  alert_name: `subscription_cancelled`,
  cancellation_effective_date: `2020-08-12 19:51:38`,
  checkout_id: `1-25b286e64f4a228-65f3aadbbb`,
  currency: `GBP`,
  email: `monroe84@example.com`,
  event_time: `2020-08-12 02:13:06`,
  linked_subscriptions: `1, 7, 6`,
  marketing_consent: `0`,
  passthrough: `kLFV0ZkzYdTrYKIvFhQlkK9vccfQP0FxGpK10j563YK2zCGdhMij2aX/sblM`,
  quantity: `93`,
  status: `deleted`,
  subscription_id: `8`,
  subscription_plan_id: `5`,
  unit_price: `4.99`,
  user_id: `5`,
  p_signature: `lHnMWYrwAjuVNu2QOOPMriwHd81XyLRfyN+Y/Jks1jHSzvXG9CripAOB9dEJri6XNQjJFr1RKGAeqSCo6hO4WpgCYcdQx+DKO2aBFkhOrrfTIcOCf2nzWGqDjXKs1w0CmGKgq0aZPcLs3fXlid/vWFw0qBd4MY9rwQ2J+7GGdDHjwaAuzGvI3SddTmKARwGQOiWovG0GLkpMBrLgVt72BkGcdj0pKQ9wzMQDmjQzvT7HxqftVaYc55HGgZvGMBCgvJeBMgJ7es3NWDXi9qRT1k0Cj9xss7q1+rwyfIpFKJqXP4neuSs9NGABxSYzxXjFmAgK2/xEeOnit1B1xnAZlbUor6iR4bbHyKF/mwumWXqhdpfbXM6xXZSQI1VmTi5I2Sv5i5hhnlcm15/3Cd4WvmcQuVKTidd6LLQ9Py8jOcVxCJrjjwvLVkCZWHqpmC7opSRlTwarqEpUiMyKXy4UkTFVHzWNb/DPi6TB1+LXcw1eCn3fHACO7OWj4kXOZg4m67pUZ34Xl9ncdc8gD4xWzcpvwLtvgAEzK23rnMEZUcpCytJBZ9ipRt8ppRsXrX4zdnbq/UZuFmLgnvLSQ5cPKyYkQdBkAFKlA0x3Uo9GyuvfK641Yd6I73NtIqnG0WRj8JWg0ktVYdYI/Hos0cA1QQp9mjXd1tV178IC3MvBTgg=`,
}

export const subscriptionPaymentSucceededEvent: RawPaddleSubscriptionPaymentSucceededAlert = {
  alert_id: `507897344`,
  alert_name: `subscription_payment_succeeded`,
  balance_currency: `GBP`,
  balance_earnings: `233.34`,
  balance_fee: `812.01`,
  balance_gross: `915.81`,
  balance_tax: `865.97`,
  checkout_id: `8-329f6daa7e07bf2-5793a78be0`,
  country: `FR`,
  coupon: `COUPON_CODE`,
  currency: `EUR`,
  customer_name: `Ela Example`,
  earnings: `432.01`,
  email: `dietrich.karlie@example.com`,
  event_time: `2020-08-12 21:01:30`,
  fee: `0.24`,
  initial_payment: `1`,
  instalments: `9`,
  marketing_consent: `1`,
  next_bill_date: `2020-08-20`,
  next_payment_amount: `4.99`,
  order_id: `4`,
  p_signature: `GLv7wxZi4E1GLo+SmFnq3OAiZ7ib8wcU/WBh/8sXlmocTIBBx5yBjnvDbE0qaNgxMlew/esYfDv1ApHAnz93J/MziloBoLmu/8YCjDddVFs1R/Y+2sbIhkI5xu84Uz1BobkIPtR/+GVgI0k2XeLudG3weCc6/eUa/T3dxc0p9b9aenKGig1HxHpWTCBi5fnr121c7HDlly6eyPlGrmk5yrwtbfTGBmvrwU3c3X7Nh0lVGEMt1Y2KEqgfFsaGwdg9JnT/xDg33NyEKDPOu0asvb6cPmRS+q+ojUnzBldFCd/+/H9TjE/Qjoqy8bNNjAIKH3kReyZls42631Hf3DuqsTLg2uR6xQCXTxLvRukdkUKsidu2sadLJ5NgibpnWsplgptS7AFXwm7uwvarFmbwSrN1YgI3vvN/Hm3/3xWHlpbfhUKDeOu2O5JW8drsgFNY2DIdE57HqseutKypp0shgZBfDn+aYyk6o0GhbmkY54dmtFRqxCFNFiy5TXfKQcFKi71nvYdd6ILQOj43HKvNScKm4cuiCqoLNOtYs3kY1k8nlvgyTY6EV1vYf+I84bt/BbKDgwNTmJoHwAeRACwVg59wb1hV5upCbHFy/Qn3/M189Nl6FiutlGqnuTwEwxapdGbFegjAd062OA8Ye4yixIOnsPIWGsTGcIkHEQyRLN0=`,
  passthrough: `kLFV0ZkzYdTrYKIvFhQlkK9vccfQP0FxGpK10j563YK2zCGdhMij2aX/sblM`,
  payment_method: `paypal`,
  payment_tax: `0.48`,
  plan_name: `Example Plan Name`,
  quantity: `35`,
  receipt_url: `https://my.paddle.com/receipt/5/7dce0d96bae94f3-9bb70f9885`,
  sale_gross: `900.3`,
  status: `active`,
  subscription_id: `4`,
  subscription_payment_id: `4`,
  subscription_plan_id: `1`,
  unit_price: `4.99`,
  user_id: `6`,
}

export const createProductPayLinkApiResponse: RawPaddlePostProductGeneratePayLinkResponse = {
  url: 'https://checkout.paddle.com/checkout/custom/5686a6515f1eb5c9c679dc5494dd1b6b',
}

export const listSubscriptionsApiResponse: RawPaddlePostSubscriptionUsersResponse = [
  {
    subscription_id: 7908253,
    plan_id: 124890,
    user_id: 18124595,
    user_email: 'foo@bar.com',
    marketing_consent: false,
    update_url: `https://checkout.paddle.com/subscription/update?user=18124595&subscription=7908253&hash=AEA72A29FABC23692043D8B6D55FD29C625F532552AA8AC6EB137E604FC13E1A`,
    cancel_url: `https://checkout.paddle.com/subscription/cancel?user=18124595&subscription=7908253&hash=9A4EE7D7645833AB6F90F81287DA92E139FE8DF6AF2090081357104138EC6937`,
    state: 'paused',
    signup_date: '2020-08-08 23:15:48',
    last_payment: { amount: 2.99, currency: 'USD', date: '2020-08-08' },
    payment_information: { payment_method: 'paypal' },
    paused_at: '2020-09-01 23:15:48',
    paused_from: '2020-09-08 23:15:48',
  },
  {
    subscription_id: 7908253,
    plan_id: 124890,
    user_id: 18124595,
    user_email: 'foo@bar.com',
    marketing_consent: false,
    update_url: `https://checkout.paddle.com/subscription/update?user=18124595&subscription=7908253&hash=AEA72A29FABC23692043D8B6D55FD29C625F532552AA8AC6EB137E604FC13E1A`,
    cancel_url: `https://checkout.paddle.com/subscription/cancel?user=18124595&subscription=7908253&hash=9A4EE7D7645833AB6F90F81287DA92E139FE8DF6AF2090081357104138EC6937`,
    state: 'active',
    signup_date: '2020-08-08 23:15:48',
    last_payment: { amount: 2.99, currency: 'USD', date: '2020-08-08' },
    next_payment: { amount: 2.99, currency: 'USD', date: '2020-09-08' },
    payment_information: {
      payment_method: 'card',
      card_type: 'visa',
      last_four_digits: '1824',
      expiry_date: '08/2021',
    },
    quantity: 1,
  },
  {
    subscription_id: 7908253,
    plan_id: 124890,
    user_id: 18124595,
    user_email: 'foo@bar.com',
    marketing_consent: false,
    update_url: `https://checkout.paddle.com/subscription/update?user=18124595&subscription=7908253&hash=AEA72A29FABC23692043D8B6D55FD29C625F532552AA8AC6EB137E604FC13E1A`,
    cancel_url: `https://checkout.paddle.com/subscription/cancel?user=18124595&subscription=7908253&hash=9A4EE7D7645833AB6F90F81287DA92E139FE8DF6AF2090081357104138EC6937`,
    state: 'deleted',
    signup_date: '2020-08-08 23:15:48',
    last_payment: { amount: 2.99, currency: 'USD', date: '2020-08-08' },
    payment_information: {
      payment_method: 'card',
      card_type: 'visa',
      last_four_digits: '1824',
      expiry_date: '08/2021',
    },
    quantity: 1,
  },
]

export const updateSubscriptionApiResponse: RawPaddlePostSubscriptionUsersUpdateResponse = {
  subscription_id: 1,
  user_id: 2,
  plan_id: 3,
  next_payment: {
    amount: 9.99,
    currency: 'EUR',
    date: '2020-03-04',
  },
}

export const cancelSubscriptionApiResponse: RawPaddlePostSubscriptionUsersCancelResponse = undefined

export const createSubscriptionModifierApiResponse: RawPaddlePostSubscriptionModifiersCreateResponse = {
  subscription_id: 1,
  modifier_id: 2,
}
