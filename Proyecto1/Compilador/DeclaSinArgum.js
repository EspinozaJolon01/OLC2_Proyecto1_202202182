export function DatoSinArgu(tipo) {
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
            throw new Error(`Tipo ${tipo} no es valido`)
    }
}