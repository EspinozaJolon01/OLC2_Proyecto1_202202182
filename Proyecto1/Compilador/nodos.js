
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
 * @param {string} options.tipo Valor del numero
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;


        /**
         * Valor del numero
         * @type {string}
        */
        this.tipo = tipo;

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
    * @param {string} options.tipo Identificador de la variable
 * @param {string} options.id Identificador de la variable
 * @param {expression } options.exp expression  de la variable
    */
    constructor({ tipo, id, exp }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.tipo = tipo;


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
    
export class DeclaracionSinAargumn extends expression  {

    /**
    * @param {Object} options
    * @param {string} options.tipo Identificador de la variable
 * @param {string} options.id Identificador de la variable
    */
    constructor({ tipo, id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.tipo = tipo;


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
        return visitor.visitDeclaracionSinAargumn(this);
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
 * @param {expression[] } options.expM expression  a imprimir
    */
    constructor({ exp, expM }) {
        super();
        
        /**
         * expression  a imprimir
         * @type {expression }
        */
        this.exp = exp;


        /**
         * expression  a imprimir
         * @type {expression[] }
        */
        this.expM = expM;

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
    
export class For extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.inicializacion iniciar el for
 * @param {expression } options.condicion la condicion que tiene el for
 * @param {expression } options.incremento el incremento del for
 * @param {expression } options.stmt Cuerpo del for
    */
    constructor({ inicializacion, condicion, incremento, stmt }) {
        super();
        
        /**
         * iniciar el for
         * @type {expression }
        */
        this.inicializacion = inicializacion;


        /**
         * la condicion que tiene el for
         * @type {expression }
        */
        this.condicion = condicion;


        /**
         * el incremento del for
         * @type {expression }
        */
        this.incremento = incremento;


        /**
         * Cuerpo del for
         * @type {expression }
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class Boolena extends expression  {

    /**
    * @param {Object} options
    * @param {booleana } options.valor expression  bool de true
 * @param {string } options.tipo expression  de tipo bool
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * expression  bool de true
         * @type {booleana }
        */
        this.valor = valor;


        /**
         * expression  de tipo bool
         * @type {string }
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBoolena(this);
    }
}
    
export class CadenaString extends expression  {

    /**
    * @param {Object} options
    * @param {string } options.valor expression  de cadena de un strign
 * @param {string } options.tipo expression  verificar el tipo
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * expression  de cadena de un strign
         * @type {string }
        */
        this.valor = valor;


        /**
         * expression  verificar el tipo
         * @type {string }
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCadenaString(this);
    }
}
    
export class Caracter extends expression  {

    /**
    * @param {Object} options
    * @param {string } options.valor expression  de cadena de un caracter
 * @param {string } options.tipo expression  de cadena de un caracter
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * expression  de cadena de un caracter
         * @type {string }
        */
        this.valor = valor;


        /**
         * expression  de cadena de un caracter
         * @type {string }
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCaracter(this);
    }
}
    
export class Embebidas extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.exp Esta función retorna el tipo de dato asociado
 * @param {string } options.Embe Esta función retorna el tipo de dato asociado
    */
    constructor({ exp, Embe }) {
        super();
        
        /**
         * Esta función retorna el tipo de dato asociado
         * @type {expression }
        */
        this.exp = exp;


        /**
         * Esta función retorna el tipo de dato asociado
         * @type {string }
        */
        this.Embe = Embe;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitEmbebidas(this);
    }
}
    
export class Switch extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.exp la expresion del while - case
 * @param {expression[] } options.cas cuepor del case
 * @param {expression[] |undefined  } options.def expresion defesault opcional
    */
    constructor({ exp, cas, def }) {
        super();
        
        /**
         * la expresion del while - case
         * @type {expression }
        */
        this.exp = exp;


        /**
         * cuepor del case
         * @type {expression[] }
        */
        this.cas = cas;


        /**
         * expresion defesault opcional
         * @type {expression[] |undefined  }
        */
        this.def = def;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}
    
export class Case extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.exp la expresion del while - case
 * @param {expression[] } options.commands cuepor del case
 * @param {boolean} options.breakST expresion defesault opcional
    */
    constructor({ exp, commands, breakST }) {
        super();
        
        /**
         * la expresion del while - case
         * @type {expression }
        */
        this.exp = exp;


        /**
         * cuepor del case
         * @type {expression[] }
        */
        this.commands = commands;


        /**
         * expresion defesault opcional
         * @type {boolean}
        */
        this.breakST = breakST;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCase(this);
    }
}
    
export class Ternario extends expression  {

    /**
    * @param {Object} options
    * @param {expression } options.validar la condicion 
 * @param {expression } options.cond1 cuepor del case
 * @param {expression} options.cond2 expresion defesault opcional
    */
    constructor({ validar, cond1, cond2 }) {
        super();
        
        /**
         * la condicion 
         * @type {expression }
        */
        this.validar = validar;


        /**
         * cuepor del case
         * @type {expression }
        */
        this.cond1 = cond1;


        /**
         * expresion defesault opcional
         * @type {expression}
        */
        this.cond2 = cond2;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernario(this);
    }
}
    
export class ArregloValores extends expression  {

    /**
    * @param {Object} options
    * @param {any } options.tipo tipo del arreglo 
 * @param {expression } options.id nombre del arreglo
 * @param {expression} options.ArreTi lista del arreglo
    */
    constructor({ tipo, id, ArreTi }) {
        super();
        
        /**
         * tipo del arreglo 
         * @type {any }
        */
        this.tipo = tipo;


        /**
         * nombre del arreglo
         * @type {expression }
        */
        this.id = id;


        /**
         * lista del arreglo
         * @type {expression}
        */
        this.ArreTi = ArreTi;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArregloValores(this);
    }
}
    
export class ArregloCantidad extends expression {

    /**
    * @param {Object} options
    * @param {any} options.tipo tipo del arreglo
 * @param {expression} options.id nombre del arreglo
 * @param {any} options.tipo2 segundo tipo del arreglo
 * @param {string[]} options.nd dimensiones del arreglo
 * @param {expression[]} options.dimensiones dimensiones del arreglo
    */
    constructor({ tipo, id, tipo2, nd, dimensiones }) {
        super();
        
        /**
         * tipo del arreglo
         * @type {any}
        */
        this.tipo = tipo;


        /**
         * nombre del arreglo
         * @type {expression}
        */
        this.id = id;


        /**
         * segundo tipo del arreglo
         * @type {any}
        */
        this.tipo2 = tipo2;


        /**
         * dimensiones del arreglo
         * @type {string[]}
        */
        this.nd = nd;


        /**
         * dimensiones del arreglo
         * @type {expression[]}
        */
        this.dimensiones = dimensiones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArregloCantidad(this);
    }
}
    
export class ArregloCopia extends expression  {

    /**
    * @param {Object} options
    * @param {any} options.tipo tipo del arreglo 
 * @param {expression } options.id nombre del arreglo
 * @param {expression } options.exp arreglo a buscar
    */
    constructor({ tipo, id, exp }) {
        super();
        
        /**
         * tipo del arreglo 
         * @type {any}
        */
        this.tipo = tipo;


        /**
         * nombre del arreglo
         * @type {expression }
        */
        this.id = id;


        /**
         * arreglo a buscar
         * @type {expression }
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitArregloCopia(this);
    }
}
    
export class AccesoElem extends expression  {

    /**
    * @param {Object} options
    * @param {any} options.dat arreglo a buscar
 * @param {string } options.op tipo de acceso al arreglo
 * @param {any |undefined} options.bus dato a encontrar
    */
    constructor({ dat, op, bus }) {
        super();
        
        /**
         * arreglo a buscar
         * @type {any}
        */
        this.dat = dat;


        /**
         * tipo de acceso al arreglo
         * @type {string }
        */
        this.op = op;


        /**
         * dato a encontrar
         * @type {any |undefined}
        */
        this.bus = bus;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoElem(this);
    }
}
    
export class AccElem extends expression {

    /**
    * @param {Object} options
    * @param {expression} options.id identificador del arreglo a acceder
 * @param {array} options.dimensiones array de pares [Expresion] para cada dimensión del arreglo
    */
    constructor({ id, dimensiones }) {
        super();
        
        /**
         * identificador del arreglo a acceder
         * @type {expression}
        */
        this.id = id;


        /**
         * array de pares [Expresion] para cada dimensión del arreglo
         * @type {array}
        */
        this.dimensiones = dimensiones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccElem(this);
    }
}
    
export class AsigVector extends expression {

    /**
    * @param {Object} options
    * @param {expression} options.id identificador del arreglo
 * @param {array} options.indices array de pares [Expresion] para cada dimensión del arreglo
 * @param {expression} options.dato valor a asignar
    */
    constructor({ id, indices, dato }) {
        super();
        
        /**
         * identificador del arreglo
         * @type {expression}
        */
        this.id = id;


        /**
         * array de pares [Expresion] para cada dimensión del arreglo
         * @type {array}
        */
        this.indices = indices;


        /**
         * valor a asignar
         * @type {expression}
        */
        this.dato = dato;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsigVector(this);
    }
}
    
export class Matrices extends expression {

    /**
    * @param {Object} options
    * @param {any} options.tipo Tipo de los elementos en la matriz
 * @param {expression} options.id Identificador de la matriz
 * @param {expression} options.valores Lista que representa la estructura multidimensional de la matriz
 * @param {string[]} options.nD Lista que representa la estructura multidimensional de la matriz
    */
    constructor({ tipo, id, valores, nD }) {
        super();
        
        /**
         * Tipo de los elementos en la matriz
         * @type {any}
        */
        this.tipo = tipo;


        /**
         * Identificador de la matriz
         * @type {expression}
        */
        this.id = id;


        /**
         * Lista que representa la estructura multidimensional de la matriz
         * @type {expression}
        */
        this.valores = valores;


        /**
         * Lista que representa la estructura multidimensional de la matriz
         * @type {string[]}
        */
        this.nD = nD;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitMatrices(this);
    }
}
    
export class MatrizCantidad extends expression  {

    /**
    * @param {Object} options
    * @param {any } options.tipo tipo del arreglo 
 * @param {expression } options.id nombre del arreglo
 * @param {any} options.tipo2 segundo tipo del arreglo
 * @param {expression} options.dim1 segundo tipo del arreglo
 * @param {expression} options.dim2 segundo tipo del arreglo
 * @param {string[]} options.nD segundo tipo del arreglo
    */
    constructor({ tipo, id, tipo2, dim1, dim2, nD }) {
        super();
        
        /**
         * tipo del arreglo 
         * @type {any }
        */
        this.tipo = tipo;


        /**
         * nombre del arreglo
         * @type {expression }
        */
        this.id = id;


        /**
         * segundo tipo del arreglo
         * @type {any}
        */
        this.tipo2 = tipo2;


        /**
         * segundo tipo del arreglo
         * @type {expression}
        */
        this.dim1 = dim1;


        /**
         * segundo tipo del arreglo
         * @type {expression}
        */
        this.dim2 = dim2;


        /**
         * segundo tipo del arreglo
         * @type {string[]}
        */
        this.nD = nD;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitMatrizCantidad(this);
    }
}
    
export class Break extends expression {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends expression {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends expression {

    /**
    * @param {Object} options
    * @param {expression|undefined} options.exp expression a retornar
    */
    constructor({ exp }) {
        super();
        
        /**
         * expression a retornar
         * @type {expression|undefined}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class ForEach extends expression {

    /**
    * @param {Object} options
    * @param {string} options.tipo Identificador de la funcion
 * @param {expression} options.id delcaracion del foreach
 * @param {expression} options.id2 Cuerpo de la funcion
 * @param {expression} options.stmt Cuerpo de la funcion
    */
    constructor({ tipo, id, id2, stmt }) {
        super();
        
        /**
         * Identificador de la funcion
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * delcaracion del foreach
         * @type {expression}
        */
        this.id = id;


        /**
         * Cuerpo de la funcion
         * @type {expression}
        */
        this.id2 = id2;


        /**
         * Cuerpo de la funcion
         * @type {expression}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitForEach(this);
    }
}
    
export default { expression , OpeBini, OpeUnaria, Agrupacion, Numero, DeclaracionVariable, DeclaracionSinAargumn, ReferenciaVariable, Print, ExpresionStmt, Asignacion, Bloque, If, While, For, Boolena, CadenaString, Caracter, Embebidas, Switch, Case, Ternario, ArregloValores, ArregloCantidad, ArregloCopia, AccesoElem, AccElem, AsigVector, Matrices, MatrizCantidad, Break, Continue, Return, ForEach }
