import DatabaseView from "./DatabaseView";

function CitiesView() {
    const dataFormat = {
        id: '',
        nome: '',
        populacao: '',
        latitude: '',
        longitude: '',
        id_pais: '',
    }
    const entity = 'cidades';
    const iconClass = 'building-fill';
    const route = '/cities';
    return (
        <DatabaseView
            dataFormat={dataFormat}
            entity={entity}
            iconClass={iconClass}
            route={route}
        />
    )
}

export default CitiesView;