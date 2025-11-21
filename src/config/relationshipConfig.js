/**
 * Configuração de relacionamentos entre entidades
 * Define qual chave estrangeira (Foreign Key) cada entidade possui
 * e de qual rota fazer o fetch dos dados relacionados
 */

export const relationshipConfig = {
    país: {
        id_continente: {
            route: '/continents',
            label: 'nome',
        },
    },
    cidades: {
        id_pais: {
            route: '/countries',
            label: 'nome',
        },
    },
    continentes: {
        // Continentes não possuem Foreign Keys
    },
};

/**
 * Obtém as Foreign Keys de uma entidade
 * @param {string} entity - Nome da entidade (ex: 'countries', 'cities')
 * @returns {string[]} Array com os nomes das foreign keys
 */
export function getForeignKeys(entity) {
    return Object.keys(relationshipConfig[entity] || {});
}

/**
 * Obtém a configuração de uma Foreign Key específica
 * @param {string} entity - Nome da entidade
 * @param {string} foreignKeyField - Nome do campo FK
 * @returns {object|null} Configuração da FK ou null se não existir
 */
export function getForeignKeyConfig(entity, foreignKeyField) {
    return relationshipConfig[entity]?.[foreignKeyField] || null;
}
