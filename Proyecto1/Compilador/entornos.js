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
    setVariable(tipo, nombre, valor) {
        // Verificar si la variable ya está definida en el entorno actual o en sus padres
        if (this.valores[nombre] != undefined) {
            throw new Error(`Error: La variable ${nombre} ya está definida`);
        }
        this.valores[nombre] = { valor, tipo };
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const bandera = this.valores[nombre]

        if (bandera != undefined) {
            return bandera;
        }

        if (!bandera && this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new Error(`Variable ${nombre} no definida`)

        
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    assignVariable(nombre, valor) {
        const bandera = this.valores[nombre]

        if (bandera != undefined) {

            if (bandera.tipo === "string" && valor.tipo !== "string") {
                throw new Error(`El tipo de la variable ${nombre} es 'string', y no coincide con el tipo del valor asignado`);
            }

            if (bandera.tipo === "int" && valor.tipo !== "int") {
                throw new Error(`El tipo de la variable ${nombre} es 'int' y no coincide con el tipo del valor asignado.`);
            }


            if (bandera.tipo === "float" && (valor.tipo !== "float" && valor.tipo !== "int")) {
                throw new Error(`El tipo de la variable ${nombre} es 'float' y no coincide con el tipo del valor asignado.`);
            }
    

            if (bandera.tipo === "char" && valor.tipo !== "char") {
                throw new Error(`El tipo de la variable ${nombre} es 'char' y no coincide con el tipo del valor asignado.`);
            }

            if (bandera.tipo === "boolean" && valor.tipo !== "boolean") {
                throw new Error(`El tipo de la variable ${nombre} es 'boolean'  y no coincide con el tipo del valor asignado.`);
            }
    
            this.valores[nombre].valor = valor.valor;
            this.valores[nombre].tipo = valor.tipo; 
            return;
        }

        if (!bandera && this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }

        throw new Error(`Variable ${nombre} no definida`);
    }


}
