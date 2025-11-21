import { useEffect, useState, type SetStateAction } from "react"

import styles from './Homepage.module.css'
import api from "../../service/axios.js"

import Dropdown from "../../components/Dropdown/Dropdown.js";
import Input from "../../components/Input/Input.js";

function Homepage() {
    const [countryData, setCountryData] = useState<Record<string, any>[]>([])
    const [selectedCurrency, setSelectedCurrency] = useState<{label: string, value: string} | null>(null);
    const [valor, setValor] = useState<string>('')
    const [quoteRes, setQuoteRes] = useState<{quote:number, currency:string}>()
    
    useEffect(() => {
        api.get('/countries')
            .then(res => {
                setCountryData(res.data)
            })
            
            .catch((err: any ) => {
                console.error('Erro ao buscar países', err.message)
            })
    }, [])

    useEffect(() => {
        api.get(`/quote/100/${encodeURIComponent(selectedCurrency?.value!)}`)
            .then(res => setQuoteRes(res.data))
            .catch(console.error);
    }, [selectedCurrency])

    return( 
        <>
            <h1 className={styles.pageTitle}>Boas Vindas!</h1>
            <h6 className={styles.introText}>
                Abaixo, confira o nosso sistema de cotação automática!
            </h6>

            <section className={styles.quoteContainer}>
                <div className="d-flex gap-2 flex-wrap">
                    <Input 
                        id="quoteValue"
                        label="Digite o orçamento da sua viagem!"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />

                    <Dropdown 
                        id="quoteCountry"                    
                        label="Escolha um dos países cadastrados!"
                        dropdownItems={
                            countryData.map((country) => {
                                return {
                                    label: country.nome,
                                    value: country.moeda,
                                }
                            })
                        }
                        onSelect={(item) => {
                            if (!item) {
                                setSelectedCurrency(null);
                                return;
                            }
                            setSelectedCurrency(item);
                        }}
                    />
                </div>

                <button className={styles.quoteSubmitBtn}>
                    Enviar
                </button>

                {quoteRes && (
                    <section className={styles.quoteResponse}>
                        <p> {`Em ${selectedCurrency?.label}, o orçamento de R$${Number(valor).toFixed(2)} valeria:`} </p>
                        <h3 className={styles.finalValue}>
                            {quoteRes.currency} {quoteRes.quote}
                        </h3>
                    </section>
                )}
            </section>
        </>
    )
}

export default Homepage