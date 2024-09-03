document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
         .then(response =>
    response.json())
         .then(materiales => {
        
        inicializarSimulador(materiales);
         })
         .catch(error =>
    console.error('Error al cargar los datos de materiales:', error));
         });

function
inicializarSimulador(materiales) {
    const selectMaterial = document.getElementById('material');
    materiales.forEach(material => { const option = document.createElement('option');
        option.value = material.material;
        option.textContent = material.material;
    
    selectMaterial.appendChild(option);
    });

    const formulario = document.getElementById('formulario-costo');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const materialSeleccionado = document.getElementById('material').value;

        const peso = parseFloat(document.getElementById('peso').value);

        const material = materiales.find(m => m.material === materialSeleccionado);
        
        const precioPorKg = material ? material.precioPorKg : 0;

        const costo = peso * precioPorKg;
        mostrarResultado(costo);
    }); 
}

function mostrarResultado(costo) {
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.textContent = `El costo estimado es: AR $ {costo.toFixed(2)}`;
}

function
guardarEnLocalStorage(material, peso, costo) {
    const datos = { material, peso, costo };

localStorage.setItem('ultimoCalculo', JSON.stringify(datos));
}


