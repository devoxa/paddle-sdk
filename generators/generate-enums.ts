import fetch from 'node-fetch'
import fs from 'fs'
import { matchAll } from '@devoxa/flocky'

const DOCUMENTATION_URLS = {
  RawPaddleEnumCurrencies: `https://developer.paddle.com/reference/platform-parameters/supported-currencies`,
  RawPaddleEnumCountries: `https://developer.paddle.com/reference/platform-parameters/supported-countries`,
}

type NextDataQuery = {
  queryHash: string
  state: { data: { data: string } }
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
  const enumFields = await getEnumFields(url)
  const sourceCode =
    `export enum ${name} {\n` + enumFields.map((x) => `  ${x} = "${x}",`).join('\n') + `\n}`

  return { sourceCode }
}

async function getEnumFields(url: string) {
  const response = await fetch(url)
  const text = await response.text()

  const dataMatch = text.match(/<script id="__NEXT_DATA__" [^>]*>(.*?)<\/script>/)
  if (!dataMatch) throw new Error('Could not find __NEXT_DATA__')

  const nextData = JSON.parse(dataMatch[1])
  const queries = nextData.props.pageProps.dehydratedState.queries as Array<NextDataQuery>

  const urlQueryKey = url.split('/').pop() as string
  const query = queries.find((query) => query.queryHash.includes(urlQueryKey))
  if (!query) throw new Error(`Could not find query for "${urlQueryKey}"`)

  const queryData = query.state.data.data
  const jsonMatches = matchAll(/```json([\s\S]*?)```/g, queryData)
  return jsonMatches
    .map((match) => JSON.parse(match.subMatches[0]))
    .map((json) => Object.values(json))
    .reduce((a, b) => a.concat(b), [])
    .filter((x, i, self) => self.indexOf(x) === i)
    .sort()
}
