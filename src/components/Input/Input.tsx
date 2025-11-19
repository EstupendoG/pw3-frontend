import styles from './Input.module.css'

interface InputProps {
    placeholder?: string
    label?: string
    id?: string
    type?: string
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Input = ({placeholder = 'Digite o valor', label, id, type = 'text', value, onChange}: InputProps) => {
    
    return(
        <div className={styles.container}>
            {label && (
                <label htmlFor={id} className={styles.label}> 
                    {label}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    id={id && (id) }
                    placeholder={placeholder && (placeholder)}
                    className={styles.input}
                    value={value}
                    onChange={onChange} 
                ></textarea>
            ) : (
                <input
                    type={type} 
                    id={id && (id) }
                    placeholder={placeholder && (placeholder)}
                    className={styles.input}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

export default Input