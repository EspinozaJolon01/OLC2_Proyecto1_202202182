
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


 * @typedef {import('./nodos').Case} Case


 * @typedef {import('./nodos').Ternario} Ternario


 * @typedef {import('./nodos').ArregloValores} ArregloValores


 * @typedef {import('./nodos').ArregloCantidad} ArregloCantidad


 * @typedef {import('./nodos').ArregloCopia} ArregloCopia


 * @typedef {import('./nodos').AccesoElem} AccesoElem


 * @typedef {import('./nodos').AccElem} AccElem


 * @typedef {import('./nodos').AsigVector} AsigVector


 * @typedef {import('./nodos').Matrices} Matrices


 * @typedef {import('./nodos').MatrizCantidad} MatrizCantidad


 * @typedef {import('./nodos').Break} Break


 * @typedef {import('./nodos').Continue} Continue


 * @typedef {import('./nodos').Return} Return


 * @typedef {import('./nodos').ForEach} ForEach


 * @typedef {import('./nodos').FunLlamada} FunLlamada


 * @typedef {import('./nodos').DeclaracionFuncion} DeclaracionFuncion


 * @typedef {import('./nodos').Estructura} Estructura


 * @typedef {import('./nodos').ContenidoStruct} ContenidoStruct


 * @typedef {import('./nodos').InstStuc} InstStuc


 * @typedef {import('./nodos').Get} Get


 * @typedef {import('./nodos').Set} Set


 * @typedef {import('./nodos').FunStruct} FunStruct

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
     * @param {Case} node
     * @returns {any}
     */
    visitCase(node) {
        throw new Error('Metodo visitCase no implementado');
    }
    

    /**
     * @param {Ternario} node
     * @returns {any}
     */
    visitTernario(node) {
        throw new Error('Metodo visitTernario no implementado');
    }
    

    /**
     * @param {ArregloValores} node
     * @returns {any}
     */
    visitArregloValores(node) {
        throw new Error('Metodo visitArregloValores no implementado');
    }
    

    /**
     * @param {ArregloCantidad} node
     * @returns {any}
     */
    visitArregloCantidad(node) {
        throw new Error('Metodo visitArregloCantidad no implementado');
    }
    

    /**
     * @param {ArregloCopia} node
     * @returns {any}
     */
    visitArregloCopia(node) {
        throw new Error('Metodo visitArregloCopia no implementado');
    }
    

    /**
     * @param {AccesoElem} node
     * @returns {any}
     */
    visitAccesoElem(node) {
        throw new Error('Metodo visitAccesoElem no implementado');
    }
    

    /**
     * @param {AccElem} node
     * @returns {any}
     */
    visitAccElem(node) {
        throw new Error('Metodo visitAccElem no implementado');
    }
    

    /**
     * @param {AsigVector} node
     * @returns {any}
     */
    visitAsigVector(node) {
        throw new Error('Metodo visitAsigVector no implementado');
    }
    

    /**
     * @param {Matrices} node
     * @returns {any}
     */
    visitMatrices(node) {
        throw new Error('Metodo visitMatrices no implementado');
    }
    

    /**
     * @param {MatrizCantidad} node
     * @returns {any}
     */
    visitMatrizCantidad(node) {
        throw new Error('Metodo visitMatrizCantidad no implementado');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    

    /**
     * @param {ForEach} node
     * @returns {any}
     */
    visitForEach(node) {
        throw new Error('Metodo visitForEach no implementado');
    }
    

    /**
     * @param {FunLlamada} node
     * @returns {any}
     */
    visitFunLlamada(node) {
        throw new Error('Metodo visitFunLlamada no implementado');
    }
    

    /**
     * @param {DeclaracionFuncion} node
     * @returns {any}
     */
    visitDeclaracionFuncion(node) {
        throw new Error('Metodo visitDeclaracionFuncion no implementado');
    }
    

    /**
     * @param {Estructura} node
     * @returns {any}
     */
    visitEstructura(node) {
        throw new Error('Metodo visitEstructura no implementado');
    }
    

    /**
     * @param {ContenidoStruct} node
     * @returns {any}
     */
    visitContenidoStruct(node) {
        throw new Error('Metodo visitContenidoStruct no implementado');
    }
    

    /**
     * @param {InstStuc} node
     * @returns {any}
     */
    visitInstStuc(node) {
        throw new Error('Metodo visitInstStuc no implementado');
    }
    

    /**
     * @param {Get} node
     * @returns {any}
     */
    visitGet(node) {
        throw new Error('Metodo visitGet no implementado');
    }
    

    /**
     * @param {Set} node
     * @returns {any}
     */
    visitSet(node) {
        throw new Error('Metodo visitSet no implementado');
    }
    

    /**
     * @param {FunStruct} node
     * @returns {any}
     */
    visitFunStruct(node) {
        throw new Error('Metodo visitFunStruct no implementado');
    }
    
}
