
import {InterpreterVisitor} from "./interprete.js";


export class Ejecutable {


    aridad(){
        throw new Error("Método no implementado");
    }


    /**
     * @param interprete {InterpreterVisitor}
     * @param args {any[]}
     */

    invocar(interprete, argumentos){
        throw new Error("Método no implementado");
    }
}