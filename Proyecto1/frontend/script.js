document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('abrir');
    const saveBtn = document.getElementById('guardar');
    const newFileBtn = document.getElementById('NuevoArchivo');
    const codigo = document.getElementById('codigofuente');
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
                codigo.value = content;
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
            const content = codigo.value;
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
                const content = codigo.value;
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
            fileContents[currentFile] = codigo.value;
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
        codigo.value = '';
    }

    // Cambiar el archivo actual
    function switchFile(fileName) {
        if (currentFile) {
            fileContents[currentFile] = codigo.value;
        }

        currentFile = fileName;
        codigo.value = fileContents[fileName] || '';
    }

    // Agregar funcionalidad al botón "Crear"
    newFileBtn.addEventListener('click', createNewFile);

    // Añadir el input de archivo al documento
    document.body.appendChild(fileInputElement);
});
