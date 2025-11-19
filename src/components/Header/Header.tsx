import styles from './Header.module.css' 
import { useColorContext } from '../../contexts/colorContext.js'
import { useEffect } from 'react'

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

            <section className='d-flex justify-content-between align-items-center container-md mt-5'>
                <div className={styles.title}>
                    <h1> {pageTitle} </h1>
                    
                    {pageSubtitle && (
                        <h2 className={styles.subtitle}> - {pageSubtitle} </h2>
                    )}

                </div>

                <section className={`d-flex align-items-center`}>
                    <div className={`d-flex ${styles.colorContainer}`}>

                        <span className={styles.currentColor} style={{color: `var(--${color}-text)`}}> </span>
                        <div className={`d-flex align-items-center ${styles.colorOptions}`}>
                            {colorOptions.map(c => (
                                <>
                                    <input className={styles.colorOption} type="radio" name="changeColor" value={c} id={c} key={`${c}-input`} onChange={() => setColor(c)}
                                    />
                                    <label htmlFor={c} style={{color: `var(--${c}-text)`}} key={`${c}-label`}></label>
                                </>
                            ))}
                        </div>

                    </div>
                </section>
            </section>

        </header>

    )
}
export default Header