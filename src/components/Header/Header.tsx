import styles from './Header.module.css' 
function Header() {
    return(
        <header className={`d-flex justify-content-between align-items-center ${styles.header}`}>
            <h1> Page Title </h1>

            <section className={`d-flex align-items-center`}>
                <div>opcao</div>
                <div>opcao</div>
                <div>opcao</div>
            </section>
        </header>

    )
}
export default Header