
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
    

/**
 * @typedef {import('./Visitor').BaseVisitor} BaseVisitor
 */

export class expression   {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitexpression (this);
    }
}
    
export class OpeBini extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.izq expression  izquierda de la operacion
 * @param {expression } options.der expression  derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * expression  izquierda de la operacion
         * @type {expression }
        */
        this.izq = izq;


        /**
         * expression  derecha de la operacion
         * @type {expression }
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOpeBini(this);
    }
}
    
export class OpeUnaria extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.exp expression  de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * expression  de la operacion
         * @type {expression }
        */
        this.exp = exp;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOpeUnaria(this);
    }
}
    
export class Agrupacion extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.exp expression  agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * expression  agrupada
         * @type {expression }
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Numero extends expression  {

    /**
    * @param {Object} options
    * @param {number} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}
    
export class DeclaracionVariable extends expression  {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {expression } options.exp expression  de la variable
    */
    constructor({ id, exp }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * expression  de la variable
         * @type {expression }
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class ReferenciaVariable extends expression  {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class Print extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.exp expression  a imprimir
    */
    constructor({ exp }) {
        super();
        
        /**
         * expression  a imprimir
         * @type {expression }
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class ExpresionStmt extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.exp expression  a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * expression  a evaluar
         * @type {expression }
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStmt(this);
    }
}
    
export class Asignacion extends expression  {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {expression } options.asgn expression  a asignar
    */
    constructor({ id, asgn }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * expression  a asignar
         * @type {expression }
        */
        this.asgn = asgn;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacion(this);
    }
}
    
export class Bloque extends expression  {

    /**
    * @param {Object} options
    * @param {expression []} options.dcls Sentencias del bloque
    */
    constructor({ dcls }) {
        super();
        
        /**
         * Sentencias del bloque
         * @type {expression []}
        */
        this.dcls = dcls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class If extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.cond Condicion del if
 * @param {expression } options.stmtTrue Cuerpo del if
 * @param {expression |undefined} options.stmtFalse Cuerpo del else
    */
    constructor({ cond, stmtTrue, stmtFalse }) {
        super();
        
        /**
         * Condicion del if
         * @type {expression }
        */
        this.cond = cond;


        /**
         * Cuerpo del if
         * @type {expression }
        */
        this.stmtTrue = stmtTrue;


        /**
         * Cuerpo del else
         * @type {expression |undefined}
        */
        this.stmtFalse = stmtFalse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.cond Condicion del while
 * @param {expression } options.stmt Cuerpo del while
    */
    constructor({ cond, stmt }) {
        super();
        
        /**
         * Condicion del while
         * @type {expression }
        */
        this.cond = cond;


        /**
         * Cuerpo del while
         * @type {expression }
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export default { expression , OpeBini, OpeUnaria, Agrupacion, Numero, DeclaracionVariable, ReferenciaVariable, Print, ExpresionStmt, Asignacion, Bloque, If, While }
