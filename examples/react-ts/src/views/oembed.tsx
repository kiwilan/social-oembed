import { oembeds } from '@/soe-data'
import SocialOEmbed from '@/components/SocialOEmbed'
// import SocialTiktok from '@/components/social-tiktok'
// import SocialInstagram from '@/components/social-instagram'

const oembed = () => {
  return (
    <div className="space-y-5 my-5 max-w-2xl mx-auto">
      {oembeds.map((data, i) => (
        <div key={i}>
          <div>{data.name} (oEmbed)</div>
          <SocialOEmbed url={data.url} oembed />
        </div>
      ))}
      {/* <SocialInstagram /> */}
      {/* <SocialTiktok /> */}
    </div>
  )
}

export default oembed
