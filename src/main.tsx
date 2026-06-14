import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ColorProvider } from './contexts/ColorContext'
import { ThemeProvider } from './contexts/ThemeContext'

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
