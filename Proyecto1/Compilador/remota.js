import { Ejecutable } from './Ejecutable.js';
import { Entorno } from './entornos.js';
import { BreakException } from './TransferCommands.js';
import { ReturnException } from './TransferCommands.js';
import { erroresReporte } from "./reports.js";
import { erroresCompilacion } from "../../index.js";

export class FuncionRemota extends Ejecutable {

    constructor(node,clousure) {
        super();

        /**
    * @type {DeclaracionFuncion}
    */
        this.node = node;
        /**
         * @type {Entorno}
         */
        this.clousure = clousure;
    }

    aridad() {
        return this.node.params;
    }

    /**
    * @type {Invocable['invocar']}
    */

    invocar(interprete, argumentos, node) {
        const nuevoEntorno = new Entorno(this.clousure);

        this.node.params.forEach((parametro, i) => {
            nuevoEntorno.setVariable(parametro.tipo,parametro.id, argumentos[i].valor,node.location.start.line,node.location.start.column);
        });


        const entornoAntesDeEjecutar = interprete.entornoActual;
        interprete.entornoActual = nuevoEntorno;

            

        try {

            
            this.node.bloque.accept(interprete);



        } catch (error) {
            interprete.entornoActual = entornoAntesDeEjecutar;

            
            if (error instanceof ReturnException) {

                
                if(this.node.tipo === 'void' && error.value !== null){

                    let error = new erroresReporte(node.location.start.line, node.location.start.column,`Una función de tipo 'void' no puede retornar un valor.`);
                    erroresCompilacion.push(error);
                    
                }else if(this.node.tipo === 'void' && error.value === null){
                    return null;  

                }else if(this.node.tipo !== error.value.tipo){
                    let error = new erroresReporte(node.location.start.line, node.location.start.column,`El tipo de retorno de la función no coincide con el tipo de la función.`);
                    erroresCompilacion.push(error);
                }else{
                    return error.value;
                }

            }

            if(this.node.tipo !== "void" && error instanceof BreakException){
                let error = new erroresReporte(node.location.start.line, node.location.start.column,`La función ${this.node.id} debe retornar un valor`);
                erroresCompilacion.push(error);
                return;
                
            }

            if(this.node.tipo !== "void" && error instanceof ContinueException){
                let error = new erroresReporte(node.location.start.line, node.location.start.column,`La función ${this.node.id} debe retornar un valor`);
                erroresCompilacion.push(error);
                
            }

            throw error;
        }

        if(this.node.tipo !== "void"){
            let error = new erroresReporte(node.location.start.line, node.location.start.column,`La función ${this.node.id} debe retornar un valor`);
            erroresCompilacion.push(error);
            return;
        }

        interprete.entornoActual = entornoAntesDeEjecutar;
        return null;

    }
}