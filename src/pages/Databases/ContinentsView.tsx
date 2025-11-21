import DatabaseView from './DatabaseView.js';

function ContinentsView() {
    const dataFormat = {
        id: '',
        nome: '',
        descricao: '',
    }
    const entity = 'continentes';
    const iconClass = 'globe-americas-fill';
    const route = '/continents';

    return (
        <DatabaseView
            dataFormat={dataFormat}
            entity={entity}
            iconClass={iconClass}
            route={route}
        />
    )
}

export default ContinentsView;