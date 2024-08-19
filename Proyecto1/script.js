let currentTabId = 0;

// Referencia al input de archivo
const fileInput = document.getElementById('file-input');

// Manejador del botón "Archivo"
document.getElementById('archivo-btn').addEventListener('click', function() {
    // Disparar el input de archivo cuando se hace clic en el botón "Archivo"
    fileInput.click();
});

// Manejador de selección de archivo
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Crear nueva pestaña y editor para el archivo seleccionado
        createNewFileTab(file.name, file);
    }
});

function createNewFileTab(fileName, file) {
    const tabs = document.getElementById('tabs');
    const editorsContainer = document.getElementById('editors-container');
    
    // Crear nuevo ID de archivo
    currentTabId++;
    const tabId = `tab-${currentTabId}`;

    // Crear nueva pestaña
    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.textContent = fileName;
    newTab.setAttribute('data-id', tabId);
    newTab.addEventListener('click', function() {
        changeTab(tabId);
    });
    tabs.appendChild(newTab);

    // Crear nuevo contenedor de editores
    const newEditorContainer = document.createElement('div');
    newEditorContainer.className = 'editors-container';
    newEditorContainer.id = tabId;

    // Crear editor de entrada
    const entradaLabel = document.createElement('h1');
    entradaLabel.textContent = 'Entrada';
    newEditorContainer.appendChild(entradaLabel);

    const entradaEditor = document.createElement('div');
    entradaEditor.className = 'editor';
    const entradaTextarea = document.createElement('textarea');
    entradaEditor.appendChild(entradaTextarea);
    newEditorContainer.appendChild(entradaEditor);

    // Leer el contenido del archivo y ponerlo en el editor de entrada
    const reader = new FileReader();
    reader.onload = function(e) {
        entradaTextarea.value = e.target.result;
    };
    reader.readAsText(file);

    // Crear consola de salida
    const consolaLabel = document.createElement('h1');
    consolaLabel.textContent = 'Consola';
    newEditorContainer.appendChild(consolaLabel);

    const consolaEditor = document.createElement('div');
    consolaEditor.className = 'editor-consola';
    const consolaTextarea = document.createElement('textarea');
    consolaTextarea.readOnly = true;
    consolaEditor.appendChild(consolaTextarea);
    newEditorContainer.appendChild(consolaEditor);

    editorsContainer.appendChild(newEditorContainer);

    // Activar la nueva pestaña
    changeTab(tabId);
}

function changeTab(tabId) {
    const allTabs = document.querySelectorAll('.tab');
    const allEditors = document.querySelectorAll('.editors-container');

    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    allEditors.forEach(editor => {
        editor.classList.remove('active');
    });

    document.querySelector(`[data-id="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}
