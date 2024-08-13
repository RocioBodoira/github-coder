// Constantes de precios por kg

const precio_hierro = 45; // Precio por kg de aluminio

const precio_aluminio = 30; // Precio por kg de hierro

const precio_cobre = 10; // Precio por kg de cobre

// Variables para almacenar la selección del cliente

let tipoMetal;

let pesoPieza;

let cantidadPiezas;

// Array de metales disponibles

const metales = ["Hierro", "Aluminio", "Cobre"];

// Función para seleccionar el tipo de metal

function seleccionarMetal () {
    let seleccion =
    prompt("Selecciona el tipo de metal (1: Hierro, 2: Aluminio, 3: Cobre):");
          switch (seleccion){
            case "1":
                tipoMetal = metales[0];
                return precio_hierro;
            case "2":
                tipoMetal = metales[1];
                return precio_aluminio;
            case "3":
                tipoMetal = metales[2];
                return precio_cobre;
            default: 
                 alert("Selección inválida, por favor intentá de nuevo.");
                 return
            seleccionarMetal();
          }
}

// Función para ingresar el peso de la pieza

function ingresarPesoPieza () {
    let peso =
parseFloat(prompt("Ingresá el peso de la pieza en kg:"));
    if (!isNaN(peso) && peso > 0) {
        pesoPieza = peso;
    }else{
        alert("Peso inválido, por favor intentá de nuevo.");
        ingresarPesoPieza();
    }
}

// Funciones para ingresar la cantidad de piezas

function ingresarCantidadPiezas () {
    let cantidad =
    parseInt(prompt("Ingresá la cantidad de piezas:"));
    if (!isNaN(cantidad) && cantidad > 0) {
        cantidadPiezas = cantidad; 
    }else{
        alert("Cantidad inválida, por favor intentá de nuevo.");
        ingresarCantidadPiezas();
    }
}

// Función para calcular el costo total
function
calcularCostoTotal(precioPorKg) {
    let costoMaterial = precioPorKg
    * pesoPieza * cantidadPiezas;
    alert('El costo total de la cotización es: $$ {costoMaterial.toFixed(2)}');
    return costoMaterial;
}

let precioPorKg =
seleccionarMetal ();
ingresarPesoPieza ();
ingresarCantidadPiezas ();
calcularCostoTotal (precioPorKg);

if (confirm("¿Querés realizar otra cotización?")) {
    location.reload ();
} else {
    alert("Gracias por utilizar nuestro simulador de cotizaciones.");
}

