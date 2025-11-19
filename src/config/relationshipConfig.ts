/**
 * Configuração de relacionamentos entre entidades
 * Define qual chave estrangeira (Foreign Key) cada entidade possui
 * e de qual rota fazer o fetch dos dados relacionados
 */

export interface RelationshipConfig {
    [entity: string]: {
        [foreignKeyField: string]: {
            route: string;
            label: string; // Campo que será exibido no dropdown (ex: 'nome')
        };
    };
}

export const relationshipConfig: RelationshipConfig = {
    countries: {
        id_continente: {
            route: '/continents',
            label: 'nome',
        },
    },
    cities: {
        id_pais: {
            route: '/countries',
            label: 'nome',
        },
    },
    continents: {
        // Continentes não possuem Foreign Keys
    },
};

/**
 * Obtém as Foreign Keys de uma entidade
 * @param entity - Nome da entidade (ex: 'countries', 'cities')
 * @returns Array com os nomes das foreign keys
 */
export function getForeignKeys(entity: string): string[] {
    return Object.keys(relationshipConfig[entity] || {});
}

/**
 * Obtém a configuração de uma Foreign Key específica
 * @param entity - Nome da entidade
 * @param foreignKeyField - Nome do campo FK
 * @returns Configuração da FK ou null se não existir
 */
export function getForeignKeyConfig(
    entity: string,
    foreignKeyField: string
) {
    return relationshipConfig[entity]?.[foreignKeyField] || null;
}
