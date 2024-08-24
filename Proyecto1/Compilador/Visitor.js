
/**

 * @typedef {import('./nodos').expression } expression 


 * @typedef {import('./nodos').OpeBini} OpeBini


 * @typedef {import('./nodos').OpeUnaria} OpeUnaria


 * @typedef {import('./nodos').Agrupacion} Agrupacion


 * @typedef {import('./nodos').Numero} Numero


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').DeclaracionSinAargumn} DeclaracionSinAargumn


 * @typedef {import('./nodos').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./nodos').Print} Print


 * @typedef {import('./nodos').ExpresionStmt} ExpresionStmt


 * @typedef {import('./nodos').Asignacion} Asignacion


 * @typedef {import('./nodos').Bloque} Bloque


 * @typedef {import('./nodos').If} If


 * @typedef {import('./nodos').While} While


 * @typedef {import('./nodos').For} For


 * @typedef {import('./nodos').Boolena} Boolena


 * @typedef {import('./nodos').CadenaString} CadenaString


 * @typedef {import('./nodos').Caracter} Caracter


 * @typedef {import('./nodos').Embebidas} Embebidas


 * @typedef {import('./nodos').Switch} Switch


 * @typedef {import('./nodos').Ternario} Ternario

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {expression } node
     * @returns {any}
     */
    visitexpression (node) {
        throw new Error('Metodo visitexpression  no implementado');
    }
    

    /**
     * @param {OpeBini} node
     * @returns {any}
     */
    visitOpeBini(node) {
        throw new Error('Metodo visitOpeBini no implementado');
    }
    

    /**
     * @param {OpeUnaria} node
     * @returns {any}
     */
    visitOpeUnaria(node) {
        throw new Error('Metodo visitOpeUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {DeclaracionSinAargumn} node
     * @returns {any}
     */
    visitDeclaracionSinAargumn(node) {
        throw new Error('Metodo visitDeclaracionSinAargumn no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    

    /**
     * @param {Boolena} node
     * @returns {any}
     */
    visitBoolena(node) {
        throw new Error('Metodo visitBoolena no implementado');
    }
    

    /**
     * @param {CadenaString} node
     * @returns {any}
     */
    visitCadenaString(node) {
        throw new Error('Metodo visitCadenaString no implementado');
    }
    

    /**
     * @param {Caracter} node
     * @returns {any}
     */
    visitCaracter(node) {
        throw new Error('Metodo visitCaracter no implementado');
    }
    

    /**
     * @param {Embebidas} node
     * @returns {any}
     */
    visitEmbebidas(node) {
        throw new Error('Metodo visitEmbebidas no implementado');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Metodo visitSwitch no implementado');
    }
    

    /**
     * @param {Ternario} node
     * @returns {any}
     */
    visitTernario(node) {
        throw new Error('Metodo visitTernario no implementado');
    }
    
}
