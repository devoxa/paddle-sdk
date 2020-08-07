import { createVerify } from 'crypto'
import { stableSerialize } from './helpers'
import { PaddleWebhookAlert } from './__generated__/webhook-alerts.interface'

export interface PaddleSdkOptions {
  publicKey: string
}

export class PaddleSdk {
  private readonly publicKey: string

  constructor(options: PaddleSdkOptions) {
    if (!options.publicKey) {
      throw new Error('PaddleSdk was called without a publicKey')
    }

    this.publicKey = options.publicKey
  }

  verifyWebhookBody(postBody: any): postBody is PaddleWebhookAlert {
    if (typeof postBody !== 'object') return false

    const { p_signature: signature, ...postBodyRest } = postBody || {}
    if (!signature || typeof signature !== 'string') return false

    const serializedPostBody = stableSerialize(postBodyRest)

    const verifier = createVerify('sha1')
    verifier.update(serializedPostBody)
    verifier.end()

    return verifier.verify(this.publicKey, signature, 'base64')
  }
}
