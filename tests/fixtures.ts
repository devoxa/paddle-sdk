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
  alert_id: '970782801',
  alert_name: 'subscription_created',
  cancel_url:
    'https://checkout.paddle.com/subscription/cancel?user=3&subscription=5&hash=3ae43cd642290f09283e55516e7c229f1be1c11b',
  checkout_id: '4-6222586f20fc070-c12a2a50f8',
  currency: 'GBP',
  email: 'runolfsdottir.marlin@example.net',
  event_time: '2020-05-17 03:17:15',
  linked_subscriptions: '7, 4, 5',
  marketing_consent: '1',
  next_bill_date: '2020-06-04',
  passthrough: 'Example String',
  quantity: '6',
  source: 'Trial',
  status: 'active',
  subscription_id: '7',
  subscription_plan_id: '3',
  unit_price: 'unit_price',
  update_url:
    'https://checkout.paddle.com/subscription/update?user=7&subscription=7&hash=27f4ec31db009ccca037a3c424fbbfdda5d358f0',
  user_id: '3',
  p_signature:
    'avXxYVv9gQxEIaQv3e/T22+tL2JJsyGpfQCyl5whYneT3laF9BB0j7DU3nhYB7VFfG5g/LsQqs94rsiMqPG4cBPDndVe7r0JQ7MIILj2FLMUE7aL2bjEkmbDfHW08mHo8GobFcYTzugLhA7kv1tlPos04ezcgPv3f6LN+sUATnmIpR+M5/GsRK4UqFoQEtXbsNcgrS6/kk58CugJ75/oZOaYwyB6iIDxr7z8oq3/5BVap5r6mlH9VnmMz4xNAAbOIJ9/depsEcAAXKADPd8b4NDTeal85o0t+38s4X98PJ4STSYwMp9LIps6fOWRlJUh/sCESKiG0HaNJUMFosdtQhpqKRK2DsLbND0GxvtpID2BKcJwDC++LNd3/pomFCAgMdN3s4KVLQk0vs+nGfVV4tIsI0iJKjev/NnFlp8iihx0r+bcCN024c2lVDtoBjY/StmE+KVyfuKAftsIGr8C8Hq8Q69SeBpmJU4TFi12WsKHjt+MvYw46mF2t0gLSaZkK57RFYs2FPyWu+0TESmbmbmfx8lfyA+eDGDr3D+dgdN621uyZuzc3keSB6rdmWOJXDPQslUB6k6ElxL9QnYnt5lf2pYbU1MCBwz5G6jSB2KHxiNVnK0NHu/7m9fBQdl51AtQ+OCF/4DbG2AlNXx33gYaPWgCN18g3EyU9o430N0=',
}
