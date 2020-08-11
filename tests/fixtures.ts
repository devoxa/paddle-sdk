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

export const subscriptionCreatedWebhook = {
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

export const listSubscriptionsApiResponse = [
  // TODO Add another one that is not cancelled.
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
    linked_subscriptions: [],
    payment_information: {
      payment_method: 'card',
      card_type: 'visa',
      last_four_digits: '1824',
      expiry_date: '08/2021',
    },
    quantity: 1,
  },
]
