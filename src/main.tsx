import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { MDXProvider } from '@mdx-js/react'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MDXProvider components={{}}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </StrictMode>,
)
