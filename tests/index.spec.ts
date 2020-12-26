import * as FIXTURES from './fixtures'
import { PaddleSdk } from '../src/index'
import { encryptMetadata, stringifyMetadata } from '../src/metadata'

describe('PaddleSDK', () => {
  it('throws an error when initialized without a public key', async () => {
    expect(() => {
      // @ts-expect-error missing public key
      new PaddleSdk({
        vendorId: FIXTURES.vendorId,
        vendorAuthCode: FIXTURES.vendorAuthCode,
        metadataCodec: encryptMetadata(stringifyMetadata(), FIXTURES.metadataEncryptionKey),
      })
    }).toThrowErrorMatchingSnapshot()
  })

  it('throws an error when initialized without a vendor id', async () => {
    expect(() => {
      // @ts-expect-error missing vendor id
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        vendorAuthCode: FIXTURES.vendorAuthCode,
        metadataCodec: encryptMetadata(stringifyMetadata(), FIXTURES.metadataEncryptionKey),
      })
    }).toThrowErrorMatchingSnapshot()
  })

  it('throws an error when initialized without a vendor auth code', async () => {
    expect(() => {
      // @ts-expect-error missing vendor auth code
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        vendorId: FIXTURES.vendorId,
        metadataCodec: encryptMetadata(stringifyMetadata(), FIXTURES.metadataEncryptionKey),
      })
    }).toThrowErrorMatchingSnapshot()
  })

  it('throws an error when initialized without a metadata codec', async () => {
    expect(() => {
      // @ts-expect-error missing encryption key
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        vendorId: FIXTURES.vendorId,
        vendorAuthCode: FIXTURES.vendorAuthCode,
      })
    }).toThrowErrorMatchingSnapshot()
  })

  it('throws an error when initialized with a wrong metadata encryption key', async () => {
    expect(() => {
      new PaddleSdk({
        publicKey: FIXTURES.publicKey,
        vendorId: FIXTURES.vendorId,
        vendorAuthCode: FIXTURES.vendorAuthCode,
        metadataCodec: encryptMetadata(stringifyMetadata(), 'FooBar'),
      })
    }).toThrowErrorMatchingSnapshot()
  })
})
