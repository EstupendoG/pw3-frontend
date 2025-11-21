import { createContext, useContext, useEffect, useState, type ContextType } from "react";

interface ColorContextType {
    color: string,
    setColor: (color: string) => void,
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

// PROVIDER
export function ColorProvider({ children }: { children: React.ReactNode }){
    const [color, setColor] = useState(
        localStorage.getItem('color') || 'green'
    )

    useEffect(() => {
        document.documentElement.setAttribute('data-color', color )

        localStorage.setItem('color', color)
    }, [color])

    // Export Global
    const value = {
        color,
        setColor
    }

    return( 
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
}

export function useColorContext(){
    const context = useContext(ColorContext)
    if(!context){
        throw new Error('useColorContext deve ser usado dentro de um ColorProvider')
    }

    return context
}