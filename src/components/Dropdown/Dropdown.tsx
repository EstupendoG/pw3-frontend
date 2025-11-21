import { useState, useEffect } from 'react'
import styles from './Dropdown.module.css'
import inputStyles from '../Input/Input.module.css'

interface DropdownItem {
    label: string;
    value: string;
}

interface DropdownProps {
    id?: string;
    label?: string
    placeholder?: string;
    dropdownItems: Record<string, any>[];
    onSelect?: (selectedItem: Record<string, any> | null) => void;
    initialValue?: Record<string, any> | null;
}

const Dropdown = ({id, label, placeholder, dropdownItems, onSelect, initialValue}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(initialValue || null);

    // Atualiza selectedItem quando initialValue muda (ao editar)
    useEffect(() => {
        setSelectedItem(initialValue || null);
    }, [initialValue]);

    const handleSelectItem = (item: Record<string, any>) => {
        setSelectedItem(item);
        setIsOpen(false);
        
        // Chama o callback com o item selecionado
        if (onSelect) {
            onSelect(item);
        }
    };

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
                    {dropdownItems.length === 0 ? (
                        <li className='dropdown-item disabled'>
                            Nenhum item disponível
                        </li>
                    ) : (
                        dropdownItems.map((item, index) => (
                            <li key={index} className='dropdown-item' 
                                onClick={() => handleSelectItem(item)}>
                                {item.label}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        
        </div>
    )
}

export default Dropdown;