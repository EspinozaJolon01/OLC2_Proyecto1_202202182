import { parse } from './Proyecto1/Compilador/gramatica.js'
import { InterpreterVisitor } from './Proyecto1/Compilador/interprete.js'


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

document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('abrir');
    const saveBtn = document.getElementById('guardar');
    const newFileBtn = document.getElementById('NuevoArchivo');
    const tabsContainer = document.querySelector('.tabs');
    let currentFile = null;
    const fileContents = {};

    // Crear el input de archivo dinámicamente
    const fileInputElement = document.createElement('input');
    fileInputElement.type = 'file';
    fileInputElement.accept = '.oak';
    fileInputElement.style.display = 'none';

    // Manejar el evento de cambio en el input de archivo
    fileInputElement.addEventListener('change', (event) => {
        const file = event.target.files[0];
    
        if (file) {
            const reader = new FileReader();
        
            reader.onload = function(e) {
                const content = e.target.result;
                currentFile = file.name;
                editor.value = content;
                fileContents[currentFile] = content;
            };
        
            reader.readAsText(file);
        }
    });

    // Mostrar el input de archivo cuando se haga clic en el botón "Abrir"
    openBtn.addEventListener('click', () => {
        fileInputElement.click();
    });

    // Función para guardar el contenido del editor
    function saveFile() {
        if (currentFile) {
            const content = editor.value;
            const blob = new Blob([content], { type: 'text/oak' });
            const url = URL.createObjectURL(blob);
            const enlace = document.createElement('a');
            enlace.href = url;
            enlace.download = `${currentFile}`;
            enlace.click();
            URL.revokeObjectURL(url);
            fileContents[currentFile] = content;
        } else {
            const fileName = prompt('Ingrese el nombre del archivo:', 'archivo');
            if (fileName !== null) {
                const content = editor.value;
                const blob = new Blob([content], { type: 'text/oak' });
                const url = URL.createObjectURL(blob);
                const enlace = document.createElement('a');
                enlace.href = url;
                enlace.download = `${fileName}.oak`;
                enlace.click();
                URL.revokeObjectURL(url);
                fileContents[fileName] = content;
                currentFile = fileName;
            }
        }
    }

    // Agregar funcionalidad al botón "Guardar"
    saveBtn.addEventListener('click', saveFile);

    // Función para crear un nuevo archivo
    function createNewFile() {
        if (currentFile) {
            fileContents[currentFile] = editor.value;
        }
        const newFileName = `Archivo${Object.keys(fileContents).length + 1}`;
       
        const newTab = document.createElement('button');
        newTab.className = 'tab';
        newTab.textContent = newFileName;
        newTab.dataset.file = newFileName;
        newTab.addEventListener('click', () => {
            switchFile(newFileName);
        });
        tabsContainer.appendChild(newTab);
        currentFile = newFileName;
        fileContents[newFileName] = '';
        editor.value = '';
    }

    // Cambiar el archivo actual
    function switchFile(fileName) {
        if (currentFile) {
            fileContents[currentFile] = editor.value;
        }
        currentFile = fileName;
        editor.value = fileContents[fileName] || '';
    }

    // Agregar funcionalidad al botón "Crear"
    newFileBtn.addEventListener('click', createNewFile);

    // Añadir el input de archivo al documento
    document.body.appendChild(fileInputElement);
});

ejecutar.addEventListener('click', () => {
    const codigoFuente = editor.value
    erroresCompilacion = [] // Limpiar errores de compilación
    tablaSimbolos = [] // Limpiar tabla de símbolos
    // try {
        const sentencias = parse(codigoFuente)
        const interprete = new InterpreterVisitor()
        
        console.log({ sentencias })
        sentencias.forEach(sentencia => sentencia.accept(interprete))
        
        consola.innerHTML = interprete.consola

        console.log(erroresCompilacion)
        console.log(tablaSimbolos)
        consola.innerHTML += `\n`
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
    // }
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