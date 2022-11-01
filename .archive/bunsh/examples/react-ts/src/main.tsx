import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import OpenGraph from './OpenGraph'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="space-y-5 my-5">
      <OpenGraph url="https://github.com" />
      <OpenGraph url="https://open.spotify.com" />
      <OpenGraph url="https://www.nexusmods.com" />
    </div>
  </React.StrictMode>
)
