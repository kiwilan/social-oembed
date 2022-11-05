import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SocialOEmbed from './components/SocialOEmbed'

const openGraphs = [
  'https://github.com',
  'https://www.nexusmods.com',
  'https://ewilan-riviere.com',
  'https://twitter.com/BalletOParis/status/1580947790250721283',
]
const oembeds = [
  // 'https://twitter.com/BalletOParis/status/1580947790250721283',
  'https://www.youtube.com/watch?v=C243DQBfjho',
  'https://open.spotify.com/track/6xMpUNOfaSkyywPiFFXZFh',
  'https://www.dailymotion.com/video/x1t5li3',
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="space-y-5 my-5 max-w-2xl mx-auto">
    {openGraphs.map((url, i) => (
      <SocialOEmbed url={url} key={i} />
    ))}
    {oembeds.map((url, i) => (
      <SocialOEmbed url={url} key={i} oembed />
    ))}
  </div>
)
