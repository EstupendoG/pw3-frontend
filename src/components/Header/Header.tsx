import { useColorContext } from '../../contexts/colorContext.js'
import { useThemeContext } from '../../contexts/ThemeContext.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css' 
import Dropdown from '../Dropdown/Dropdown.js'

interface HeaderProps{
    // coverUrl: string,
    // coverPosition: string 
    // pageBiIcon: string | undefined
    // pageEmoji: string | undefined
    pageTitle: string | undefined
    pageSubtitle: string | undefined
}

function Header({
    // coverUrl, coverPosition, pageBiIcon, pageEmoji
    pageTitle = 'PostCardd', pageSubtitle
}: HeaderProps) {

    // const coverStyles = {
    //     backgroundImage: `url( ${coverUrl})`,
    //     backgroundPosition: coverPosition,
    // }

    const {color, setColor} = useColorContext()
    const {theme, setTheme} = useThemeContext()
    const colorOptions = [
        // 'brown',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'pink',
    ]

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    useEffect(() => {
        console.log(color)
    }, [color])

    return(
        <header className={`${styles.header}`}>
            {/* <div className={styles.headerImg} style={ coverStyles }>
                <h1 className={`${styles.pageIcon}`}>
                    { pageEmoji && pageEmoji }
                    { pageBiIcon && ( <i className={`bi bi-${pageBiIcon}`}></i> )}

                </h1>
            </div> */}

            <section className='d-flex justify-content-between flex-column container-md mt-5'>
                <div className={styles.pageTitle}>
                    <h1> {pageTitle} </h1>
                    
                    {pageSubtitle && (
                        <h2 className={styles.pageSubtitle}> - {pageSubtitle} </h2>
                    )}

                </div>

                <section className={`d-flex justify-content-between align-items-end`}>
                    
                    {/* LINKS */}
                    <section className={styles.links}>
                        <ul className={styles.linksContainer}>
                            <li>
                                <Link to='/views/continent' className={styles.link}>
                                    <i className="bi bi-globe-americas-fill"></i>
                                    <span>Continente</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/views/countries' className={styles.link}>
                                    <i className="bi bi-flag-fill"></i>
                                    <span>País</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/views/cities' className={styles.link}>
                                    <i className="bi bi-buildings-fill"></i>
                                    <span>Cidade</span>
                                </Link>
                            </li>
                        </ul>
                    </section>
                    
                    {/* TEMAS */}
                    <section className={`d-flex gap-1 ${styles.themesContainer}`}>
                        {/* Temas */}
                        <button className={styles.themeToggleBtn} onClick={toggleTheme} title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}>
                            {theme === 'light' ? (
                                <i className="bi bi-sun-fill"></i>
                            ) : (
                                <i className="bi bi-moon-fill"></i>
                            )}
                        </button>

                        {/* Cores */}
                        <div className={`dropstart ${styles.colorDropdown}`}>
                            <button className={styles.dropdownBtn} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className={styles.currentColor} style={{color: `var(--${color}-text)`}}> </span>
                            </button>
                            <ul className={`dropdown-menu px-2 py-0 ${styles.dropdownMenu}`} aria-labelledby="dropdownMenuClickableInside">
                                {colorOptions.map(c => (
                                    <li key={c} className={`dropdown-item px-1`}>
                                        <input className={styles.colorOption} type="radio" name="changeColor" value={c} id={c} onChange={() => setColor(c)}
                                        />
                                        <label htmlFor={c} style={{color: `var(--${c}-text)`}}/>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                        
                    </section>
                </section>
            </section>

            <hr />

        </header>

    )
}
export default Header