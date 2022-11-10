import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SocialOEmbed from './components/SocialOEmbed'
import SocialTiktok from './components/social-tiktok'
import SocialInstagram from './components/social-instagram'
import { oembeds, openGraphs } from './soe-data'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="space-y-5 my-5 max-w-2xl mx-auto">
    {openGraphs.map((data, i) => (
      <div key={i}>
        <div>{data.name} (OpenGraph)</div>
        <SocialOEmbed url={data.url} />
      </div>
    ))}
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
