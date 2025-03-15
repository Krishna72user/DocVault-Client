import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {ContextProvider} from './context/ContextProvider.jsx'
import { LoadingBarContainer } from "react-top-loading-bar";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ContextProvider>
      <LoadingBarContainer>
        <App />
      </LoadingBarContainer>
    </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
