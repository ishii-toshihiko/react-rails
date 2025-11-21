import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/table-custom.css'
import './styles/card-custom.css'
import './styles/works-custom.css'
import './styles/contact-custom.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
