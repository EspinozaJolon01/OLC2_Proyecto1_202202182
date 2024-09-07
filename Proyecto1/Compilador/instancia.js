
import {StructC} from './structC.js';

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
            throw new Error(`La propiedad ${nombre} no está definida en la estructura ${this.structC.nombre}`);
        }
        this.propiedades[nombre] = valor;
    }

    get(nombre) {
        if (!(nombre in this.propiedades)) {
            throw new Error(`La propiedad ${nombre} no ha sido inicializada en esta instancia de ${this.structC.nombre}`);
        }
        return this.propiedades[nombre];
    }
}