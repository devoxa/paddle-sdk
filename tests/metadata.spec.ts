import {
  encryptMetadata,
  ignoreMetadata,
  passthroughMetadata,
  stringifyMetadata,
} from '../src/metadata'

describe('metadata codecs', () => {
  it('"ignore" codec strips metadata values', () => {
    const codec = ignoreMetadata()
    const metadata = null
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  it('"passthrough" codec does not modify metadata values', () => {
    const codec = passthroughMetadata()
    const metadata = 'foo bar baz'
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  it('"stringify" codec stringifies and parses metadata values', () => {
    const codec = stringifyMetadata()
    const metadata = { x: 0 }
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  it('"stringify" codec throws error on parse failure', () => {
    const codec = stringifyMetadata()

    expect(() => {
      codec.parse('garbage')
    }).toThrowError('Failed parsing metadata: Unexpected token g in JSON at position 0')
  })

  it('"encrypt" codec encrypts and decrypts metadata values', () => {
    const codec = encryptMetadata(stringifyMetadata(), '01234567890123456789012345678901')
    const metadata = { x: 0 }
    const encoded = codec.stringify(metadata)
    const decoded = codec.parse(encoded)

    expect(decoded).toEqual(metadata)
  })

  it('"encrypt" codec throws error on decryption failure', () => {
    const codec = encryptMetadata(passthroughMetadata(), '01234567890123456789012345678901')

    expect(() => {
      codec.parse('garbage')
    }).toThrowError('Failed decrypting metadata: Invalid authentication tag length: 0')
  })
})
