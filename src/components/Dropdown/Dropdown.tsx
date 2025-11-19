import { useState } from 'react'
import styles from './Dropdown.module.css'
import inputStyles from '../Input/Input.module.css'

interface DropdownProps {
    id?: string;
    label?: string
    placeholder?: string;
    dropdownItems: Record<string, any>[];
}

const Dropdown = ({id, label, placeholder, dropdownItems}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);

    return (
        <div className={inputStyles.container}>
            {label && (
                <label className={inputStyles.label} htmlFor={id}>
                    {label}
                </label>
            )}

            <div className="dropdown">
                <button className={`dropdown d-flex justify-content-between ${styles.dropdownButton} ${inputStyles.input}`} data-bs-toggle="dropdown" aria-expanded="false" id={id}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedItem ? selectedItem.label : (placeholder || 'Selecione uma opção')}
                    
                    {isOpen ? (
                        <i className='bi bi-chevron-up'> </i>
                    ) : (
                        <i className='bi bi-chevron-down'> </i>
                    )}
                </button>
                <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                    {dropdownItems.map((item, index) => (
                        <li key={index} className='dropdown-item' 
                            onClick={() => {
                                setSelectedItem(item)
                                setIsOpen(false)
                            }}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        
        </div>
    )
}

export default Dropdown;