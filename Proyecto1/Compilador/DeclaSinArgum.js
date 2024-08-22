export function DeclaSinArgumen(tipo, id) {
    /**
     * Devuelve el valor por defecto según el tipo de la variable.
     * @param {string} tipo
     * @returns {any} Valor por defecto según el tipo.
     */
    function obtenerValorPorDefecto(tipo) {
        switch (tipo) {
            case 'int':
                return 0;
            case 'float':
                return 0.0;
            case 'bool':
                return false;
            case 'var':
                throw new Error(`Error: La variable "${id}" de tipo "var" debe ser inicializada con un valor.`);          
            case 'char':
                return '\0';
            case 'string':
                return "";
            default:
                throw new Error(`Error: Tipo desconocido ${tipo} para la variable ${id}`);
        }
    }

    /**
     * Determina el tipo de la variable según su valor.
     * @param {any} valor
     * @returns {string} Tipo de la variable.
     */
    function definirTipoVar(valor) {
        if (typeof valor === 'number') {
            return Number.isInteger(valor) ? 'int' : 'float';
        } else if (typeof valor === 'string') {
            return valor.length === 1 ? 'char' : 'string';
        } else if (typeof valor === 'boolean') {
            return 'bool';
        } else {
            throw new Error(`No se puede determinar el tipo de la variable "${id}".`);
        }
    }

    // Obtener el valor por defecto basado en el tipo
    const valor = obtenerValorPorDefecto(tipo);

    // Retornar el tipo y el valor, que luego serán usados para la asignación en el entorno
    return { tipo, id, valor };
}
