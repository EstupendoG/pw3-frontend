import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextTypes {
    theme: string,
    setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined)

// PROVIDER
export function ThemeProvider ( {children} : {children: React.ReactNode} ) {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    )

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    // Export global
    const value = {
        theme,
        setTheme,
    }

    return(
        <ThemeContext.Provider value={value}>
            { children }
        </ThemeContext.Provider>
    )
}

export function useThemeContext(){
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error('useThemeContext deve ser usado dentro de um ThemeProvider')
    }

    return context
}