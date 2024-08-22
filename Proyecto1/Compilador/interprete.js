import { Entorno } from "./entornos.js";
import { BaseVisitor } from "./Visitor.js";

import { DeclaSinArgumen } from "./DeclaSinArgum.js";





export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.consola = '';
    }

    interpretar(nodo) {
        return nodo.accept(this);
    }

    
    /**
      * @type {BaseVisitor['visitOpeBini']}
      */
    visitOpeBini(node) {
        const izq = node.izq.accept(this);
        const der = node.der.accept(this);

        switch (node.op) {
            case '+':
                return izq + der;
            case '-':
                return izq - der;
            case '*':
                return izq * der;
            case '/':
                return izq / der;
            case '<=':
                return izq <= der;
            default:
                throw new Error(`Operador no soportado: ${node.op}`);
        }
    }

    
    /**
      * @type {BaseVisitor['visitOpeUnaria']}
      */
    visitOpeUnaria(node) {
        const exp = node.exp.accept(this);

        switch (node.op) {
            case '-':
                return -exp;

            case '++':
                return exp + 1;
            
            case '--':
                return exp - 1;

            default:
                throw new Error(`Operador no soportado: ${node.op}`);
        }
    }

    /**
      * @type {BaseVisitor['visitAgrupacion']}
      */
    visitAgrupacion(node) {
        return node.exp.accept(this);
    }

    /**
      * @type {BaseVisitor['visitNumero']}
      */
    visitNumero(node) {
        return node.valor;
    }


    /**
     * @type {BaseVisitor['visitDeclaracionVariable']}
     */
    visitDeclaracionVariable(node) {
        const tipoVariable =  node.tipo;
        const nombreVariable = node.id;
        const valorVariable = node.exp.accept(this);

        
        switch (tipoVariable) {
            case "int":
                const datoInt = parseInt(valorVariable, 10);
                if (!Number.isInteger(datoInt)) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo int`);
                }
                if (datoInt.toString() !== valorVariable.toString()) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo int`);
                }
                break;
    
            case "float":
                const valorConvertidoFloat = parseFloat(valorVariable);
                if (isNaN(valorConvertidoFloat)) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo float`);
                }
                // Verifica que el valor convertido sea numérico y mantenga la precisión
                if (valorConvertidoFloat.toString() !== valorVariable.toString()) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo float`);
                }
                break;
    
            case "string":
                if (typeof valorVariable !== 'string') {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo string`);
                }
                break;
    
            case "char":
                if (typeof valorVariable !== 'string' || valorVariable.length !== 1) {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo char`);
                }
                break;
    
            case "bool":
                if (typeof valorVariable !== 'boolean') {
                    throw new Error(`El valor asignado a la variable ${nombreVariable} no es de tipo boolean`);
                }
                break;
        }



        this.entornoActual.setVariable(nombreVariable, valorVariable);
    }

/**
      * @type {BaseVisitor['visitDeclaracionSinAargumn']}
      */
    visitDeclaracionSinAargumn(node){
        const tipoVariable = node.tipo;
        const nombreVariable = node.id;
    
        // Llama a la función DeclaSinArgumen para obtener el tipo y valor
        const { valor } = DeclaSinArgumen(tipoVariable, nombreVariable);
    
        // Asigna el valor por defecto en el entorno actual
        this.entornoActual.setVariable(nombreVariable, valor);

    }
    


    /**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id;
        return this.entornoActual.getVariable(nombreVariable);
    }


    /**
      * @type {BaseVisitor['visitPrint']}
      */
    visitPrint(node) {
        const valor = node.exp.accept(this);
        this.consola += valor + '\n';
    }


    /**
      * @type {BaseVisitor['visitExpresionStmt']}
      */
    visitExpresionStmt(node) {
        node.exp.accept(this);
    }

    /**
     * @type {BaseVisitor['visitAsignacion']}
     */
    visitAsignacion(node) {
        // const valor = this.interpretar(node.asgn);
        const valor = node.asgn.accept(this);
        this.entornoActual.assignVariable(node.id, valor);

        return valor;
    }

    /**
     * @type {BaseVisitor['visitBloque']}
     */
    visitBloque(node) {
        const entornoAnterior = this.entornoActual;
        this.entornoActual = new Entorno(entornoAnterior);

        node.dcls.forEach(dcl => dcl.accept(this));

        this.entornoActual = entornoAnterior;
    }

    /**
     * @type {BaseVisitor['visitIf']}
     */
    visitIf(node) {
        const cond = node.cond.accept(this);

        if (cond) {
            node.stmtTrue.accept(this);
            return;
        }

        if (node.stmtFalse) {
            node.stmtFalse.accept(this);
        }

    }

    /**
     * @type {BaseVisitor['visitWhile']}
     */
    visitWhile(node) {
        while (node.cond.accept(this)) {
            node.stmt.accept(this);
        }
    }

    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node){
        const entornoAnterior = this.entornoActual;
        this.entornoActual = new Entorno(entornoAnterior);

        //inicio 

        node.inicializacion.accept(this)


        while (node.condicion.accept(this)) {
            node.stmt.accept(this);

            node.incremento.accept(this)
        }
        

        this.entornoActual = entornoAnterior;

    }

    /**
     * @type {BaseVisitor['visitBoolF']}
     */
    visitBoolF(node){
        return node.valor
    }

        /**
     * @type {BaseVisitor['visitBoolT']}
     */
    visitBoolT(node){
        return node.valor
    }

            /**
     * @type {BaseVisitor['visitCadenaString']}
     */

    visitCadenaString(node){
        return node.valor
    }

    
            /**
     * @type {BaseVisitor['visitCaracter']}
     */


    visitCaracter(node){
        return node.valor

    }

    
}