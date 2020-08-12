import fetch from 'node-fetch'
import fs from 'fs'
import execall from 'execall'

const DOCUMENTATION_URLS = {
  RawPaddleEnumCurrencies: `https://developer.paddle.com/reference/platform-parameters/supported-currencies`,
  RawPaddleEnumCountries: `https://developer.paddle.com/reference/platform-parameters/supported-countries`,
}

run()

async function run() {
  let types = []

  for (let [name, url] of Object.entries(DOCUMENTATION_URLS)) {
    types.push(await buildType(name, url))
    console.log(`Built types from ${url}`)
  }

  const code = `// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT EDIT.

${types.map((x) => x.sourceCode).join('\n\n')}`

  fs.writeFileSync(__dirname + '/../src/__generated__/enums.ts', code, 'utf-8')
  console.log('Written into /src/__generated__/enums.ts')
}

async function buildType(name: string, url: string) {
  const unionType = await getUnionType(url)
  const sourceCode = `export type ${name} = ` + unionType.map((x) => `"${x}"`).join(' | ')

  return { sourceCode }
}

async function getUnionType(url: string) {
  const response = await fetch(url)
  const text = await response.text()

  const matches = execall(/<code>(.*?)<\/code>/g, text)
  return matches.map((match) => match.subMatches[0])
}
