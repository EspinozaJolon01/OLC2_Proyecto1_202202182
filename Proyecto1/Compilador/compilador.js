import { parse } from './gramatica.js'
import { InterpreterVisitor } from './interprete.js'

const editor  = document.getElementById('codigofuente')
const ejecutar = document.getElementById('ejecutar')
const consola = document.getElementById('consola')



ejecutar.addEventListener('click', () => {
    const codigoFuente = editor.value
    const sentencias = parse(codigoFuente)
    //ast.innerHTML = JSON.stringify(sentencias, null, 2)

    const interprete = new InterpreterVisitor()

    // for (const sentencia of sentencias) {
    //     sentencia.accept(interprete)
    // }
    console.log({ sentencias })
    sentencias.forEach(sentencia => sentencia.accept(interprete))

    consola.innerHTML = interprete.consola

})


