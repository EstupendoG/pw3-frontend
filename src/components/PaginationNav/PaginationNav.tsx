import { useState, useEffect } from 'react'
import styles from './PaginationNav.module.css'

interface PaginationNavProps{
    currentPage: number,
    totalPages: number,
    setPage: (page: number) => void
}

const PaginationNav = ({currentPage, totalPages, setPage}: PaginationNavProps) => {
    const [pagesIndexes, setPagesIndexes] = useState<number[]>([])

    useEffect(() => {
        let start = currentPage - 2
        let end = currentPage + 2

        // Estouro no inicio
        if (start < 1){
            end += 1 - start
            start = 1
        }
        // Estouro no final
        if(end > totalPages){
            start -= end - totalPages
            end = totalPages
        }

        start = Math.max(start, 1)

        const indexes = Array.from({ length: end - start + 1}, (_, i) => start + i)

        setPagesIndexes(indexes)
    }, [currentPage, totalPages])

    return (
        <div className={styles.container}>
            {/* Voltar 1 */}
            <button className={styles.paginationBtn} 
                disabled={currentPage === 1}
                onClick={ () => {
                    setPage(currentPage - 1)
                }}
            > 
                <i className="bi bi-chevron-left"></i>
            </button>
            
            {/* Voltar para começo */}
            <button className={`${styles.paginationBtn} ${styles.extremeBtn}`} 
                disabled={pagesIndexes.includes(1)}
                onClick={ () => {
                    setPage(1)
                }}
            > 
                <i className="bi bi-chevron-double-left"></i>
            </button>
            
            {/* Indices */}
            <section className={styles.pagesIndexes}>
                {pagesIndexes.map(p => (
                    <button 
                        className={`
                            ${styles.paginationBtn}
                            ${styles.indexes}
                            ${p === currentPage && (styles.currentPage)}
                        `}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </button>
                ))}
            </section>
            
            {/* Avançar para fim */}
            <button className={`${styles.paginationBtn} ${styles.extremeBtn}`} 
                disabled={pagesIndexes.includes(totalPages)}
                onClick={ () => {
                    setPage(totalPages)
                }}
            > 
                <i className="bi bi-chevron-double-right"></i>
            </button>

            {/* Avançar 1 */}
            <button className={styles.paginationBtn} 
                disabled={currentPage === totalPages}
                onClick={ () => {
                    setPage(currentPage + 1)
                }}
            > 
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    )
}

export default PaginationNav