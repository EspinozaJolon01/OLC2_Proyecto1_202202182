
import {StructC} from './structC.js';
import { erroresReporte } from "./reports.js";
import { erroresCompilacion } from "./compilador.js";

export class Instancia  {


    constructor(structC){
        /**
         * @type {StructC}
         */
        this.structC = structC;

        this.propiedades = {};
        
    }


    set(nombre, valor) {
        console.log("Instancia.set: ", nombre, valor);
        if (!(nombre in this.structC.propiedades)) {
            //throw new Error(`La propiedad ${nombre} no está definida en la estructura ${this.structC.nombre}`);
            let error = new erroresReporte(this.nodo.location.start.line, this.nodo.location.start.column,`La propiedad ${nombre} no está definida en la estructura ${this.structC.nombre}`);
            erroresCompilacion.push(error);
        }
        this.structC.propiedades[nombre] = valor;
    }

    get(nombre) {
        if(this.structC.propiedades.hasOwnProperty(nombre)){
            return this.structC.propiedades[nombre];
        }

        //throw new Error(`Propiedad no encontrada: ${nombre}`);
        let error = new erroresReporte(this.nodo.location.start.line, this.nodo.location.start.column,`Propiedad no encontrada: ${nombre}`);
        erroresCompilacion.push(error);
    }
}