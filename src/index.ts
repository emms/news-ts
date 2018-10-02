import * as t from 'io-ts'
import { ThrowReporter } from 'io-ts/lib/ThrowReporter'
import * as rp from 'request-promise'

const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.API_KEY

function optionallyNull<RT extends t.Any>(
  type: RT,
  name: string = `${type.name} | null`
): t.UnionType<
  [RT, t.NullType],
  t.TypeOf<RT> | null,
  t.OutputOf<RT> | null,
  t.InputOf<RT> | null
> {
  return t.union<[RT, t.NullType]>([type, t.null], name);
}

const ArticleValidator = t.type({
  title: t.string,
  url: t.string,
  publishedAt: t.string,
  source: t.object,
  author: optionallyNull(t.union([
    t.array(t.string),
    t.string
  ])),
  urlToImage: optionallyNull(t.string),
  description: optionallyNull(t.string),
  content: optionallyNull(t.string)
})

const TopHeadlinesResponseValidator = t.type({
  status: t.string,
  totalResults: t.number,
  articles: t.array(ArticleValidator)
})

async function getTopHeadlines() {
  try {
    const response = await rp(url)
    const parsedResponse = JSON.parse(response)
    const decodedResponse = TopHeadlinesResponseValidator.decode(parsedResponse)
    ThrowReporter.report(decodedResponse)
    return parsedResponse
  } catch (e) {
    console.error(e)
  }
}

async function printTitlesOfTopHeadlines() {
  const topHeadlines = await getTopHeadlines()
  topHeadlines.articles.map((article: t.TypeOf<typeof ArticleValidator>) => {
    console.log(article.title)
  })
}

printTitlesOfTopHeadlines()