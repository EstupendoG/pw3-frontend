import DatabaseView from "./DatabaseView";

function CountriesView() {
    const dataFormat = {
        id: '',
        nome: '',
        populacao: '',
        idioma: '',
        moeda: '',
        id_continente: '',
    }
    const entity = 'país';
    const iconClass = 'flag-fill';
    const route = '/countries';

    return (
        <DatabaseView
            dataFormat={dataFormat}
            entity={entity}
            iconClass={iconClass}
            route={route}
        />
    )
}

export default CountriesView;