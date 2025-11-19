import styles from './DatabaseViews.module.css'

import api from '../../service/axios.js';

import Input from '../../components/Input/Input.js';
import { useEffect, useState, useRef } from 'react';

function ContinentView () {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        descricao: '',
    });
    const closeModalRef = useRef<HTMLButtonElement>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        api.get('/continents')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error pegando continentes:', error);
        });
    }

    function handleCreate (){
        api.post('/continents', {
            nome: formData.nome,
            descricao: formData.descricao,
        })
            .then((response) => {
                console.log('Continente criado com sucesso:', response.data);
                setIsUpdating(false);
                closeModalRef.current?.click();
                fetchData();
            })
            .catch((error) => {
                console.error('Erro ao criar continente:', error);
            });
    }

    function handleUpdate (){
        api.put(`/continents/${formData.id}`, formData)
            .then((response) => {
                console.log('Continente atualizado com sucesso:', response.data);
                setIsUpdating(false);
                closeModalRef.current?.click();
                fetchData();
            })
            .catch((error) => {
                console.error('Erro ao atualizar continente:', error);
            });
    }

    function handleDelete (id: number){
        api.delete(`/continents/${id}`)
            .then((response) => {
                console.log('Continente deletado com sucesso:', response.data);
                fetchData();
            })
            .catch((error) => {
                console.error('Erro ao deletar continente:', error);
            });
    }


    return (
        <>
            {/* CABEÇALHO */}
            <header className={`d-flex justify-content-between mb-3 ${styles.pageHeader}`}>
                <section className={`d-flex align-items-center gap-1 ${styles.titleContainer}`}>
                    <i className="bi bi-globe-americas-fill"></i>
                    <h1 className={styles.title}>Continentes</h1>
                </section>

                <section className={` ${styles.controllerContainer}`}>
                    <button className={`${styles.addBtn}`} data-bs-toggle="modal" data-bs-target="#formModal" onClick={() => {
                        setIsUpdating(false)
                        setFormData({
                            id: '',
                            nome: '',
                            descricao: '',
                        });
                    }}>
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
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Código</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((data: any) => (
                                <tr>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.nome}</td>
                                    <td>{data.descricao}</td>
                                    <th className={styles.actionCol}>
                                        <button className={`btn btn-sm btn-primary me-1`}data-bs-toggle="modal" data-bs-target="#formModal"
                                            onClick={() => {
                                                setIsUpdating(true);
                                                setFormData({
                                                    id: data.id,
                                                    nome: data.nome,
                                                    descricao: data.descricao,
                                                });
                                            }}
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </button>

                                        <button className={`btn btn-sm btn-danger`}
                                            onClick={() => handleDelete(data.id)}
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
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="formModal">
                                {isUpdating ? 'Edite o' : 'Adicione um'} Continente
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeModalRef}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <Input id='nome' label='Nome do Continente' 
                                value={formData.nome} 
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    nome: e.target.value
                                }))}/>

                                <Input id='desc' label='Descrição do Continente' 
                                value={formData.descricao} 
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    descricao: e.target.value
                                }))}/>
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

export default ContinentView;