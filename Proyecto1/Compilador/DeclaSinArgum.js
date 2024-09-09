import { erroresReporte } from "./reports.js";
import { erroresCompilacion } from "./compilador.js";

export function DatoSinArgu(tipo) {
    switch (tipo) {
        case "int":               
            return 0
        case "float":
            return 0.0
        case "string":
            return ""
        case "boolean":
            return true
        case "char":
            return ''
        default:
            //throw new Error(`Tipo ${tipo} no es valido`)
            let error = new erroresReporte(this.nodo.location.start.line, this.nodo.location.start.column,`Tipo ${tipo} no es valido`);
            erroresCompilacion.push(error);
    }
}


export function DatoSinArguemntoArreglo(tipo) {
    switch (tipo) {
        case "int":               
            return 0
        case "float":
            return 0.0
        case "string":
            return ""
        case "boolean":
            return false
        case "char":
            return ''
        default:
            //throw new Error(`Tipo ${tipo} no es valido`)
            let error = new erroresReporte(this.nodo.location.start.line, this.nodo.location.start.column,`Tipo ${tipo} no es valido`);
            erroresCompilacion.push(error);
    }
}