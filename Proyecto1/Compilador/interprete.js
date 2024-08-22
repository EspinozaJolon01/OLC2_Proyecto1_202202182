import { Entorno } from "./entornos.js";
import { BaseVisitor } from "./Visitor.js";


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


        let valorValidado;
        switch (tipoVariable) {
            case 'int':
                if (typeof valorVariable !== 'number' || !Number.isInteger(valorVariable)) {
                    throw new Error(`Error: Se esperaba un valor entero para la variable ${nombreVariable}`);
                }
                valorValidado = valorVariable;
                break;
            case  'float':
                if(typeof valorVariable !== 'number'){
                    throw new Error(`Error: Se esperaba un valor flotante para la variable ${nombreVariable}`);
                }
                valorValidado = valorVariable;
                break;

            case 'boolean':
                
                if (typeof valorVariable !== 'boolean') {
                    throw new Error(`Error: Se esperaba un valor booleano para la variable ${nombreVariable}`);
                }
                valorValidado = valorVariable; 
                break;

            case 'var':
                
                valorValidado = valorVariable;
                break;

            case 'char':
                if (typeof valorVariable !== 'string' || valorVariable.length !== 1) {
                    throw new Error(`Error: Se esperaba un valor 'char', pero se recibió: ${valor}`);
                }
                valorValidado = valorVariable;  
                break;

            case 'string':
                if (typeof valorVariable !== 'string') {
                    throw new Error(`Error: Se esperaba un valor 'string', pero se recibió: ${valorVariable}`);
                }
                valorValidado = valorVariable;
                break;

        
            default:
                throw new Error(`Error: Tipo desconocido ${tipoVariable} para la variable ${nombreVariable}`);;
        }




        this.entornoActual.setVariable(nombreVariable, valorValidado);
    }

/**
      * @type {BaseVisitor['visitDeclaracionSinAargumn']}
      */
    visitDeclaracionSinAargumn(node){
        const tipoVariable =  node.tipo;
        const nombreVariable = node.id;
        //const valorVariable = node.exp.accept(this);

        let valorValidado;
        switch (tipoVariable) {
            case 'int':
                
                valorValidado = 0;
                break;
            case  'float':
                valorValidado = 0.0;
                break;

            case 'boolean':
                valorValidado = true; 
                break;

            case 'var':

                valorValidado = null;
                break;

            case 'char':

                valorValidado = '\0';  
                break;
            case 'string':
                valorValidado = "";

        
            default:
                throw new Error(`Error: Tipo desconocido ${tipoVariable} para la variable ${nombreVariable}`);;
        }

        this.entornoActual.setVariable(nombreVariable, valorValidado);


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
}