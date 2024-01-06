import {
  encryptMetadata,
  ignoreMetadata,
  passthroughMetadata,
  stringifyMetadata,
} from '../src/metadata'

describe('metadata codecs', () => {
  test('"ignore" codec strips metadata values', () => {
    const codec = ignoreMetadata()
    const metadata = null
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  test('"passthrough" codec does not modify metadata values', () => {
    const codec = passthroughMetadata()
    const metadata = 'foo bar baz'
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  test('"stringify" codec stringifies and parses metadata values', () => {
    const codec = stringifyMetadata()
    const metadata = { x: 0 }
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  test('"stringify" codec throws error on parse failure', () => {
    const codec = stringifyMetadata()

    expect(() => codec.parse('garbage')).toThrowErrorMatchingSnapshot()
  })

  test('"encrypt" codec encrypts and decrypts metadata values', () => {
    const codec = encryptMetadata(stringifyMetadata(), '01234567890123456789012345678901')
    const metadata = { x: 0 }
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  test('"encrypt" codec throws error on decryption failure', () => {
    const codec = encryptMetadata(passthroughMetadata(), '01234567890123456789012345678901')

    expect(() => codec.parse('garbage')).toThrowErrorMatchingSnapshot()
  })
})
