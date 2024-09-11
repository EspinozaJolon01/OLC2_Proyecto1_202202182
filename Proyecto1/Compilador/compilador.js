

import { parse } from './gramatica.js'
import { InterpreterVisitor } from './interprete.js'
import { StructC } from './structC.js'

const editor = document.getElementById('codigofuente')
const ejecutar = document.getElementById('ejecutar')
const consola = document.getElementById('consola')
const reporteErroresBtn = document.getElementById('reporte-errores')
const reporteSimbolosBtn = document.getElementById('reporte-simbolos')
const modalErrores = document.getElementById('modal-errores')
const modalSimbolos = document.getElementById('modal-simbolos')
const closeButtons = document.getElementsByClassName('close')

export let erroresCompilacion = []
export let tablaSimbolos = []

ejecutar.addEventListener('click', () => {
    const codigoFuente = editor.value
    erroresCompilacion = [] // Limpiar errores de compilación
    tablaSimbolos = [] // Limpiar tabla de símbolos
    //try {
        const sentencias = parse(codigoFuente)
        const interprete = new InterpreterVisitor()
        
        console.log({ sentencias })
        sentencias.forEach(sentencia => sentencia.accept(interprete))
        
        consola.innerHTML = interprete.consola

        console.log(erroresCompilacion)
        console.log(tablaSimbolos)
        // consola.innerHTML += `\n`
        // if (erroresCompilacion.length > 0) {
        //     erroresCompilacion.forEach(error => {
        //         consola.innerHTML += `Error: ${error.message} at line ${error.linea}, column ${error.columna}\n`;
        //     });
        // }

    // } catch (error) {
    //     if(error.location){
    //         consola.innerHTML = 'Error: ' + error.message + ' at line ' + error.location.start.line + ' column ' + error.location.start.column
    //     } else {
    //         consola.innerHTML = 'Error: ' + error.message
    //     }

    //}
})

// Función para abrir modal
function openModal(modal) {
    modal.style.display = 'block'
}

// Función para cerrar modal
function closeModal(modal) {
    modal.style.display = 'none'
}

// Event listeners para abrir modales
reporteErroresBtn.addEventListener('click', () => {
    openModal(modalErrores)
    populateErroresTable()
})

reporteSimbolosBtn.addEventListener('click', () => {
    openModal(modalSimbolos)
    populateSimbolosTable()
})

// Event listeners para cerrar modales
Array.from(closeButtons).forEach(button => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.modal'))
    })
})

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target)
    }
})

// Función para poblar la tabla de errores
function populateErroresTable() {
    const tableBody = document.querySelector('#tabla-errores tbody')
    tableBody.innerHTML = '' // Limpiar tabla existente

    erroresCompilacion.forEach((error, index) => {
        const row = tableBody.insertRow()
        row.insertCell().textContent = index + 1
        row.insertCell().textContent = error.message
        row.insertCell().textContent = error.linea 
        row.insertCell().textContent = error.columna 
        row.insertCell().textContent = error.tipo 
    })
}

// Función para poblar la tabla de símbolos
function populateSimbolosTable() {
    const tableBody = document.querySelector('#tabla-simbolos tbody')
    tableBody.innerHTML = '' // Limpiar tabla existente

    tablaSimbolos.forEach(simbolo => {
        const row = tableBody.insertRow()
        row.insertCell().textContent = simbolo.id
        row.insertCell().textContent = simbolo.tipoSimbolo
        row.insertCell().textContent = simbolo.tipoDato
        row.insertCell().textContent = simbolo.ambito
        row.insertCell().textContent = simbolo.linea
        row.insertCell().textContent = simbolo.columna
    })
}





































// import { parse } from './gramatica.js'
// import { InterpreterVisitor } from './interprete.js'

// const editor  = document.getElementById('codigofuente')
// const ejecutar = document.getElementById('ejecutar')
// const consola = document.getElementById('consola')



// ejecutar.addEventListener('click', () => {
//     const codigoFuente = editor.value

//     try {
//         const sentencias = parse(codigoFuente)
//         //ast.innerHTML = JSON.stringify(sentencias, null, 2)
    
//         const interprete = new InterpreterVisitor()
    
//         // for (const sentencia of sentencias) {
//         //     sentencia.accept(interprete)
//         // }
//         console.log({ sentencias })
//         sentencias.forEach(sentencia => sentencia.accept(interprete))
    
//         consola.innerHTML = interprete.consola
//      } catch (error) {
//         if(error.location){
//             consola.innerHTML =  'Error: ' + error.message + ' at line ' + error.location.start.line + ' column ' + error.location.start.column
//        }
//          else{
//             consola.innerHTML =  'Error: ' + error.message
//          }
//      }
   

// })


