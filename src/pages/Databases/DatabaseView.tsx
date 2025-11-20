import styles from './DatabaseViews.module.css'

import api from '../../service/axios.js';

import Input from '../../components/Input/Input.js';
import Dropdown from '../../components/Dropdown/Dropdown.js';
import { useEffect, useState, useRef } from 'react';
import { getForeignKeys, getForeignKeyConfig } from '../../config/relationshipConfig.js';

interface DatabaseViewProps {
    dataFormat: Record<string, any>;
    entity: string;
    iconClass: string;
    route: string;
}

function DatabaseView ({dataFormat, entity, iconClass, route}: DatabaseViewProps) {
    const dataKeys = Object.keys(dataFormat);
    const [data, setData] = useState([])
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isUpdating, setIsUpdating] = useState(false);
    const closeModalRef = useRef<HTMLButtonElement>(null);

    const [relatedData, setRelatedData] = useState<Record<string, any>>({});
    
    // Pega as Foreign Keys desta entidade
    const foreignKeys = getForeignKeys(entity);

    useEffect(() => {
        fetchData();
        
        const fks = getForeignKeys(entity);
        if (fks.length > 0) {
            loadRelatedData(fks);
        }
    }, [entity]);

    function fetchData() {
        api.get(route)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error(`Erro ao buscar ${entity}:`, error);
        });
    }

    function loadRelatedData(fks: string[]) {
        const relatedDataTemp: Record<string, any> = {};
        let completedRequests = 0;

        fks.forEach((foreignKeyField) => {
            const config = getForeignKeyConfig(entity, foreignKeyField);
            if (!config) {
                return;
            }
            
            api.get(config.route)
                .then((response) => {
                    // Transforma os dados em formato esperado pelo Dropdown
                    const formattedData = response.data.map((item: any) => ({
                        ...item,
                        label: item[config.label] || item.nome || item.id,
                    }));

                    relatedDataTemp[foreignKeyField] = formattedData;
                    completedRequests++;

                    // Atualiza estado apenas quando todas as requisições terminarem
                    if (completedRequests === fks.length) {
                        setRelatedData(relatedDataTemp);
                    }
                })
                .catch((error) => {
                    console.error(`Erro ao carregar ${foreignKeyField}:`, error);
                    completedRequests++;
                    
                    if (completedRequests === fks.length) {
                        setRelatedData(relatedDataTemp);
                    }
                });
        });
    }

    function handleCreate (){
        const payload = Object.fromEntries(dataKeys
                .filter(key => key !== 'id')
                .map((key) => [key, formData[key]])
        );
        
        api.post(route, payload)
            .then((response) => {
                setIsUpdating(false);
                closeModalRef.current?.click();
                fetchData();
            })
            .catch((error) => {
                console.error(`Erro ao criar ${entity}:`, error.response?.data || error.message);
            });
    }

    function handleUpdate (){
        const payload = Object.fromEntries(dataKeys
                .filter(key => key !== 'id')
                .map((key) => [key, formData[key]])
        );
        
        api.put(`${route}/${formData.id}`, payload)
            .then((response) => {
                setIsUpdating(false);
                closeModalRef.current?.click();
                fetchData();
            })
            .catch((error) => {
                console.error(`Erro ao atualizar ${entity}:`, error.response?.data || error.message);
            });
    }

    function handleDelete (id: number){
        api.delete(`${route}/${id}`)
            .then((response) => {
                fetchData();
            })
            .catch((error) => {
                console.error(`Erro ao deletar ${entity}:`, error);
            });
    }


    return (
        <>
            {/* CABEÇALHO */}
            <header className={`d-flex justify-content-between mb-3 ${styles.pageHeader}`}>
                <section className={`d-flex align-items-center gap-1 ${styles.titleContainer}`}>
                    <i className={`bi bi-${iconClass}`}></i>
                    <h1 className={styles.title}>
                        {entity}
                    </h1>
                </section>

                <section className={` ${styles.controllerContainer}`}>
                    <button className={`${styles.addBtn}`} data-bs-toggle="modal" data-bs-target="#formModal" 
                        onClick={() => {
                            setIsUpdating(false)

                            const initial: any = {};
                            dataKeys.forEach(key => {
                                initial[key] = '';
                            })
                            setFormData(initial);
                        }
                    }>
                        <i className="bi bi-plus" />
                    </button>
                </section>

            </header>

            {/* TABELA */}
            <main className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table className={`table table-sm ${styles.dataTable}`}>
                        <thead>
                            <tr>
                                {dataKeys.map(key => (
                                    <th scope="col" key={key}>{key}</th>
                                ) )}
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((data: any) => (
                                <tr key={data.id}>
                                    
                                    {dataKeys.map(key => (
                                        <td key={key}>{data[key]}</td>
                                    ))}
                                    
                                    <th className={styles.actionCol}>
                                        <button className={`btn btn-sm me-1`} data-bs-toggle="modal" data-bs-target="#formModal"
                                            onClick={() => {
                                                setIsUpdating(true);

                                                const initial: any = {};
                                                dataKeys.forEach(key => {
                                                    initial[key] = data[key];
                                                })
                                                setFormData(initial);
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>

                                        <button className={`btn btn-sm`}
                                            onClick={() => {
                                                handleDelete(data.id)}
                                            }
                                        > 
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>



            {/* MODAIS */}
            <div className="modal fade" id="formModal" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={`modal-content ${styles.modalConentent}`}>

                        <div className={`modal-header justify-content-between ${styles.modalHeader}`}>
                            <h1 className={`modal-title fs-5 ${styles.title}`} id="formModal">
                                <i className="bi bi-pencil-square me-2"></i>
                                {isUpdating ? 'Edite o' : 'Adicione um'} Continente
                            </h1>

                            <button type="button" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='d-flex flex-column gap-2'>
                                {dataKeys
                                    .filter(key => key !== 'id')
                                    .map((key) => {
                                        const isForeignKey = foreignKeys.includes(key);
                                        
                                        if (isForeignKey) {
                                            // Renderiza Dropdown para Foreign Keys
                                            const dropdownItems = relatedData[key] || [];
                                            const currentValue = formData[key];
                                            const selectedItem = dropdownItems.find((item: any) => item.id === currentValue) || null;
                                            
                                            return (
                                                <Dropdown
                                                    key={key}
                                                    id={key}
                                                    label={`Selecione o ${key}`}
                                                    placeholder={`Nenhum ${key} selecionado`}
                                                    dropdownItems={dropdownItems}
                                                    initialValue={selectedItem}
                                                    onSelect={(selectedItem) => {
                                                        if (selectedItem) {
                                                            // Armazena id da entidade relacionada
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                [key]: selectedItem.id
                                                            }));
                                                        }
                                                    }}
                                                />
                                            );
                                        } else {
                                            // Renderiza Input comum
                                            return (
                                                <Input
                                                    id={key}
                                                    label={`${key} do ${entity}`}
                                                    key={key}
                                                    value={formData[key]}
                                                    onChange={(e) => setFormData(prev => ({
                                                        ...prev,
                                                        [key]: e.target.value
                                                    }))}
                                                />
                                            );
                                        }
                                    })
                                }
                            </form>
                        </div>
                        <div className="modal-footer">
                            <section className={styles.modalBtn}>
                                <button type="button" className="btn" data-bs-dismiss="modal">Fechar</button>
                                {isUpdating ? (
                                    <button type="button" className="btn" onClick={() => handleUpdate()}>
                                        Salvar Edição
                                    </button>
                                ) : (   
                                    <button type="button" className="btn" onClick={() => handleCreate()}>
                                        Adicionar
                                    </button>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DatabaseView;