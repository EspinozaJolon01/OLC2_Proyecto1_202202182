import { parse } from './gramatica.js'

const codigofuente = document.getElementById('codigofuente')
const ejecutar = document.getElementById('ejecutar')
const consola = document.getElementById('consola')

const recorrer = (nodo) => {
    if (nodo.tipo === 'numero') return nodo.valor
    if (nodo.tipo === 'parentesis') return recorrer(nodo.exp)



    const num1 = (nodo.izq && recorrer(nodo.izq)) || 0
    const num2 = recorrer(nodo.der)

    switch (nodo.tipo) {
        case "+":
            return num1 + num2
        case "-":
            return num1 - num2
        case "*":
            return num1 * num2
        case "/":
            return num1 / num2

    }
}

ejecutar.addEventListener('click', () => {
    const codigoFuente = codigofuente.value
    const arbol = parse(codigoFuente)
    const resultado = recorrer(arbol)
    consola.innerHTML = resultado
})