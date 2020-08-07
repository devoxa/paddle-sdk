export const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
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

export const WEBHOOK_BODY_SUBSCRIPTION_CREATED = {
  alert_id: `364306259`,
  alert_name: `subscription_created`,
  cancel_url: `https://checkout.paddle.com/subscription/cancel?user=9&subscription=9&hash=42dc900b19a0101aeccd04fbab9ffc7a653aefee`,
  checkout_id: `3-4e596a5d8139178-878b1f0c04`,
  currency: `GBP`,
  email: `garret46@example.net`,
  event_time: `2020-08-07 17:20:37`,
  linked_subscriptions: `8, 9, 4`,
  marketing_consent: `1`,
  next_bill_date: `2020-09-04`,
  passthrough: `{"foo":"bar"}`,
  quantity: `23`,
  source: `Activation`,
  status: `trialing`,
  subscription_id: `6`,
  subscription_plan_id: `7`,
  unit_price: `9.99`,
  update_url: `https://checkout.paddle.com/subscription/update?user=2&subscription=6&hash=3504881033812f6bc5757f31691e3cd795feda65`,
  user_id: `9`,
  p_signature: `STeebRs9GDNwZES70EBv+DKIepNkRmxuwVSbbwXfctn3uhP/78UwlgZonNMKqSNx1d4eHcXrIsqg6qHEXbzuEzm5nVnsIUruNz0EG96I0/Fd9o79IUfRSQYfkDQxKZcsL4AMVRUmmkhUSbD66Q8mGeRo5J0iFBOIMUXDNKoN+m0IaM8XmSoLDftxM/+wFAqu46dq5pnMoHSAv+90fDalKU0L2HZpbsHIAa0c3UpZWg5clWwQXfFuZc+tw84qUaa2Nkyj/4a1xKh7CB2+psrTR4+wIIT9qSmb/uCGx1cnnipV4m2id0ZZ4l+hegApE/qO+GC2SsSyi49WkQxHgDIgwkU1sB5eVccHUdvODsAQmdTKhp4JPBzQpauvfVf7yyTDWglIjMxtOiYewRbrvpHPi7wUnjbxwA6cfkRpdatNqW3iJo+IMWqwhiM9vfR8fk1gLgCryCd20K1QRR9FMXPtExa4sxD1KzhKc4RcmyMDGZvLhioUJ8AnHELw3hy3nBLlcAxg8BK63fHwRqHq4gJokzPFjdc13X+aLq23a//RUDjTCymlTer/UZrDorDeeycOCRbskmv1oUFmO/WV4Pnpa2BOAycJN9Fb67JpPGuV/G1MYPJZdGIeh7uO7Fe8+ZlFB/kvIZHaNLmz2woYdNgzAVgySqp+wP/4VVwvDfU5VsA=`,
}
