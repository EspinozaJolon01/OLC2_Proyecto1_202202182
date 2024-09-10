


export class erroresReporte extends Error {
    constructor(linea,columna, mensaje) {
        super(mensaje);
        this.tipo = "SEMANTICO";
        this.linea = linea;
        this.columna = columna;
    }
}


export class tablaSimboloReport {
    constructor(id,tipoSimbolo,tipoDato,Ambito,linea,columna){
        this.id = id;
        this.tipoSimbolo = tipoSimbolo;
        this.tipoDato = tipoDato;
        this.ambito = Ambito;
        this.linea = linea; 
        this.columna = columna;
    }
}