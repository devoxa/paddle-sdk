import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'

describe('webhooks -> api methods', () => {
  it('can not without public key', async () => {
    expect(() => {
      // @ts-expect-error
      new PaddleSdk({
        // publicKey: FIXTURES.publicKey,
        vendorId: FIXTURES.vendorId,
        vendorAuthCode: FIXTURES.vendorAuthCode,
        metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
      })
    }).toThrowErrorMatchingSnapshot()
  })
  it('can not without vendor id', async () => {
    expect(() => {
      // @ts-expect-error
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        // vendorId: FIXTURES.vendorId,
        vendorAuthCode: FIXTURES.vendorAuthCode,
        metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
      })
    }).toThrowErrorMatchingSnapshot()
  })
  it('can not without vendor auth', async () => {
    expect(() => {
      // @ts-expect-error
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        vendorId: FIXTURES.vendorId,
        // vendorAuthCode: FIXTURES.vendorAuthCode,
        metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
      })
    }).toThrowErrorMatchingSnapshot()
  })
  it('can not without metadata encryption key', async () => {
    expect(() => {
      // @ts-expect-error
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        vendorId: FIXTURES.vendorId,
        vendorAuthCode: FIXTURES.vendorAuthCode,
        // metadataEncryptionKey: FIXTURES.metadataEncryptionKey,
      })
    }).toThrowErrorMatchingSnapshot()
  })
  it('can not with wrong metadata encryption key', async () => {
    expect(() => {
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        vendorId: FIXTURES.vendorId,
        vendorAuthCode: FIXTURES.vendorAuthCode,
        metadataEncryptionKey: 'FooBar',
      })
    }).toThrowErrorMatchingSnapshot()
  })
})
