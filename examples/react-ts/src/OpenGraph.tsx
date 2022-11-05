import { useEffect, useState } from 'react'
import type { OpenGraphData } from './api'
import { fetchData } from './api'

const OpenGraph = (props: { url: string }) => {
  const [openGraph, setOpenGraph] = useState<OpenGraphData>({})

  useEffect(() => {
    async function fetchApi() {
      const og = await fetchData(props.url)

      setOpenGraph(og)
    }

    fetchApi()
  }, [])

  return !openGraph ? (
    <div>Loading...</div>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: openGraph.render ?? '' }}></div>
  )

  return (
    <div>
      <div className="mx-auto max-w-md">
        <a
          href={openGraph.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-900 no-underline dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
        >
          <div
            style={{ backgroundColor: openGraph.themeColor }}
            className="absolute inset-y-0 left-0 h-full w-1 rounded-md"
          ></div>
          <div className="px-2">
            <div className="text-sm">{openGraph.siteName}</div>
            <div className="font-semibold text-xl mt-2">{openGraph.title}</div>
            <div className="text-sm mt-2">{openGraph.description}</div>
            <div>
              {openGraph.image ? (
                <div>
                  <img
                    src={openGraph.image}
                    className="mt-3 w-full h-32 object-cover object-center"
                    alt=""
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default OpenGraph
