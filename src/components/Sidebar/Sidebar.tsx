import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            {/* LINKS */}
            <section className={styles.links}>
                <div className={styles.sectionTitle}>
                    <h6 className={styles.title}>Navegação</h6>

                    <hr />
                </div>

                <ul className={styles.linksContainer}>
                    <Link to='/views/continent'>
                        <li>
                            <i className="bi bi-globe-americas-fill"></i>
                            Continente
                        </li>
                    </Link>
                    <li>
                        <i className="bi bi-compass-fill"></i>
                        País
                    </li>
                    <li>
                        <i className="bi bi-buildings-fill"></i>
                        Cidade
                    </li>
                </ul>
            </section>

            

            
        </nav>
    )    
}

export default Sidebar;