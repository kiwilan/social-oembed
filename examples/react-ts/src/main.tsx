import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SocialOEmbed from './components/SocialOEmbed'
import SocialTiktok from './components/social-tiktok'
import SocialInstagram from './components/social-instagram'

const openGraphs: string[] = [
  // 'https://github.com',
  // 'https://www.nexusmods.com',
  // 'https://bookshelves.ink',
  // 'https://twitter.com/BalletOParis/status/1580947790250721283',
  // 'https://www.tiktok.com/@mrnatasmr/video/7155146642000219398?is_copy_url=1&is_from_webapp=v1',
  // 'https://open.spotify.com/track/6xMpUNOfaSkyywPiFFXZFh',
]
const oembeds: Record<string, string> = {
  TwitterBalletOParis:
    'https://twitter.com/BalletOParis/status/1580947790250721283',
  YouTubeLesQuatreSaisons: 'https://www.youtube.com/watch?v=C243DQBfjho',
  SpotifyLesQuatreSaisons:
    'https://open.spotify.com/track/6xMpUNOfaSkyywPiFFXZFh',
  SpotifyRaya: 'https://open.spotify.com/track/7HS4gcV9uraDTvnjEaZ3Rv',
  Dailymotion: 'https://www.dailymotion.com/video/x1t5li3',
  Vimeo: 'https://vimeo.com/600970110',
  Netflix: 'https://www.netflix.com',
  TikTok: 'https://www.tiktok.com/@mrnatasmr/video/7155146642000219398',
  Instagram: 'https://www.instagram.com/p/CjcnkEXMmSI',
  facebook: 'https://www.facebook.com/operadeparis/videos/536238788377856',
  flickr:
    'https://www.flickr.com/photos/jmlpyt/52419782706/in/photolist-2nTqZei-2nSa681-2nSN6m5-2nSAps9-2nUhL1U-2nSoBzm-2nTbu9B-2nShhsg-2nTAxTW-2nSTCxn-2nTtnAx-2nTHZLX-2nTR15a-2nU9WAe-2nQyt4v-2nPXSHW-2nP63Sf-2nRFz9W-2nS5dzE-2nRzwtk-2nQVwGX-2nSZbAr-2nNJrtJ-2nPfvqv-2nQF5PX-2nQF77p-2nPSyCz-2nTkzfw-2nTd2gL-2nPPo6U-2nQxHGt-2nRwHBj-2nT3NdH-2nSukFw-2nTyG4L-2nNFHvE-2nQkB7Y-2nT6ANM-2nT8nBS-2ietoZN-2nQbxPq-2nNFFXV-2nQTxYm-2nR9Z5u-2nNMz57-2nTuXr5-2nRbjHL-2nP1C8Y-2nRKsQt-2nTS2LB',
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="space-y-5 my-5 max-w-2xl mx-auto">
    {openGraphs.map((url, i) => (
      <SocialOEmbed url={url} key={i} />
    ))}
    {Object.entries(oembeds).map((url, i) => (
      <div>
        <div>{url[0]}</div>
        <SocialOEmbed url={url[1]} key={i} oembed />
      </div>
    ))}
    {/* <SocialInstagram /> */}
    {/* <SocialTiktok /> */}
  </div>
)
