import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SocialOEmbed from './components/SocialOEmbed'
import SocialTiktok from './components/social-tiktok'

const openGraphs: string[] = [
  'https://github.com',
  // 'https://www.nexusmods.com',
  'https://bookshelves.ink',
  'https://twitter.com/BalletOParis/status/1580947790250721283',
  'https://www.tiktok.com/@mrnatasmr/video/7155146642000219398?is_copy_url=1&is_from_webapp=v1',
  'https://open.spotify.com/track/6xMpUNOfaSkyywPiFFXZFh',
]
const oembeds: string[] = [
  // 'https://twitter.com/BalletOParis/status/1580947790250721283',
  // 'https://www.youtube.com/watch?v=C243DQBfjho',
  'https://open.spotify.com/track/6xMpUNOfaSkyywPiFFXZFh',
  'https://open.spotify.com/track/7HS4gcV9uraDTvnjEaZ3Rv',
  // 'https://www.dailymotion.com/video/x1t5li3',
  // 'https://vimeo.com/600970110',
  'https://www.netflix.com',
  'https://www.tiktok.com/@mrnatasmr/video/7155146642000219398?is_copy_url=1&is_from_webapp=v1',
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="space-y-5 my-5 max-w-2xl mx-auto">
    {openGraphs.map((url, i) => (
      <SocialOEmbed url={url} key={i} />
    ))}
    {oembeds.map((url, i) => (
      <SocialOEmbed url={url} key={i} oembed />
    ))}
    {/* <SocialTiktok /> */}
  </div>
)
