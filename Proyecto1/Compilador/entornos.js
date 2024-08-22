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
    setVariable(nombre, valor) {
        // Verificar si la variable ya está definida en el entorno actual o en sus padres
        if (this.existeVariable(nombre)) {
            throw new Error(`Error: La variable ${nombre} ya está definida`);
        }
        this.valores[nombre] = valor;
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        if (nombre in this.valores) {
            return this.valores[nombre];
        }

        if (this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new Error(`Variable ${nombre} no definida`);
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    assignVariable(nombre, valor) {
        if (nombre in this.valores) {
            this.valores[nombre] = valor;
            return;
        }

        if (this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }

        throw new Error(`Variable ${nombre} no definida`);
    }

    /**
     * @param {string} nombre
     * @returns {boolean}
     */
    existeVariable(nombre) {
        if (nombre in this.valores) {
            return true;
        }

        if (this.padre) {
            return this.padre.existeVariable(nombre);
        }

        return false;
    }
}
