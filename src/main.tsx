import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { ColorProvider } from './contexts/colorContext.js'
import { ThemeProvider } from './contexts/ThemeContext.js'

const rootElement = document.getElementById('root') as HTMLElement

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider>
            <ColorProvider>
                <App />
            </ColorProvider>
        </ThemeProvider>
    </StrictMode>
)
