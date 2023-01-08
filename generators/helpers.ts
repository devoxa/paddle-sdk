import fetch from 'node-fetch'

type NextData = {
  props: {
    pageProps: {
      dehydratedState: {
        queries: Array<NextDehydratedStateQuery>
      }
    }
  }
}

type NextDehydratedStateQuery = {
  queryHash: string
  state: {
    data: {
      data: string
    }
  }
}

export async function fetchPageMarkdown(url: string) {
  const response = await fetch(url)
  const text = await response.text()

  const scriptMatch = text.match(/<script id="__NEXT_DATA__" [^>]*>(.*?)<\/script>/)
  if (!scriptMatch) throw new Error('Could not find __NEXT_DATA__ script')

  const data = JSON.parse(scriptMatch[1]) as NextData
  const queries = data.props.pageProps.dehydratedState.queries

  const urlQueryKey = url.split('/').pop() as string
  const queryHashRegex = new RegExp(`"[a-z0-9]{13}-${urlQueryKey}`)
  const query = queries.find((query) => query.queryHash.match(queryHashRegex))
  if (!query) throw new Error(`Could not find query for "${urlQueryKey}" in dehydratedState`)

  return query.state.data.data
}

export function spliceAndReturn<T>(array: Array<T>, index: number): T {
  const element = array[index]
  array.splice(index, 1)
  return element
}

export function trim(string: string, character: string) {
  let start = 0
  let end = string.length

  while (start < end && string[start] === character) ++start
  while (end > start && string[end - 1] === character) --end

  return start > 0 || end < string.length ? string.slice(start, end) : string
}

export function toPascalCase(string: string) {
  const camelCase = string.replace(/_(\w)/g, (_, $1) => $1.toUpperCase())
  return `${camelCase.charAt(0).toUpperCase()}${camelCase.slice(1)}`
}

export function toJSDoc(lines: Array<string>) {
  return lines.length ? `/**\n${lines.map((line) => `* ${line}`).join('\n')}\n*/` : ''
}
