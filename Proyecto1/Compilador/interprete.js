import { Entorno } from "./entornos.js";
import { BaseVisitor } from "./Visitor.js";

import { DatoSinArgu , DatoSinArguemntoArreglo } from "./DeclaSinArgum.js";





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

            switch (tipoVariable) {
                case "int":
                    if(tipoVariable != valor.tipo) {
                        throw new Error(`El tipo del valor es incompatible con el tipo requerido. ${tipo}`)
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
        while (node.cond.accept(this).valor) {
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


        while (node.condicion.accept(this).valor) {
            node.stmt.accept(this);

            node.incremento.accept(this)
        }
        

        this.entornoActual = entornoAnterior;

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


        for (const caso of node.cas) {

            if (caso.exp.accept(this).valor === node.exp.accept(this).valor) {
                casoEncontrado = true;
            }

            if (casoEncontrado) {
                const entornoAnterior = this.entornoActual;
                this.entornoActual = new Entorno(entornoAnterior);
                
                for (const stmt of caso.bloque) {
                    stmt.accept(this);
                }

                this.entornoActual = entornoAnterior;
                
            }
        }
        if (casoEncontrado && node.def) {

            for (const stmt of node.def.bloque) {
                stmt.accept(this);
            }
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
        if(tipos != lista1.tipo){
            throw new Error(`el dato del valor no es el mismo tipo`);
        }
        arry.push(lista1.valor)

        for (let index = 0; index < lista2.length; index++) {
            const element = lista2[index];
            if(tipos != element.tipo ){
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

    visitArregloCantida(node){
        const tipo = node.tipo
        const id = node.id
        const tipo1 = node.tipo2
        const dimension = node.dim.accept(this)

        console.log("tipo: "+ tipo)
        console.log("id: "+ id)
        console.log("tipo1: "+ tipo1)
        console.log("dimension: "+ dimension.tipo)

        if(tipo != tipo1){
            throw new Error(`el dato del valor no es el mismo tipo`);
        }

        if(dimension.valor < 0){
            throw new Error(`El tamaño de un arreglo no puede ser negativo`);
        }

        if(dimension.tipo != "int"){
            throw new Error(`el tipo debe de ser un int`);
        }

         // Crear el arreglo con el valor por defecto según el tipo
        let arry = new Array(dimension.valor).fill(DatoSinArguemntoArreglo(tipo));

        this.entornoActual.setVariable(tipo, id, arry);

        
        return

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


    


    
}