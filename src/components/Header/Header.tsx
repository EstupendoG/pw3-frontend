import styles from './Header.module.css' 

interface HeaderProps{
    coverUrl: string,
    coverPosition: string 
    pageBiIcon: string | undefined
    pageEmoji: string | undefined
}

function Header({coverUrl, coverPosition, pageBiIcon, pageEmoji}: HeaderProps) {

    const coverStyles = {
        backgroundImage: `url( ${coverUrl})`,
        backgroundPosition: coverPosition,
    }

    return(
        <header className={`${styles.header}`}>
            <div className={styles.headerImg} style={ coverStyles }>
                <h1 className={`${styles.pageIcon}`}>
                    { pageEmoji && pageEmoji }
                    { pageBiIcon && ( <i className={`bi bi-${pageBiIcon}`}></i> )}

                </h1>
            </div>

            <section className='d-flex justify-content-between align-items-center container-md mt-5'>
                <h1> PostCardd </h1>

                <section className={`d-flex align-items-center`}>
                    <div>opcao</div>
                    <div>opcao</div>
                    <div>opcao</div>
                </section>
            </section>

        </header>

    )
}
export default Header