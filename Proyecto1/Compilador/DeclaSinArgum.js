import { erroresReporte } from "./reports.js";
import { erroresCompilacion } from "./compilador.js";



export function DatoSinArguemntoArreglo(tipo,nodo) {
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
            let error = new erroresReporte(nodo.location.start.line, nodo.location.start.column,`Tipo ${tipo} no es valido`);
            erroresCompilacion.push(error);
    }
}