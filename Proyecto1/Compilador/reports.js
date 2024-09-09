


export class erroresReporte extends Error {
    constructor(linea,columna, mensaje) {
        super(mensaje);
        this.tipo = "SEMANTICO";
        this.linea = linea;
        this.columna = columna;
    }
}