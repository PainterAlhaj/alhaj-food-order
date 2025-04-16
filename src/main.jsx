import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextData from './view/ContextData.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextData>
    <App />
    </ContextData>
  </StrictMode>
)
