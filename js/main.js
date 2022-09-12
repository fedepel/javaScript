class Compra {
    constructor(nombre, costo) {
        this.nombre = nombre.toUpperCase();
        this.costo = costo;
    }
}

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

function calcularCosto(compras) {
    let sumatoriaCosto = compras.reduce((acc, el) => acc + el.costo, 0)
    return sumatoriaCosto;
}

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

function avisoFinal(costoTotal, numeroCuotas, cuotaMes, pagoAdelanto) {
    if (numeroCuotas <= 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU.`)
    } else if (numeroCuotas > 6) {
        alert(`Usted ha seleccionado pagar ${costoTotal} UYU en ${numeroCuotas} cuotas de ${parseInt(cuotaMes)} UYU, realizando un pago por adelantado de ${pagoAdelanto} UYU (se ha aplicado un 5% de interes).`)
    } else {
        alert('Ningún dato ha sido ingresado.')
    }
}
function mostrarMenu() {
    const OPCION = prompt(
        'Bienvenido, seleccione una opción (ESC para salir)\n1. Agregar compras\n2. Eliminar compras\n3. Definir forma de pago');
    return OPCION;
}

function procesarInventario() {
    let opcionSeleccionada = mostrarMenu();
    while (opcionSeleccionada?.toLowerCase() != "esc") {
        if (opcionSeleccionada != "") {
            opcionSeleccionada = parseInt(opcionSeleccionada);
            if (!isNaN(opcionSeleccionada)) {
                switch (opcionSeleccionada) {
                    case 1:
                        miProducto = obtenerDatosDeProducto();
                        break;
                    case 2:
                        const PRECIO_A_AUMENTAR = parseFloat(
                            prompt("Ingrese en cuanto aumenta el precio del producto")
                        );
                        miProducto.aumentarPrecio(PRECIO_A_AUMENTAR);
                        break;

                    case 3:
                        const PRECIO_A_DISMINUIR = parseFloat(
                            prompt("Ingrese en cuanto disminuye el precio del producto")
                        );
                        miProducto.disminuirPrecio(PRECIO_A_DISMINUIR);
                        break;

                    default:
                        alert("Opcion Incorrecta");
                        break;
                }
            } else {
                alert("Ingresó una letra");
            }
        } else {
            alert("Seleccione la opción");
        }
        opcionSeleccionada = mostrarMenu();
    }
}

function main() {
    let compras = agregarCompras();
    let costoTotal = calcularCosto(compras);
    alert(`El costo total de su compra es de: ${costoTotal} UYU.\n\nSu carrito contiene:\n\n${JSON.stringify(compras)}`);
    let pagoAdelanto = parseInt(prompt(`Ingrese si desea realizar un pago por adelantado.`))
    let numeroCuotas = parseInt(prompt('Ingrese número de cuotas en que desea pagar (de seleccionar el pago en más de 6 cuotas, aplica un interes del 5%).'));
    let cuota = valorCuota(costoTotal, pagoAdelanto, numeroCuotas)
    avisoFinal(costoTotal, numeroCuotas, cuota, pagoAdelanto)
    console.log(compras)
    console.log(costoTotal)
    console.log(pagoAdelanto)
    console.log(numeroCuotas)
    console.log(cuota)
}

main();
