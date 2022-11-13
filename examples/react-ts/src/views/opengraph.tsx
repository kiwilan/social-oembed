import { openGraphs } from '@/soe-data'
import SocialOEmbed from '@/components/SocialOEmbed'

const opengraph = () => {
  return (
    <div className="space-y-5 my-5 max-w-2xl mx-auto">
      {openGraphs.map((data, i) => (
        <div key={i}>
          <div>{data.name} (oEmbed)</div>
          <SocialOEmbed url={data.url} />
        </div>
      ))}
    </div>
  )
}

export default opengraph
