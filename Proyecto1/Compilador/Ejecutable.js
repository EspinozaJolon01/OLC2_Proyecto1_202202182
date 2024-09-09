
import {InterpreterVisitor} from "./interprete.js";
import { erroresReporte } from "./reports.js";
import { erroresCompilacion } from "./compilador.js";


export class Ejecutable {


    aridad(){
        //throw new Error("Método no implementado");
        let error = new erroresReporte(this.nodo.location.start.line, this.nodo.location.start.column,`Método no implementado`);
        erroresCompilacion.push(error);
    }


    /**
     * @param interprete {InterpreterVisitor}
     * @param args {any[]}
     */

    invocar(interprete, argumentos){
        //throw new Error("Método no implementado");
        let error = new erroresReporte(this.nodo.location.start.line, this.nodo.location.start.column,`Método no implementado`);
        erroresCompilacion.push(error);
    }
}