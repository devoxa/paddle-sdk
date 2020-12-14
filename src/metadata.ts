import * as aes from '@devoxa/aes-encryption'
import { PaddleSdkException } from './exceptions'

/**
 * Encodes and decodes additional pass-through data for an order
 *
 * @see https://developer.paddle.com/guides/how-tos/checkout/pass-parameters
 */
export type MetadataCodec<TMetadata> = {
  /** Stringifies the given metadata value to a `passthrough` string */
  readonly stringify: (metadata: TMetadata) => string

  /** Parses the given `passthrough` string to a metadata value */
  readonly parse: (passthrough: string) => TMetadata
}

/**
 * Creates a new metadata codec whose `stringify` method always returns empty string
 * and `parse` method always returns `null`
 */
export function ignoreMetadata(): MetadataCodec<null> {
  return {
    stringify: () => '',
    parse: () => null,
  }
}

/** Creates a new metadata codec which passes through metadata strings unmodified */
export function passthroughMetadata(): MetadataCodec<string> {
  return {
    stringify: (metadata) => metadata,
    parse: (passthrough) => passthrough,
  }
}

/** Creates a new metadata codec which uses `JSON` to stringify and parse metadata values */
export function stringifyMetadata<TMetadata>(): MetadataCodec<TMetadata> {
  return {
    stringify: (metadata) => JSON.stringify(metadata),
    parse: (passthrough) => {
      try {
        return JSON.parse(passthrough) as TMetadata
      } catch (err) {
        throw new PaddleSdkException('Failed parsing metadata: ' + err.message)
      }
    },
  }
}

/**
 * Applies symmetric encryption to the given metadata codec
 *
 * @example
 * ```
 * // Apply encryption to plain string metadata values.
 * const codec1 = encryptMetadata(passthroughMetadata(), encryptionKey);
 *
 * // Apply encryption to JSON-stringified metadata values.
 * const codec2 = encryptMetadata(stringifyMetadata<MyMetadata>(), encryptionKey);
 * ```
 */
export function encryptMetadata<TMetadata>(
  codec: MetadataCodec<TMetadata>,
  encryptionKey: string
): MetadataCodec<TMetadata> {
  if (!encryptionKey || encryptionKey.length !== 32) {
    throw new PaddleSdkException('PaddleSdk was called with an invalid encryption key')
  }
  return {
    stringify: (metadata) => aes.encrypt(encryptionKey, codec.stringify(metadata)),
    parse: (passthrough) => {
      let decrypted
      try {
        decrypted = aes.decrypt(encryptionKey, passthrough)
      } catch (err) {
        throw new PaddleSdkException('Failed decrypting metadata: ' + err.message)
      }
      return codec.parse(decrypted)
    },
  }
}
