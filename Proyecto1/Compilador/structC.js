
import { Ejecutable } from "./Ejecutable.js";
import { Instancia } from "./instancia.js";

export class StructC extends Ejecutable {

    constructor(nombre,propiedades){
        super();
        /**
         * @type {string}
         */
        this.nombre = nombre;

        /**
        * @type {Object.<string, Expresion>}        
        */
        this.propiedades = propiedades;


    }


    aridad() {
        return Object.keys(this.propiedades).length;
    }

    /**
    * @type {Invocable['invocar']}
    */
    invocar(interprete, args) {
        const nuevaInstancia = new Instancia(this);

        Object.entries(this.propiedades).forEach(([nombre, valor]) => {
            nuevaInstancia.set(nombre, valor);
        });

        console.log("Instancia de StructC: ", nuevaInstancia);

        return nuevaInstancia;

    }
}