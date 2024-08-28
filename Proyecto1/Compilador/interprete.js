import { Entorno } from "./entornos.js";
import { BaseVisitor } from "./Visitor.js";
import nodos, { expression } from './nodos.js'

import { DatoSinArgu , DatoSinArguemntoArreglo } from "./DeclaSinArgum.js";
import {BreakException, ContinueException, ReturnException} from "./TransferCommands.js"




export class InterpreterVisitor extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.consola = '';


        /**
         * @type {expression | null}
        */
        this.continueProcessing = null;
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

                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':

                            return {valor:izq.valor + der.valor , tipo: "int"};
                        case 'float':
                            return {valor:izq.valor + der.valor , tipo: "float"};
                        
                        default:
                            throw new Error('No es valida esa operacion');

                    }
                }

                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'flot':
                            return {valor:izq.valor + der.valor , tipo: "float"};
                        case 'int':
                            return {valor:izq.valor + der.valor , tipo: "float"};
                            
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
                if(izq.tipo == "string"){
                    switch (der.tipo){
                        case 'string':
                            return {valor:izq.valor + der.valor , tipo: "string"};
                    
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

            case '-':
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':

                            return {valor:izq.valor - der.valor , tipo: "int"};
                        case 'float':
                            return {valor:izq.valor - der.valor , tipo: "float"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor - der.valor , tipo: "float"};
                        case 'int':
                            return {valor:izq.valor - der.valor , tipo: "float"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '*':
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor * der.valor , tipo: "int"};
                        case 'float':
                            return {valor:izq.valor * der.valor , tipo: "float"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor * der.valor , tipo: "float"};
                        case 'int':
                            return {valor:izq.valor * der.valor , tipo: "float"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '/':
                if(der != 0){
                    if(izq.tipo == "int"){
                        switch (der.tipo){
                            case 'int':
                                return {valor:izq.valor / der.valor , tipo: "int"};
                            case 'float':
                                return {valor:izq.valor / der.valor , tipo: "float"};
                            
                            default:
                                throw new Error('No es valida esa operacion');
                        }
                    }

                    if(izq.tipo == "float"){
                        switch (der.tipo){
                            case 'float':
                                return {valor:izq.valor / der.valor , tipo: "float"};
                            case 'int':
                                return {valor:izq.valor / der.valor , tipo: "float"};
                            
                            default:
                                throw new Error('No es valida esa operacion');
                        }
                    }
                }else{
                    alert("No se puede divir dentro de 0")
                    return null
                }
                
            case '<=':
                
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor <= der.valor , tipo: "boolean"};
                        case 'float':
                            return {valor:izq.valor <= der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor <= der.valor , tipo: "boolean"};
                        case 'int':
                            return {valor:izq.valor <= der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "char"){
                    switch (der.tipo){
                        case 'char':
                            return {valor:izq.valor <= der.valor , tipo: "boolean"};

                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '%':
                if(der != 0){
                    if(izq.tipo == "int"){
                        switch (der.tipo){
                            case 'int':
                                return {valor:izq.valor % der.valor , tipo: "int"};
    
                            default:
                                throw new Error('No es valida esa operacion');
                        }
                    }
                }else{
                    alert("no puede divir entre un 0")
                }
                
            case '>=' : 
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor >= der.valor , tipo: "boolean"};
                        case 'float':
                            return {valor:izq.valor >= der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor >= der.valor , tipo: "boolean"};
                        case 'int':
                            return {valor:izq.valor >= der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "char"){
                    switch (der.tipo){
                        case 'char':
                            return {valor:izq.valor >= der.valor , tipo: "boolean"};

                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
                
            case '>' :
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor > der.valor , tipo: "boolean"};
                        case 'float':
                            return {valor:izq.valor > der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor > der.valor , tipo: "boolean"};
                        case 'int':
                            return {valor:izq.valor > der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "char"){
                    switch (der.tipo){
                        case 'char':
                            return {valor:izq.valor > der.valor , tipo: "boolean"};

                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '<':
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor < der.valor , tipo: "boolean"};
                        case 'float':
                            return {valor:izq.valor < der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor < der.valor , tipo: "boolean"};
                        case 'int':
                            return {valor:izq.valor < der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "char"){
                    switch (der.tipo){
                        case 'char':
                            return {valor:izq.valor < der.valor , tipo: "boolean"};

                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '&&"':
                if(izq.tipo == "boolean"){
                    switch (der.tipo){
                        case 'boolean':
                            return {valor:izq.valor && der.valor , tipo: "boolean"};

                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '!=':
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor != der.valor , tipo: "boolean"};
                        case 'float':
                            return {valor:izq.valor != der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor != der.valor , tipo: "boolean"};
                        case 'int':
                            return {valor:izq.valor != der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "boolean"){
                    switch (der.tipo){
                        case 'boolean':
                            return {valor:izq.valor != der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }


                if(izq.tipo == "char"){
                    switch (der.tipo){
                        case 'char':
                            return {valor:izq.valor != der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

            case '==':
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor == der.valor , tipo: "boolean"};
                        case 'float':
                            return {valor:izq.valor == der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor == der.valor , tipo: "boolean"};
                        case 'int':
                            return {valor:izq.valor == der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "boolean"){
                    switch (der.tipo){
                        case 'boolean':
                            return {valor:izq.valor == der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }


                if(izq.tipo == "char"){
                    switch (der.tipo){
                        case 'char':
                            return {valor:izq.valor == der.valor , tipo: "boolean"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '||':
                if(izq.tipo == "boolean"){
                    switch (der.tipo){
                        case 'boolean':
                            return {valor:izq.valor || der.valor , tipo: "boolean"};

                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
            case '+=':
                if(izq.tipo == "int"){
                    switch (der.tipo){
                        case 'int':
                            return {valor:izq.valor + der.valor , tipo: "int"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }
                
                if(izq.tipo == "float"){
                    switch (der.tipo){
                        case 'float':
                            return {valor:izq.valor + der.valor , tipo: "float"};
                        case 'int':
                            return {valor:izq.valor + der.valor , tipo: "float"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                if(izq.tipo == "string"){
                    switch (der.tipo){
                        case 'string':
                            return {valor:izq.valor + der.valor , tipo: "string"};
                        
                        default:
                            throw new Error('No es valida esa operacion');
                    }
                }

                case '-=':
                    if(izq.tipo == "int"){
                        switch (der.tipo){
                            case 'int':
                                return {valor:izq.valor - der.valor , tipo: "int"};
                            
                            default:
                                throw new Error('No es valida esa operacion');
                        }
                    }
                    
                    if(izq.tipo == "float"){
                        switch (der.tipo){
                            case 'float':
                                return {valor:izq.valor - der.valor , tipo: "float"};
                            case 'int':
                                return {valor:izq.valor - der.valor , tipo: "float"};
                            
                            default:
                                throw new Error('No es valida esa operacion');
                        }
                    }


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
                if(exp.tipo == "int"){
                    return {valor:-exp.valor , tipo: exp.tipo};
                }else if(exp.tipo == "float"){
                    return {valor:-exp.valor , tipo: exp.tipo};
                }else{
                    throw new Error('No es valida esa operacion');
                }
                
            case '!':
                    if(exp.tipo == "boolean"){
                        return {valor:!exp.valor , tipo: exp.tipo};
                    }else{
                        throw new Error('No es valida esa operacion');
                    }
                    

            case '++':
                if(exp.tipo == "int"){
                    return {valor:exp.valor + 1, tipo: exp.tipo};
                }else if(exp.tipo == "float"){
                    return {valor:-exp.valor + 1 , tipo: exp.tipo};
                }else{
                    throw new Error('No es valida esa operacion');
                }
                
            
            case '--':
                if(exp.tipo == "int"){
                    return {valor:exp.valor - 1, tipo: exp.tipo};
                }else if(exp.tipo == "float"){
                    return {valor:exp.valor - 1 , tipo: exp.tipo};
                }else{
                    throw new Error('No es valida esa operacion');
                }
                


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
        return {valor:node.valor, tipo:node.tipo};
    }


    /**
     * @type {BaseVisitor['visitDeclaracionVariable']}
     */
    visitDeclaracionVariable(node) {
        let tipoVariable =  node.tipo;
        const nombreVariable = node.id;

        

        console.log(tipoVariable)




        if(node.exp){

            const valor = node.exp.accept(this)
            console.log("no se que devevle" + valor.tipo)

            switch (tipoVariable) {
                case "int":
                    if(tipoVariable != valor.tipo) {
                        const { line, column } = node.location.start;
                        throw new Error(`El tipo del valor no coincide con el tipo ${tipoVariable}. En linea ${line}, columna ${column}`);
                    }
                    
                    break;
        
                case "float":
                    if(valor.tipo != "int" &&  tipoVariable != valor.tipo){
                        throw new Error(`El tipo del valor es incompatible con el tipo requerido. ${tipo}`)
                    }
                    break;
                case "string":
                    if (tipoVariable != valor.tipo) {
                        throw new Error(`El tipo del valor es incompatible con el tipo requerido. ${tipo}`);
                    }
                    break;
        
                case "char":
                    if (tipoVariable != valor.tipo) {
                        throw new Error(`El tipo del valor es incompatible con el tipo requerido. ${tipo}`);
                    }
                    break;
        
                case "boolean":
                    if (tipoVariable != valor.tipo) {
                        throw new Error(`El tipo del valor es incompatible con el tipo requerido. ${tipo}`);
                    }
                    break;
    
                    case "var":
                        // Determinar el tipo dinámicamente basado en el valor
                        if (typeof valor.valor === 'number') {
                            if (Number.isInteger(valor.valor)) {
                                tipoVariable = valor.tipo;
                            } else {
                                tipoVariable = valor.tipo;
                            }
                        } else if (typeof valor.valor === 'string') {
                            if (valor.valor.length === 1) {
                                tipoVariable = valor.tipo;
                            } else {
                                tipoVariable = valor.tipo;
                            }
                        } else if (typeof valor.valor === 'boolean') {
                            tipoVariable = valor.tipo;
                        } else {
                            throw new Error(`Tipo no soportado para la variable ${nombreVariable}`);
                        }
                        break;;
                default:
                    throw new Error(`Operador no soportado: ${node.op}`);
            }

            console.log("fin: "+tipoVariable)

            this.entornoActual.setVariable(tipoVariable,nombreVariable, valor.valor);
            return

        }

    }
/**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */

    visitDeclaracionSinAargumn(node){
        var tipo = node.tipo
        const nombreVarible = node.id
        const valorDefino = DatoSinArgu(node.tipo)

        this.entornoActual.setVariable(tipo, nombreVarible, valorDefino)

    }



    /**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */
    visitReferenciaVariable(node) {
        const nombreVariable = node.id;

        const varible = this.entornoActual.getVariable(nombreVariable)
        return {valor:varible.valor, tipo:varible.tipo}
    }


    /**
      * @type {BaseVisitor['visitPrint']}
      */
    visitPrint(node) {
        const valor = node.exp.accept(this);
        this.consola += valor.valor + ' ';
        node.expM.forEach(exp => this.consola += exp.accept(this).valor +  ' ')
        this.consola += '\n'
        
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
        console.log("aqui estoy "  + valor)
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
        const cond = node.cond.accept(this).valor;

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
        const entornoInicial = this.entornoActual;

        try {
            while (node.cond.accept(this).valor) {
                node.stmt.accept(this);
            }
            
        } catch (error) {
            this.entornoActual = entornoInicial

            if(error instanceof BreakException){
                return
            }

            if(error instanceof ContinueException){
                return this.visitWhile(node);
            }

            throw error;
            
        }
        
    }

    /**
     * @type {BaseVisitor['visitFor']}
     */
    visitFor(node){
        const incrementoAnterior = this.continueProcessing;
        this.continueProcessing = node.incremento;

        const forTraducido = new nodos.Bloque({
            dcls: [
                node.inicializacion,
                new nodos.While({
                    cond: node.condicion,
                    stmt: new nodos.Bloque({
                        dcls: [
                            node.stmt,
                            node.incremento
                        ]
                    })
                })
            ]
        })

        forTraducido.accept(this);

        this.continueProcessing = incrementoAnterior;

    }

    /**
     * @type {BaseVisitor['visitBoolena']}
     */
    visitBoolena(node){
        return {valor:node.valor,tipo:node.tipo}

    }

            /**
     * @type {BaseVisitor['visitCadenaString']}
     */

    visitCadenaString(node){
        return {valor:node.valor ,tipo:node.tipo}
    }

    
            /**
     * @type {BaseVisitor['visitCaracter']}
     */

    
    visitCaracter(node){
        return {valor:node.valor, tipo:node.tipo}

    }

            /**
     * @type {BaseVisitor['visitEmbebidas']}
     */

        visitEmbebidas(node){
        const exp = node.exp.accept(this)

        switch(node.Embe){
            case 'typeof':
                switch(exp.tipo){
                    case "int":
                        console.log("aqui inicio" + exp.valor)
                        console.log(node.Embe)
                        console.log(exp.tipo)
                        return {valor: exp.tipo, tipo: "string"}
                    case "float":
                        return {valor: exp.tipo, tipo: "string"}
                    case "string":
                        return {valor: exp.tipo, tipo: "string"}
                    case "boolean":
                        return {valor: exp.tipo, tipo: "string"}
                    case "char":
                        return {valor: exp.tipo, tipo: "string"}
                    default:
                        throw new Error(`No valido ese tipo de dato en typeof`);
                }
            case 'toUpperCase':
                switch(exp.tipo){
                    case "string":
                        console.log("aqui inicio" + exp.valor)
                        //const manuysucla = exp.valor.toUpperCase();                        
                        
                        
                        return {valor: exp.valor.toUpperCase(), tipo: "string"}

                    default:
                        throw new Error(`No valido ese tipo de dato en typeof`);
                }

            case 'toLowerCase':
                switch(exp.tipo){
                    case "string":
                        console.log("aqui inicio" + exp.valor)
                        //const minuscula = exp.valor.toLowerCase();                        
                        
                        
                        return {valor: exp.valor.toLowerCase(), tipo: "string"}

                    default:
                        throw new Error(`No valido ese tipo de dato en typeof`);
                }

            case 'parsefloat':
                switch(exp.tipo){
                        
                    case "string":
                        console.log("aqui inicio --" + exp.valor)
                        console.log(node.Embe)
                        console.log(exp.tipo)
                        console.log("aquí inicio: ---" + exp.valor);
            
                        // Validar que el string contenga solo números, opcionalmente con un punto decimal
                        const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
            
                        if (regex.test(exp.valor)) {
                            //const valorFloat = parseFloat(exp.valor);
                            return { valor: parseFloat(exp.valor), tipo: "float" };
                        } else {
                            throw new Error(`El valor '${exp.valor}' no es un número válido.`);
                        }

                    default:
                        throw new Error(`No valido ese tipo de dato en typeof`);
                }
            case 'parseInt':
                switch(exp.tipo){
                    case "string":
                        console.log("aquí inicio: " + exp.valor);
            
                        // Validar que el string contenga solo números, opcionalmente con un punto decimal
                        const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
            
                        if (regex.test(exp.valor)) {
                            //const valorFloat = parseInt(exp.valor);
                            return { valor: parseInt(exp.valor), tipo: "int" };
                        } else {
                            throw new Error(`El valor '${exp.valor}' no es un número válido.`);
                        }

                    default:
                        throw new Error(`No valido ese tipo de dato en typeof`);
                }
            case 'toString':
                switch(exp.tipo){
                    case "int":
                        
            
                        console.log("aqui estoy ------")
                        console.log("aquí inicio: " +  exp.valor  + exp.tipo);
                        //const valorString = toString(exp.valor);
                        return { valor: exp.valor.toString(), tipo: "string" };
                    case "boolean":
                        
            
                        console.log("aqui estoy ------")
                        console.log("aquí inicio: " +  exp.valor  + exp.tipo);
                        //const valorString = toString(exp.valor);
                        return { valor: exp.valor.toString(), tipo: "string" };
                    case "float":
                        
            
                        console.log("aqui estoy ------")
                        console.log("aquí inicio: " +  exp.valor  + exp.tipo);
                        //const valorString = toString(exp.valor);
                        return { valor: exp.valor.toString(), tipo: "string" };
                        

                    default:
                        throw new Error(`No valido ese tipo de dato en typeof`);
                }


            default:
                throw new Error(`Operacion embebedia no encontrada`);

        }

    }


    /** @type {BaseVisitor['visitSwitch']} */
    visitSwitch(node) {
        let casoEncontrado = false;
        const entornoAnterior = this.entornoActual

        try {
            for (const caso of node.cas) {

                if (caso.exp.accept(this).valor === node.exp.accept(this).valor  || casoEncontrado) {
                    casoEncontrado = true;
                    this.visitCase(caso);
                }
    
                // if (casoEncontrado) {
                //     const entornoAnterior = this.entornoActual;
                //     this.entornoActual = new Entorno(entornoAnterior);
                    
                //     for (const stmt of caso.bloque) {
                //         stmt.accept(this);
                //     }
    
                //     this.entornoActual = entornoAnterior;
                    
                // }
            }
            if (!casoEncontrado && node.def) {
    
                for (const stmt of node.def.bloque) {
                    stmt.accept(this);
                }
            }
        } catch (error) {
            this.entornoActual = entornoAnterior;

            if(error instanceof BreakException){
                return;
            }

            throw error
        }
    }

    /**
     * @type {BaseVisitor['visitTernario']}
     */
    visitTernario(node){
        const cond = node.validar.accept(this);
        console.log(cond.tipo)

        if(cond.tipo != "boolean"){
            throw new Error(`el tipo no es un boolean`);
        }


        return cond.valor ?node.cond1.accept(this) :  node.cond2.accept(this)
        


    }

    /**
     * @type {BaseVisitor['visitArregloValores']}
     */
    visitArregloValores(node){
        let arry = [];
        const tipos = node.tipo;
        const idT = node.id;
        const lista1 = node.ArreTi.dato1; // Suponiendo que dato1.tipo es un array
        const lista2 = node.ArreTi.dato2; // Suponiendo que dato2 es un array
        
        console.log("tipo del arreglo: " + tipos);
        console.log("nombre del arreglo: " + idT);
        
        // Si lista1 es un array, puedes concatenarlo con lista2
        if(tipos != lista1.tipo && (tipos != "float" && lista1.tipo != "int")){
            throw new Error(`el dato del valor no es el mismo tipo`);
        }
        arry.push(lista1.valor)

        for (let index = 0; index < lista2.length; index++) {
            const element = lista2[index];
            if(tipos != element.tipo  && (tipos != "float" && element.tipo != "int")){
                throw new Error(`el dato del valor no es el mismo tipo`);
            }
            arry.push(element.valor)
            
        }

        this.entornoActual.setVariable(tipos,idT,arry);
        return


    }
    /**
     * @type {BaseVisitor['visitArregloCantida']}
     */

    visitArregloCantidad(node) {
        const tipo = node.tipo;
        const id = node.id;
        const tipo1 = node.tipo2;
        const dimensiones = node.dimensiones.map(dim => dim.accept(this));
    
        console.log("tipo: " + tipo);
        console.log("id: " + id);
        console.log("tipo1: " + tipo1);
        console.log("dimensiones: " + dimensiones.map(dim => dim.tipo).join(', '));
    
        if (tipo != tipo1) {
            throw new Error(`El dato del valor no es del mismo tipo`);
        }
    
        for (const dimension of dimensiones) {
            if (dimension.valor < 0) {
                throw new Error(`El tamaño de un arreglo no puede ser negativo`);
            }
            if (dimension.tipo != "int") {
                throw new Error(`El tipo de la dimensión debe ser int`);
            }
        }
    
        // Crear el arreglo multidimensional
        let crearArregloMultidimensional = (dimensiones, index = 0) => {
            if (index === dimensiones.length) {
                return DatoSinArguemntoArreglo(tipo);
            }
            return new Array(dimensiones[index].valor).fill().map(() => 
                crearArregloMultidimensional(dimensiones, index + 1)
            );
        };
    
        let arry = crearArregloMultidimensional(dimensiones);
        this.entornoActual.setVariable(tipo, id, arry);
    
        return;
    }

    
/**
     * @type {BaseVisitor['visitArregloCopia']}
     */
    visitArregloCopia(node){
        
        const tipo = node.tipo
        const copiaArreglo = node.id
        const arregloAcopiar = node.exp.accept(this)


        console.log("tipo: " + tipo)
        console.log("copiaArreglo: " + copiaArreglo)
        console.log("arregloAcopiar: " + arregloAcopiar.tipo)
        if(tipo != arregloAcopiar.tipo){
            throw new Error(`el arreglo a copiar es de diferente tipo`);
        }

        const arryNuevo =  arregloAcopiar.valor.slice();
        console.log("se realizo copia: " + arryNuevo);

        this.entornoActual.setVariable(tipo, copiaArreglo, arryNuevo);

        
        return
    }

    /**
     * @type {BaseVisitor['visitAccesoElem']}
     */

    visitAccesoElem(node){
        const arreglo = node.dat.accept(this).valor
        


        switch(node.op){
            case "indexOf":
                const valor = node.bus.valor
                for (let index = 0; index < arreglo.length; index++) {
                    const element = arreglo[index];
                    if(element == valor){
                        return {valor:index, tipo: "int"}
                    }
                    
                }
                return {valor:-1 , tipo:"int"}
            case "length":
                const length = arreglo.length;
                console.log(length);
                return { valor: length, tipo: "int" };
            case "join":
                let cadena ="";
                for (let index = 0; index < arreglo.length; index++) {
                    cadena += arreglo[index].toString();
                    if (index < arreglo.length - 1) {
                        cadena += ",";
                    }
                            
                }
                return { valor: cadena, tipo: "string" };

            default:
                throw new Error(`Operacion de arreglo no encontrada`);
        }

    }

        /**
     * @type {BaseVisitor['visitAccElem']}
     */

        visitAccElem(node) {
            let arreglo = this.entornoActual.getVariable(node.id);
            console.log("arreglo inicial:", arreglo);
        
            for (let i = 0; i < node.dimensiones.length; i++) {
                const indice = node.dimensiones[i][1].accept(this);  // Accedemos a la Expresion dentro del par [Expresion]
                console.log(`dimensión ${i + 1}, índice:`, indice);
        
                if (indice.tipo !== "int") {
                    throw new Error(`El índice de acceso al arreglo debe ser de tipo int, pero se encontró: "${indice.tipo}" en la dimensión ${i + 1}.`);
                }
        
                if (!Array.isArray(arreglo.valor)) {
                    throw new Error(`Se esperaba un arreglo en la dimensión ${i + 1}, pero se encontró: "${typeof arreglo.valor}".`);
                }
        
                if (indice.valor < 0 || indice.valor >= arreglo.valor.length) {
                    throw new Error(`Índice fuera de rango en la dimensión ${i + 1}: ${indice.valor}. El rango válido es 0-${arreglo.valor.length - 1}.`);
                }

                console.log("no se que es lo que hace"  +arreglo.valor[indice.valor])
        
                arreglo = { valor: arreglo.valor[indice.valor], tipo: arreglo.tipo };
            }
        
            return arreglo;
        }


        /**
     * @type {BaseVisitor['visitAsigVector']}
     */
        visitAsigVector(node) {
            let arreglo = this.entornoActual.getVariable(node.id);
            const dato = node.dato.accept(this);
            let currentArray = arreglo.valor;
        
            for (let i = 0; i < node.indices.length; i++) {
                console.log(`node.indices[${i}]:`, node.indices[i]);
                const indice = node.indices[i][1].accept(this);
        
                if (indice.tipo !== "int") {
                    throw new Error(`El índice de acceso al arreglo debe ser de tipo int, pero se encontró: "${indice.tipo}" en la dimensión ${i + 1}.`);
                }
        
                if (!Array.isArray(currentArray)) {
                    throw new Error(`Se esperaba un arreglo en la dimensión ${i + 1}, pero se encontró: "${typeof currentArray}".`);
                }           
        
                if (indice.valor < 0 || indice.valor >= currentArray.length) {
                    throw new Error(`Índice fuera de rango en la dimensión ${i + 1}: ${indice.valor}. El rango válido es 0-${currentArray.length - 1}.`);
                }
        
                if (i === node.indices.length - 1) {
                    // Estamos en el último índice, asignamos el valor
                    if (dato.tipo !== arreglo.tipo) {
                        throw new Error(`Tipo de dato incorrecto. Se esperaba ${arreglo.tipo}, pero se recibió ${dato.tipo}.`);
                    }
                    currentArray[indice.valor] = dato.valor;
                } else {
                    // Nos movemos al siguiente nivel del arreglo
                    currentArray = currentArray[indice.valor];
                }
            }
        
            console.log("Asignación completada:", arreglo.valor);
            return;
        }
        
        
        

    /**
     * @type {BaseVisitor['visitMatrices']}
     */
    visitMatrices(node) {
        const tipo = node.tipo;
        const id = node.id;
        const valores = node.valores.accept(this);
        let arrayTemp = [];

        console.log(node)
    
        // function procesarDimen(dim, tipo) {
        //     if (Array.isArray(dim)) {
        //         let tempArray = [];
        //         dim.forEach(valor => {
        //             if (Array.isArray(valor)) {
        //                 tempArray.push(procesarDimen(valor, tipo));
        //             } else {
        //                 if (tipo === "float" && typeof valor === "number") {
        //                     tempArray.push(valor);
        //                 } else if (tipo !== typeof valor) {
        //                     throw new Error(`El tipo del array no coincide con el tipo del valor`);
        //                 } else {
        //                     tempArray.push(valor);
        //                 }
        //             }
        //         });
        //         return tempArray;
        //     }
        //     return dim;
        // }
    
        // arrayTemp = procesarDimen(valores.valor, tipo);
    
        // console.log(arrayTemp);
        // this.entornoActual.setVariable(tipo, id, arrayTemp);
    }
    
    


    /**
     * @type {BaseVisitor['visitMatrizCantidad']}
     */
    visitMatrizCantidad(node){
        const tipo = node.tipo;
        const id = node.id;
        const tipo1 = node.tipo2;
        const dim1 = node.dim1.accept(this); // Primera dimensión
        const dim2 = node.dim2.accept(this); // Segunda dimensión

        console.log("Tipo: " + tipo);
        console.log("ID: " + id);
        console.log("Tipo 1: " + tipo1);
        console.log("Primera dimensión: " + dim1.tipo + " valor: " + dim1.valor);
        console.log("Segunda dimensión: " + dim2.tipo + " valor: " + dim2.valor);

        if (tipo !== tipo1) {
            throw new Error(`El tipo del valor no coincide: se esperaba ${tipo} pero se encontró ${tipo1}`);
        }

        if (dim1.valor < 0 || dim2.valor < 0) {
            throw new Error(`El tamaño de una dimensión no puede ser negativo`);
        }

        if (dim1.tipo !== "int" || dim2.tipo !== "int") {
            throw new Error(`Las dimensiones deben ser de tipo int`);
        }

        // Crear el arreglo bidimensional con el valor por defecto según el tipo
        let arry = Array.from({ length: dim1.valor }, () => 
            new Array(dim2.valor).fill(DatoSinArguemntoArreglo(tipo))
        );

        this.entornoActual.setVariable(tipo, id, arry);

        return;

    }


        /**
     * @type {BaseVisitor['visitBreak']}
     */
        visitBreak(node) {
            throw new BreakException();
        }
    
        /**
         * @type {BaseVisitor['visitContinue']}
         */
        visitContinue(node) {
    
            if (this.continueProcessing) {
                this.continueProcessing.accept(this);
            }
    
            throw new ContinueException();
        }
    
        /**
         * @type {BaseVisitor['visitReturn']}
         */
        visitReturn(node) {
            let valor = null
            if (node.exp) {
                valor = node.exp.accept(this);
            }
            throw new ReturnException(valor);
        }
    
        /**
         * @type {BaseVisitor['visitCase']}
         */
        visitCase(node){

            const entornoAnterior = this.entornoActual;

            try {

                for (const accion of node.commands) {
                    accion.accept(this);
                }
                if (node.breakST) {
                    throw new BreakException();
                }
            } catch (error) {
                this.entornoActual = entornoAnterior;
    
                if (error instanceof BreakException) {
                    throw error; 
                }
                throw error; 

            }
        }
        


    
}