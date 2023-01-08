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
  const query = queries.find((query) => query.queryHash.includes(urlQueryKey))
  if (!query) throw new Error(`Could not find query for "${urlQueryKey}" in dehydratedState`)

  return query.state.data.data
}
