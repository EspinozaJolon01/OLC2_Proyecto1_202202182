


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

export const palabraReservada = [
    'int', 'float', 'string', 'boolean', 'char', 'var', 'null', 'true', 
    'false', 'struct', 'if', 'else', 'switch', 'case', 'break', 
    'default', 'while', 'for', 'continue', 'return', 'typeof', 'toString', 
    'Object', 'indexOf', 'length', 'toUpperCase', 'toLowerCase', 'join', 'Object',
    'paseInt', 'parsefloat','void','keys','System'
];


export function buscarTablarReservada(palaba){
    return palabraReservada.includes(palaba);
}

