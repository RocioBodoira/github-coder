const now = luxon.DateTime.now();
let costoMateriales = [];
const totalCostos = costoMateriales.reduce((acc, curr) => acc + curr, 0);

document.getElementById('resultado').innerHTML = `<p>Costo total de la pieza: $${totalCostos.toFixed(2)}</p>
<p>Fecha del cálculo: ${now.toLocaleString(luxon.DateTime.DATETIME_MED)}</p>`;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const selectMetal = document.getElementById("metal");

            data.metales.forEach(metal => {
                let option = document.createElement("option");
                option.value = metal.precio;
                option.textContent = `${metal.nombre} - Precio $${metal.precio} por Kg`;

                selectMetal.appendChild(option);
            });
        })
        .catch(error => console.error("Error cargando los metales:", error));
});

document.getElementById("simulador-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const metalPrecio = parseFloat(document.getElementById("metal").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const cantidad = parseFloat(document.getElementById("cantidad").value);

    console.log({ metalPrecio, peso, cantidad });

    // Corregido el error en la condición
    if (isNaN(metalPrecio) || isNaN(peso) || isNaN(cantidad) || metalPrecio <= 0 || peso <= 0 || cantidad <= 0) {
        mostrarError("Por favor ingresa todos los valores correctamente.");
        return;
    }

    const costoTotal = metalPrecio * peso * cantidad;

    costoMateriales.push(costoTotal);

    document.getElementById("resultado").innerHTML = `<p>Costo total: $${costoTotal.toFixed(2)}</p>`;

    guardarCotizacion(costoTotal);
});

function guardarCotizacion(cotizacion) {
    let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizaciones.push(cotizacion);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));

    mostrarHistorial();
}

function mostrarHistorial() {
    let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = "<h3>Historial de Cotizaciones</h3>";
    cotizaciones.forEach(cotizacion => {
        const p = document.createElement("p");
        p.textContent = cotizacion;
        historialDiv.appendChild(p);
    });
}

function mostrarError(mensaje) {
    document.getElementById("resultado").innerHTML = `<p class="error">${mensaje}</p>`;
}