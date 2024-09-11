
import {StructC} from './structC.js';
import { erroresReporte } from "./reports.js";
import { erroresCompilacion } from "../../index.js";

export class Instancia  {


    constructor(structC){
        /**
         * @type {StructC}
         */
        this.structC = structC;

        this.propiedades = {};
        
    }


    set(nombre, valor,nodo) {
        //console.log("Instancia.set: ", nombre, valor);
        if (!(nombre in this.structC.propiedades)) {
            //throw new Error(`La propiedad ${nombre} no está definida en la estructura ${this.structC.nombre}`);
            let error = new erroresReporte(nodo.location.start.line, nodo.location.start.column,`La propiedad ${nombre} no está definida en la estructura ${this.structC.nombre}`);
            erroresCompilacion.push(error);
            return;
        }
        this.structC.propiedades[nombre] = valor;
    }

    get(nombre,nodo) {
        if(this.structC.propiedades.hasOwnProperty(nombre)){
            return this.structC.propiedades[nombre];
        }else{
            //throw new Error(`Propiedad no encontrada: ${nombre}`);
            let error = new erroresReporte(nodo.location.start.line,nodo.location.start.column,`Propiedad no encontrada: ${nombre}`);
            erroresCompilacion.push(error);
        }
    }
}