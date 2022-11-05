import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SocialOEmbed from './components/SocialOEmbed'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className="space-y-5 my-5 max-w-2xl mx-auto">
    <SocialOEmbed url="https://github.com" />
    {/* <OpenGraph url="https://open.spotify.com" />
  <OpenGraph url="https://www.nexusmods.com" />
  <OpenGraph url="https://ewilan-riviere.com" />
  <OpenGraph url="https://vivacia.bookshelves.ink" /> */}
    {/* <OpenGraph url="https://twitter.com/BalletOParis/status/1580947790250721283" /> */}
    <SocialOEmbed url="https://www.youtube.com/watch?v=C243DQBfjho" oembed />
  </div>
)
