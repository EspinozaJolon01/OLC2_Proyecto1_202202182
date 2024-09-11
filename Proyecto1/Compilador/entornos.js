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
            return;
            
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
        return ;

    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    assignVariable(nombre, valor,linea,columna) {
        const bandera = this.valores[nombre]

        if (bandera != undefined) {

            if(valor.tipo == "int" && bandera.tipo == "float"){
                this.valores[nombre].valor = valor.valor;
                this.valores[nombre].linea = valor.linea;
                this.valores[nombre].columna = valor.columna;
                return;
            }else if(bandera.tipo != valor.tipo){
                //throw new Error(`Error: No se puede asignar ${valor.tipo} a ${bandera.tipo}`);
                let error = new erroresReporte(linea,columna,`Error: No se puede asignar ${valor.tipo} a ${bandera.tipo}`);
                erroresCompilacion.push(error);
                this.valores[nombre].valor = null;
                return;
            }

            this.valores[nombre].valor = valor.valor;
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
        return;
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
            return;
        }


}
