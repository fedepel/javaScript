//----- GENERADOR DE OBJETO ------ //
class Compra {
    constructor(nombre, costo) {
        this.nombre = nombre.toUpperCase();
        this.costo = costo;
    }
}

//------ FUNDCION AGREGAR COMPRAS -------//
function agregarCompras() {
    let numeroCompras = parseInt(
        prompt("Cuantos compras necesita registrar en su carrito?")
    );
    let compras = [];
    for (let index = 0; index < numeroCompras; index++) {
        let nombre = prompt("Ingresa el nombre del articulo comprado.");
        let costo = parseFloat(prompt("Ingresa el costo del producto."));
        let objetoCompra = new Compra(nombre, costo)
        compras.push(objetoCompra);
    }
    return compras;
}

//------- FUNCION PARA CALCULAR COSTO -----//
function calcularCosto(compras) {
    let sumatoriaCosto = compras.reduce((acc, el) => acc + el.costo, 0)
    alert(`El costo total de su compra es de: ${sumatoriaCosto} UYU.`);
    return sumatoriaCosto;
}

//-------- FUNCION PARA CALCULAR VALOR DE CUOTA -----//
function valorCuota(costoTotal, pagoAdelanto, numeroCuotas) {
    let total = 0;
    if (pagoAdelanto > 0) {
        total = costoTotal - pagoAdelanto;
    } else {
        total = costoTotal
    }
    let cuotaMes = 0
    if (numeroCuotas <= 6) {
        cuotaMes = total / numeroCuotas;
    } else {
        cuotaMes = total * 1.05 / numeroCuotas;
    }
    return cuotaMes
}

//--------- AVISO FINAL PARA MOSTRAR VALOR DE LA CUOTA ------//
function avisoFinal(costoTotal, numeroCuotas, cuotaMes, pagoAdelanto) {
    if (numeroCuotas <= 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU.`)
    } else if (numeroCuotas > 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU (se ha aplicado un 5% de interes).`)
    } else {
        alert('Ningún dato ha sido ingresado.')
    }
}

//------------ MENU DE OPCIONES -----------//
function procesarCarrito() {
    let opcionSeleccionada = mostrarMenu();
    while (opcionSeleccionada?.toLowerCase() != "esc") {
        if (opcionSeleccionada != "") {
            opcionSeleccionada = parseInt(opcionSeleccionada);
            if (!isNaN(opcionSeleccionada)) {
                switch (opcionSeleccionada) {
                    case 1:
                        compras = agregarCompras();
                        break;
                    case 2:
                        let costoTotal = calcularCosto(compras);
                        let pagoAdelanto = parseInt(prompt(`Ingrese si desea realizar un pago por adelantado.`))
                        let numeroCuotas = parseInt(prompt('Ingrese número de cuotas en que desea pagar (de seleccionar el pago en más de 6 cuotas, aplica un interes del 5%).'));
                        let cuota = valorCuota(costoTotal, pagoAdelanto, numeroCuotas)
                        avisoFinal(costoTotal, numeroCuotas, cuota, pagoAdelanto)
                        break;
                    case 3:
                        alert(JSON.stringify(compras));
                        break;
                    default:
                        alert("Opcion Incorrecta");
                        break;
                }
            } else {
                alert("Opcion Incorrecta");
            }
        } else {
            alert("Opcion Incorrecta");
        }
        opcionSeleccionada = mostrarMenu();
    }
}

//--------- MENU PRINCIPAL ---------//
function mostrarMenu() {
    const OPCION = prompt(
        'Bienvenido, seleccione una opción (ESC para salir)\n\n1. Agregar compras\n2. Definir forma de pago\n3. Ver carrito\n\nDebe ingresar compras para habilitar las otras funciones.');
    return OPCION;
}

function main() {
    procesarCarrito()
}

main();
