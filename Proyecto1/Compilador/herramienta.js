


// import fs from 'fs';
const fs = require('fs')

const types = [
    `
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    `
]

const configuracionNodos = [
    // Configuracion del nodo inicial
    {
        name: 'expression ',
        base: true,
        props: [
            {
                name: 'location',
                type: 'Location|null',
                description: 'Ubicacion del nodo en el codigo fuente',
                default: 'null'
            }
        ]
    },
    // Configuracion de los nodos secundarios
    {
        name: 'OpeBini',
        extends: 'expression ',
        props: [
            {
                name: 'izq',
                type: 'expression ',
                description: 'expression  izquierda de la operacion'
            },
            {
                name: 'der',
                type: 'expression ',
                description: 'expression  derecha de la operacion'
            },
            {
                name: 'op',
                type: 'string',
                description: 'Operador de la operacion'
            }
        ]
    },
    {
        name: 'OpeUnaria',
        extends: 'expression ',
        props: [
            {
                name: 'exp',
                type: 'expression ',
                description: 'expression  de la operacion'
            },
            {
                name: 'op',
                type: 'string',
                description: 'Operador de la operacion'
            }
        ]
    },
    {
        name: 'Agrupacion',
        extends: 'expression ',
        props: [
            {
                name: 'exp',
                type: 'expression ',
                description: 'expression  agrupada'
            }
        ]
    },
    {
        name: 'Numero',
        extends: 'expression ',
        props: [
            {
                name: 'valor',
                type: 'number',
                description: 'Valor del numero'
            }
        ]
    },
    //     DeclaracionVariable
    {
        name: 'DeclaracionVariable',
        extends: 'expression ',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la variable'
            },
            {
                name: 'exp',
                type: 'expression ',
                description: 'expression  de la variable'
            }
        ]
    },
    // ReferenciaVariable
    {
        name: 'ReferenciaVariable',
        extends: 'expression ',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la variable'
            }
        ]
    },
    // Print
    {
        name: 'Print',
        extends: 'expression ',
        props: [
            {
                name: 'exp',
                type: 'expression ',
                description: 'expression  a imprimir'
            }
        ]
    },
    // ExpresionStmt 1+2;
    {
        name: 'ExpresionStmt',
        extends: 'expression ',
        props: [
            {
                name: 'exp',
                type: 'expression ',
                description: 'expression  a evaluar'
            }
        ]
    },
    // Asignacion
    {
        name: 'Asignacion',
        extends: 'expression ',
        props: [
            {
                name: 'id',
                type: 'string',
                description: 'Identificador de la variable'
            },
            {
                name: 'asgn',
                type: 'expression ',
                description: 'expression  a asignar'
            }
        ]
    },
    // Bloque
    {
        name: 'Bloque',
        extends: 'expression ',
        props: [
            {
                name: 'dcls',
                type: 'expression []',
                description: 'Sentencias del bloque'
            }
        ]
    },
    {
        name: 'If',
        extends: 'expression ',
        props: [
            {
                name: 'cond',
                type: 'expression ',
                description: 'Condicion del if'
            },
            {
                name: 'stmtTrue',
                type: 'expression ',
                description: 'Cuerpo del if'
            },
            {
                name: 'stmtFalse',
                type: 'expression |undefined',
                description: 'Cuerpo del else'
            }
        ]
    },
    // While
    {
        name: 'While',
        extends: 'expression ',
        props: [
            {
                name: 'cond',
                type: 'expression ',
                description: 'Condicion del while'
            },
            {
                name: 'stmt',
                type: 'expression ',
                description: 'Cuerpo del while'
            }
        ]
    }
]

let code = ''

// Tipos base
types.forEach(type => {
    code += type + '\n'
})


// // Tipos de nodos
// configuracionNodos.forEach(nodo => {
//     code += `
// /**
//  * @typedef {Object} ${nodo.name}
//  * ${nodo.props.map(prop => `@property {${prop.type}} ${prop.name} ${prop.description}`).join('\n * ')}
// */
//     `
// })

// Tipos del visitor
code += `
/**
 * @typedef {import('./Visitor').BaseVisitor} BaseVisitor
 */
`

const baseClass = configuracionNodos.find(nodo => nodo.base)

configuracionNodos.forEach(nodo => {


    code += `
export class ${nodo.name} ${baseClass && nodo.extends ? `extends ${nodo.extends}` : ''} {

    /**
    * @param {Object} options
    * ${nodo.props.map(prop => `@param {${prop.type}} options.${prop.name} ${prop.description}`).join('\n * ')}
    */
    constructor(${!nodo.base && `{ ${nodo.props.map(prop => `${prop.name}`).join(', ')} }` || ''}) {
        ${baseClass && nodo.extends ? `super();` : ''}
        ${nodo.props.map(prop => `
        /**
         * ${prop.description}
         * @type {${prop.type}}
        */
        this.${prop.name} = ${prop.default || `${prop.name}`};
`).join('\n')}
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visit${nodo.name}(this);
    }
}
    `
})

code += `
export default { ${configuracionNodos.map(nodo => nodo.name).join(', ')} }
`


fs.writeFileSync('./nodos.js', code)
console.log('Archivo de clases de nodo generado correctamente')


// Visitor
// @typedef {import('./nodos').expression } expression 
code = `
/**
${configuracionNodos.map(nodo => `
 * @typedef {import('./nodos').${nodo.name}} ${nodo.name}
`).join('\n')}
 */
`

code += `

/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    ${configuracionNodos.map(nodo => `
    /**
     * @param {${nodo.name}} node
     * @returns {any}
     */
    visit${nodo.name}(node) {
        throw new Error('Metodo visit${nodo.name} no implementado');
    }
    `).join('\n')
    }
}
`

fs.writeFileSync('./Visitor.js', code)
console.log('Archivo de visitor generado correctamente')