import { erroresCompilacion } from "./compilador.js";
import { erroresReporte } from "./reports.js";




export class Entorno {
    /**
     * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor,linea ,columna) {
        // Verificar si la variable ya está definida en el entorno actual o en sus padres
        if (this.valores[nombre] != undefined) {
            //throw new Error(`Error: La variable ${nombre} ya está definida`);
            let errores = new erroresReporte(linea,columna,`Error: La variable ${nombre} ya está definida`);
            erroresCompilacion.push(errores);
            
        }
        this.valores[nombre] = { valor, tipo,linea,columna };
        
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre,linea,columna) {
        const bandera = this.valores[nombre]

        if (bandera != undefined) {
            return bandera;
        }

        if (!bandera && this.padre) {
            return this.padre.getVariable(nombre);
        }

        //throw new Error(`Variable ${nombre} no definida`)
        let error = new erroresReporte(linea,columna,`Variable ${nombre} no definida`);
        erroresCompilacion.push(error);

    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    assignVariable(nombre, valor,linea,columna) {
        const bandera = this.valores[nombre]

        if (bandera != undefined) {

            if (bandera.tipo === "string" && valor.tipo !== "string") {
                //throw new Error(`El tipo de la variable ${nombre} es 'string', y no coincide con el tipo del valor asignado`);
                let error = new erroresReporte(linea,columna,`El tipo de la variable ${nombre} es 'string', y no coincide con el tipo del valor asignado`);
                erroresCompilacion.push(error);
            }

            if (bandera.tipo === "int" && valor.tipo !== "int") {
                //throw new Error(`El tipo de la variable ${nombre} es 'int' y no coincide con el tipo del valor asignado.`);
                let error = new erroresReporte(linea,columna,`El tipo de la variable ${nombre} es 'int' y no coincide con el tipo del valor asignado.`);
                erroresCompilacion.push(error);
            }


            if (bandera.tipo === "float" && (valor.tipo !== "float" && valor.tipo !== "int")) {
                //throw new Error(`El tipo de la variable ${nombre} es 'float' y no coincide con el tipo del valor asignado.`);
                let error = new erroresReporte(linea,columna,`El tipo de la variable ${nombre} es 'float' y no coincide con el tipo del valor asignado.`);
                erroresCompilacion.push(error);
            }
    

            if (bandera.tipo === "char" && valor.tipo !== "char") {
                //throw new Error(`El tipo de la variable ${nombre} es 'char' y no coincide con el tipo del valor asignado.`);
                let error = new erroresReporte(linea,columna,`El tipo de la variable ${nombre} es 'char' y no coincide con el tipo del valor asignado.`);
                erroresCompilacion.push(error);
            }

            if (bandera.tipo === "boolean" && valor.tipo !== "boolean") {
                //throw new Error(`El tipo de la variable ${nombre} es 'boolean'  y no coincide con el tipo del valor asignado.`);
                let error = new erroresReporte(linea,columna,`El tipo de la variable ${nombre} es 'boolean'  y no coincide con el tipo del valor asignado.`);
                erroresCompilacion.push(error);
            }
    
            this.valores[nombre].valor = valor.valor;
            this.valores[nombre].tipo = valor.tipo;
            this.valores[nombre].linea = valor.linea;
            this.valores[nombre].columna = valor.columna;
            return;
        }

        if (!bandera && this.padre) {
            this.padre.assignVariable(nombre, valor,linea,columna);
            return;
        }

        //throw new Error(`Variable ${nombre} no definida`);
        let error = new erroresReporte(linea,columna,`Variable ${nombre} no definida`);
        erroresCompilacion.push(error);
    }


        /**
     * @param {string} nombre
     */

        eleiminar(nombre,linea,columna) {
            const bandera = this.valores[nombre]

            if (bandera != undefined) {
                delete this.valores[nombre]
                return;
            }

            if (!bandera && this.padre) {
                this.padre.eleiminar(nombre,linea,columna);
                return;
            }

            //throw new Error(`Variable ${nombre} no definida`);
            let errores = new erroresReporte(linea,columna,`Variable ${nombre} no definida`);
            erroresCompilacion.push(errores);
        }


}
