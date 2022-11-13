import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './views/layout'
import Home from './views/home'
import Oembed from './views/oembed'
import Opengraph from './views/opengraph'
import Post from './views/post'
import Error from './views/error'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="oembed" element={<Oembed />} />
          <Route path="opengraph" element={<Opengraph />} />
          <Route path="post" element={<Post />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
