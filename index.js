import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/+esm'
import { parse } from './Proyecto1/Compilador/gramatica.js'
import { InterpreterVisitor } from './Proyecto1/Compilador/interprete.js'

let editor, consoleEditor;
const ejecutar = document.getElementById('ejecutar')
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

    // Inicializar Monaco Editor
    editor = monaco.editor.create(document.getElementById('codigofuente'), {
        value: '',
        language: 'java',
        theme: 'vs-dark',
        automaticLayout: true
    });

    consoleEditor = monaco.editor.create(document.getElementById('consola'), {
        value: '',
        language: 'java',
        theme: 'vs-dark',
        readOnly: true,
        automaticLayout: true
    });

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
                editor.setValue(content);
                fileContents[currentFile] = content;
                addTab(currentFile);
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
            const content = editor.getValue();
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
                const content = editor.getValue();
                const blob = new Blob([content], { type: 'text/oak' });
                const url = URL.createObjectURL(blob);
                const enlace = document.createElement('a');
                enlace.href = url;
                enlace.download = `${fileName}.oak`;
                enlace.click();
                URL.revokeObjectURL(url);
                fileContents[fileName] = content;
                currentFile = fileName;
                addTab(currentFile);
            }
        }
    }

    // Agregar funcionalidad al botón "Guardar"
    saveBtn.addEventListener('click', saveFile);

    // Función para crear un nuevo archivo
    function createNewFile() {
        if (currentFile) {
            fileContents[currentFile] = editor.getValue();
        }
        const newFileName = `Archivo${Object.keys(fileContents).length + 1}`;
        currentFile = newFileName;
        fileContents[newFileName] = '';
        editor.setValue('');
        addTab(newFileName);
    }

    // Función para añadir una nueva pestaña
    function addTab(fileName) {
        const newTab = document.createElement('button');
        newTab.className = 'tab';
        newTab.textContent = fileName;
        newTab.dataset.file = fileName;
        newTab.addEventListener('click', () => {
            switchFile(fileName);
        });
        tabsContainer.appendChild(newTab);
        switchFile(fileName);
    }

    // Cambiar el archivo actual
    function switchFile(fileName) {
        if (currentFile) {
            fileContents[currentFile] = editor.getValue();
        }
        currentFile = fileName;
        editor.setValue(fileContents[fileName] || '');
        // Actualizar la pestaña activa
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.file === fileName) {
                tab.classList.add('active');
            }
        });
    }

    // Agregar funcionalidad al botón "Crear"
    newFileBtn.addEventListener('click', createNewFile);

    // Añadir el input de archivo al documento
    document.body.appendChild(fileInputElement);
});

ejecutar.addEventListener('click', () => {
    const codigoFuente = editor.getValue()
    erroresCompilacion = [] // Limpiar errores de compilación
    tablaSimbolos = [] // Limpiar tabla de símbolos
    try {
        const sentencias = parse(codigoFuente)
        const interprete = new InterpreterVisitor()
        
        console.log({ sentencias })
        sentencias.forEach(sentencia => sentencia.accept(interprete))
        
        consoleEditor.setValue(interprete.consola)

        console.log(erroresCompilacion)
        console.log(tablaSimbolos)
        
        if (erroresCompilacion.length > 0) {
            let errorMessages = erroresCompilacion.map(error => 
                `Error: ${error.message} at line ${error.linea}, column ${error.columna}`
            ).join('\n');
            consoleEditor.setValue(consoleEditor.getValue() + '\n' + errorMessages);
        }

    } catch (error) {
        if(error.location){
            consoleEditor.setValue('Error: ' + error.message + ' at line ' + error.location.start.line + ' column ' + error.location.start.column)
        } else {
            consoleEditor.setValue('Error: ' + error.message)
        }
    }
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